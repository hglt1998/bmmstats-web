/* eslint-disable */
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Firebase from "../database/firebase";
import "./actuacion.css";
import { useAppContext } from "../context/context";
import { BriefcaseIcon, BuildingLibraryIcon, CalendarIcon, MapPinIcon, PaperClipIcon, PlayCircleIcon } from "@heroicons/react/16/solid";
import Stats from "../components/Stats";
import Table from "../components/Table";
import defaultCover from '../static/actuacion-cover.webp'
import { ArrowUpOnSquareIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

export default function Actuacion() {
  // <------------------------------- USE STATE ------------------------------->
  const { id } = useParams();

  const [repertorios, setRepertorios] = useState([]);

  const [actuacion, setActuacion] = useState([]);

	const [dropdown, setDropdown] = useState(false)

	const [loading, setLoading] = useState(true)

  const {diffHours} = useAppContext()

	const navigate = useNavigate()

  // <------------------------------- USE EFFECT ------------------------------->

  
  useEffect(() => {
		const getActuacionById = async (id) => {
			const doc = Firebase.db.collection("actuaciones").doc(id);
      doc.onSnapshot((info) => {
				const actuacion = info.data();
        setActuacion(actuacion);
      });
			setLoading(false)
    };
    const loadData = (id) => {
			const db = getDatabase();
      const repertorioRef = ref(db, "repertorios/" + id);
      onValue(repertorioRef, (snapshot) => {
				const data = snapshot.val();
        if (data) {
					setRepertorios(Object.values(data).reverse());
        }
        // enable vibration support
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        
        if (navigator.vibrate) {
					// vibration API supported
          navigator.vibrate(1000);
        }
      });
    };

    getActuacionById(id);
    loadData(id);
  }, []);

	const exportCSV = () => {
		let csvContent = [actuacion.concepto, actuacion.organizador1, actuacion.ubicacion, new Date(actuacion.fecha.seconds * 1000).toLocaleString().slice(0, -3)].join(";") + "\r\n";

		csvContent += ["Número en lista", "Título", "Compositor", "Ubicación", "Hora"].join(";") + "\r\n";

		repertorios
			.filter((item) => !item.url)
			.forEach((interpretacion) => {
				const row = [
					interpretacion.nMarcha,
					interpretacion.tituloMarcha,
					interpretacion.compositor,
					interpretacion.ubicacion,
					interpretacion.time.substring(interpretacion.time.indexOf(",") + 2, interpretacion.time.length - 3)
				];
				csvContent += row.join(";") + "\r\n";
			});

		const BOM = "\uFEFF";
		const blob = new Blob([BOM + csvContent]);
		const url = window.URL.createObjectURL(blob);
		const linkElement = document.createElement("a");
		linkElement.href = url;
		linkElement.setAttribute("download", actuacion.concepto + ".csv");
		linkElement.click();
	};

	const share = (destination) => {
		if (destination === 'csv') {
			exportCSV()
		} else {
			try {
				if (navigator.share) {
					navigator.share({
						title: 'Actuación de la BM Mairena del Alcor',
						text: "🧐 ¡Mira el repertorio de esta actuación de la BM Mairena del Alcor!",
						url: window.location.href
					}).then(() => {
						setDropdown(false)
						alert('Enlace compartido!')
					})
					
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

  // <------------------------------- GETTERS ------------------------------->

  return (
		<div className="relative pt-20 p-6 min-h-screen w-auto">
			<Transition
				show={loading}
				leave="transition-all ease-in-out duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<div
					id="default-modal"
					tabindex="-1"
					className="transition-opacity	overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-screen">
					<div className="flex bg-slate-900/90 w-full m-auto mt-auto p-16 h-full">
						<div className="relative bg-white p-16 rounded-lg h-auto max-w-2xl m-auto object-center shadow">
							<div role="status">
								<svg
									aria-hidden="true"
									className="w-16 h-16 text-gray-200 animate-spin fill-slate-700 m-auto"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</Transition>
			<div className="flex">
				<button
					className="p-0 m-0 z-10 relative mb-2"
					onClick={() => navigate("/actuaciones")}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="white"
						className="size-6 z-10">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
						/>
					</svg>
				</button>
				<div className="flex justify-end w-full">
					{actuacion.isLive === true && (
						<div className="flex items-center z-10 ml-auto mb-2 animate-pulse border border-red-600 rounded-lg px-2">
							<PlayCircleIcon className="mr-1.5 h-3 w-3 flex-shrink-0 text-red-600 animate-pulse align-middle" />
							<h2 className="text-xs align-middle text-white">En directo</h2>
						</div>
					)}
					<button
						onClick={() => setDropdown(!dropdown)}
						className="z-10 p-0 m-0 h-fit w-fit">
						<ArrowUpOnSquareIcon className="h-5 w-5 ml-2 text-white z-10 items-center" />
					</button>
					{dropdown && (
						<div className="absolute w-14 top-28 bg-white rounded flex flex-col justify-center z-10">
							<button
								onClick={() => share("csv")}
								className="py-2 text-sm font-light border-b border-gray-600 hover:bg-gray-100 hover:rounded">
									.csv
							</button>
							<button
								onClick={() => share("social")}
								className="py-2 text-sm font-light border-b border-gray-600 hover:bg-gray-100 hover:rounded">
								<ShareIcon className="h-4 w-4 mx-auto" />
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col min-w-0 flex-1 justify-between">
				<h2 className="text-2xl font-bold dark:text-white leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight z-[5]">{actuacion.concepto}</h2>
				<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
					<div
						className="mt-2 flex items-center text-xs lg:text-sm text-gray-300 z-[5]"
						style={{ textShadow: "0px 0px 10px black" }}>
						<BriefcaseIcon
							className="mr-1.5 h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0 text-gray-200"
							aria-hidden="true"
						/>
						{actuacion.organizador1}
					</div>
					<div
						className="mt-2 flex items-center text-xs lg:text-sm text-gray-300 z-[5]"
						style={{ textShadow: "0px 0px 10px black" }}>
						<BuildingLibraryIcon
							className="mr-1.5 h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0 text-gray-200"
							aria-hidden="true"
						/>
						{actuacion.ubicacion}
					</div>
					<div
						className="mt-2 flex items-center text-xs lg:text-sm text-gray-300 z-[5]"
						style={{ textShadow: "0px 0px 10px black" }}>
						<MapPinIcon
							className="mr-1.5 h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0 text-gray-200"
							aria-hidden="true"
						/>
						{actuacion.ciudad}
					</div>
					<div
						className="mt-2 flex items-center text-xs lg:text-sm text-gray-300 z-[5]"
						style={{ textShadow: "0px 0px 10px black" }}>
						<CalendarIcon
							className="mr-1.5 h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0 text-gray-200"
							aria-hidden="true"
						/>
						{new Date(actuacion.fecha?.seconds * 1000).toLocaleString().slice(0, -3)}
					</div>
					<div
						className="mt-2 flex items-center text-xs lg:text-sm text-gray-300 z-[5]"
						style={{ textShadow: "0px 0px 10px black" }}>
						<PaperClipIcon
							className="mr-1.5 h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0 text-gray-200"
							aria-hidden="true"
						/>
						{actuacion.tipo}
					</div>
				</div>
				{repertorios.length > 2 && !(actuacion.tipo === "Pregón" || actuacion.tipo === "Concierto") && (
					<Stats
						duracion={diffHours(repertorios)}
						porHora={repertorios?.filter((item) => !item.url).length / diffHours(repertorios)}
						total={repertorios?.filter((item) => !item.url).length}
						actuacion={actuacion}
					/>
				)}
				<img
					id="coverImage"
					className="w-full h-3/5 mr-30 p-0 object-cover absolute top-0 left-0 brightness-75"
					src={actuacion.coverImage || defaultCover}
				/>
				<div className="w-full h-3/5 mr-30 p-0 absolute top-0 left-0 bg-gradient-to-t from-transparent via-50% to-black"></div>
			</div>
			{repertorios.length > 0 ? (
				<Table
					actuacion={actuacion}
					repertorios={repertorios}
				/>
			) : (
				<div className="py-24 mt-0 lg:mt-64 sm:py-32">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<button
							disabled
							type="button"
							className="py-2.5 px-5 mx-auto text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center">
							<svg
								aria-hidden="true"
								role="status"
								className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="#1C64F2"
								/>
							</svg>
							Preparando...
						</button>
						<p>Estamos afinando nuestros instrumentos para interpretar la primera marcha.</p>
						<p>Mientras comenzamos, puedes seguirnos en nuestras redes sociales si aún no lo has hecho:</p>
						<div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-2 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
							<a
								className="flex flex-col items-center"
								href="https://twitter.com/BandaMairena">
								<img
									height={50}
									width={50}
									src="https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png"
								/>
								@BandaMairena
							</a>
							<a
								className="flex flex-col items-center"
								href="https://www.instagram.com/bandamairena/">
								<img
									height={50}
									width={50}
									src="https://static.cdninstagram.com/rsrc.php/v3/yG/r/De-Dwpd5CHc.png"
								/>
								@bandamairena
							</a>
							<a
								className="flex flex-col items-center"
								href="https://www.tiktok.com/@bandamairena">
								<img
									height={50}
									width={50}
									src="https://sf-static.tiktokcdn.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png"
								/>
								@bandamairena
							</a>
							<a
								className="flex flex-col items-center"
								href="https://www.youtube.com/@bandamairena">
								<img
									height={50}
									width={50}
									src="https://www.youtube.com/s/desktop/a7b1ec23/img/favicon_144x144.png"
								/>
								@bandamairena
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
