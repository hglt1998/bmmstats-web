import { useEffect, useState } from "react";
import firebase from "../database/firebase";
import './actuaciones.scss'
import CategoryCarousel from "../components/CategoryCarousel";
import FeaturedEvent from "../components/FeaturedEvent";
import { Bars4Icon, Squares2X2Icon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Actuaciones() {

  const [events, setEvents] = useState([])
  const [liveEvents, setLiveEvents] = useState([])
	const [selection, setSelection] = useState([])
  const [mode, setMode] = useState('grid')
  const [loading, setLoading] = useState(true)
	const [cleanArray] = useState('')

  const navigate = useNavigate()


  const categories = [
    {
      title: 'Procesiones',
      movies: events.filter((item) => item.tipo === 'Procesión')
    },
    {
      title: 'Conciertos',
      movies: events.filter((item) => item.tipo === 'Concierto')
    },
    {
      title: 'Pregones',
      movies: events.filter((item) => item.tipo === 'Pregón')
    },
  ];

  const getTagColor = (tag) => {
    switch (tag) {
      case 'Semana Santa':
        return 'bg-purple-700 text-white'
      case 'Glorias':
        return 'bg-yellow-300 text-slate-800'
      case 'Procesión Extraordinaria':
        return 'bg-sky-300 text-slate-800'
      default:
        return 'bg-slate-700 text-white'
    }
  }
	
	const filter = (tag) => {
		if (selection.includes(tag)) {
			setSelection(selection.filter((item) => item !== tag ))
		} else {
			setSelection([...selection, tag])
		}
		setEvents(events.filter((filElem) => selection.includes(filElem.tagActuacion)))
	}

  const loadData = () => {

    try {
      firebase.db
        .collection("actuaciones")
        .orderBy("fecha", "desc")
        .onSnapshot((querySnapshot) => {
          const events = [];
          const liveEvents = []

          querySnapshot.forEach((doc) => {
            const info = doc.data();
            if (info.isLive === true) {
              liveEvents.push(info)
            } else {
              events.push(info);
            }
          });
          setLiveEvents(liveEvents)
          setEvents(events);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
		<div className="h-screen w-auto p-4 px-2 pt-14 from-slate-800 to-slate-900">
      <Transition
				show={loading}
				leave="transition-all ease-in-out duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<div
					id="default-modal"
					tabIndex="-1"
					className="transition-opacity	overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-screen">
					<div className="flex bg-slate-900/90 w-full m-auto mt-auto p-16 h-full">
						<div className="relative bg-white p-16 rounded-lg h-auto max-w-2xl m-auto object-center shadow dark:bg-gray-700">
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
			<p>{selection}</p>
			<div className="container mx-auto pb-3">
				{liveEvents[0] ? (
					<div className="mt-4">
						<h1 className="flex items-center lg:text-2xl font-bold text-red-500 animate-pulse mb-4 sm:text-sm md:text-sm">
							¡Estamos tocando!{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={3}
								stroke="currentColor"
								className="size-4 animate-pulse text-red-500">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
								/>
							</svg>
						</h1>
						<FeaturedEvent
							key={1}
							doc={liveEvents[0]}
						/>
					</div>
				) : (
					<div>
						<h1 className="text-2xl font-extrabold leading-none tracking-tight mb-4 mt-3 text-center dark:text-white uppercase [text-shadow:_0px_0px_15px_rgb(0_0_0_/_40%)]">Última actuación</h1>
						<FeaturedEvent
							key={2}
							doc={events[0]}
						/>
					</div>
				)}
				<div className="flex rounded-md justify-end mb-2">
					{/* {mode === 'list' && (
						<Menu as="div" className="relative inline-block text-left mr-4">
							<div>
								<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
									Filtrar
									<ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
								</MenuButton>
							</div>
							<MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
								<div className="py-1">
									<MenuItem>
										<button onClick={() => filter("Semana Santa")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Semana Santa</button>
									</MenuItem>
									<MenuItem>
										<button onClick={() => filter("Glorias")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Glorias</button>
									</MenuItem>
									<MenuItem>
										<button onClick={() => filter("Procesión Extraordinaria")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Extraordinarias</button>
									</MenuItem>
								</div>
							</MenuItems>
						</Menu>
					)} */}
					<button
						type="button"
						onClick={() => setMode("grid")}
						className={`px-4 py2 text-sm ${
							mode === "grid" ? "bg-slate-700 border border-gray-200 dark:bg-gray-600" : "bg-white border border-gray-200 dark:bg-gray-700"
						} rounded-s-lg dark:border-gray-700`}>
						<Squares2X2Icon className={`${mode === "grid" ? "text-white" : "text-black"}  h-8 w-4 flex-shrink-0 `} />
					</button>
					<button
						type="button"
						onClick={() => setMode("list")}
						className={`px-4 py2 text-sm ${
							mode === "list" ? "bg-slate-700 border border-gray-200 dark:bg-gray-600" : "bg-white border border-gray-200 dark:bg-gray-700"
						} rounded-r-lg dark:border-gray-700`}>
						<Bars4Icon className={`${mode === "list" ? "text-white" : "text-black"}  h-8 w-4 flex-shrink-0 `} />
					</button>
				</div>
				{mode === "grid" &&
					categories.map((category, index) => (
						<CategoryCarousel
							key={index}
							title={category.title}
							events={category.movies}
						/>
					))}
				{mode === "list" && (
					<div className="overflow-x-auto">
						<table className="w-full text-xs lg:text-sm text-left text-gray-500">
							<thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
								<tr>
									<th
										scope="col"
										className="px-1 py-3 lg:pl-2">
										Concepto
									</th>
									<th
										scope="col"
										className="pr-3 py-3 text-center">
										Ciudad
									</th>
									<th
										scope="col"
										className="hidden lg:table-cell pr-3 py-3">
										Ciudad
									</th>
									<th
										scope="col"
										className="pr-3 py-3 text-center">
										Tipo
									</th>
									<th
										scope="col"
										className="p-0 py-3">
										Fecha
									</th>
								</tr>
							</thead>
							<tbody>
								{events.map((item, index) => {
									const date = new Date(item.fecha.seconds * 1000).toLocaleString("es-ES", { month: "short", year: "2-digit", day: "2-digit" });
									return (
										<tr
											role="list"
											className="border-b dark:bg-slate-800 dark:border-gray-700"
											key={index}
											onClick={() => navigate(`/actuaciones/${item.idActuacion}`)}>
											<th
												scope="col"
												className="px-1 py-3 text-gray-900 lg:pl-2 dark:text-white">
												{item.concepto} <br /> <span className="font-normal text-gray-500 dark:text-gray-400">{item.organizador1}</span>
											</th>
											<td className="pr-1 w-auto py-3 dark:text-gray-300 text-center whitespace-break-spaces">{item.ciudad}</td>
											<td className="hidden md:table-cell pr-1 py-3 dark:text-gray-300">{item.ubicacion}</td>
											<td className="">
												<div className={"items-center mx-auto p-1 rounded-md text-center " + getTagColor(item.tagActuacion)}>{item.tipo}</div>
											</td>
											<td className="p-0 py-3 px-1 dark:text-gray-300 text-center">
												<div>{date}</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
