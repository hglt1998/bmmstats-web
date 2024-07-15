import { NavLink, useLocation} from 'react-router-dom'
import logo from '../static/banner.png'
import { useEffect, useState } from 'react';
import { ArrowDownTrayIcon, Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/16/solid';
import './navbar.css'
import { Dialog, DialogPanel } from '@headlessui/react';

export default function NavBar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [darkMode, setDarkMode] = useState(false)
	const path = useLocation()
	const regex = /actuaciones\/\w+/
	const isActuacionDetail = regex.test(path.pathname)
	
  useEffect(() => {
		const html = document.querySelector('html')
    if (darkMode) {
      document.documentElement.classList.add('dark')
			html.style.backgroundColor = 'rgb(15 23 42)'
    } else {
			document.documentElement.classList.remove('dark')
			html.style.backgroundColor = 'white'
    }

		if (isActuacionDetail) {
			const header = document.querySelector('header')
			header.style.background = 'black'
			header.style.background = 'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)'
		} else {
			const header = document.querySelector('header')
			header.style.background = 'transparent'
		}
  }, [darkMode, isActuacionDetail])

	let installPrompt = null;

	window.addEventListener("beforeinstallprompt", (event) => {
		event.preventDefault();
		installPrompt = event;
		console.log("ready");
		document.querySelectorAll('#install').forEach(e => e.removeAttribute('hidden'))
	});

	const install = () => {
		if (!installPrompt) {
			return;
		}
		console.log("here");
		const result = installPrompt.prompt();
		console.log(`Install prompt was: ${result.outcome}`);
		installPrompt = null;
	};

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Actuaciones', href: '/actuaciones' },
		{ name: 'About', href: '/about' },
	]

  return (
		<div className="bg-white z-50">
			<header className="fixed inset-x-0 top-0 z-50 light:bg-gradient-to-b from-white to-transparent">
				<nav
					className="flex items-center justify-between p-6 lg:px-8"
					aria-label="Global">
					<div className="flex lg:flex-1">
						<NavLink
							to="/"
							className="-m-1.5 p-1.5 style={{textShadow: '0px 0px 10px black'}}">
							<span className="sr-only">Your Company</span>
							<img
								className="h-8 w-auto"
								src={logo}
								alt=""
							/>
						</NavLink>
					</div>
					<div className="flex lg:hidden">
						<button onClick={install} hidden id="install" className='pr-5 items-center justify-center'>
							<ArrowDownTrayIcon className='text-gray-700 size-6' />
						</button>
						<button
							onClick={() => setDarkMode(!darkMode)}
							className="pr-5">
							{!darkMode ? (
								<SunIcon className={`size-6 ${isActuacionDetail ? 'text-white' : 'text-gray-900 dark:text-white'} '`} />
							) : (
								<MoonIcon className='size-6 text-white' />
							)}
						</button>
						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}>
							<span className="sr-only">Open main menu</span>
							{regex.test(path.pathname) ? (
								<Bars3Icon
									className="h-6 w-6 text-white"
									aria-hidden="true"
								/>
							) : (
								<Bars3Icon
									className="h-6 w-6 dark:text-white"
									aria-hidden="true"
								/>
							)}
						</button>
					</div>
					<div className="hidden lg:flex lg:gap-x-12">
						{regex.test(path.pathname) &&
							navigation.map((item) => (
								<NavLink
									key={item.name}
									to={item.href}
									className="text-sm font-semibold leading-6 text-white"
									style={{ textShadow: "0px 0px 10px black" }}>
									{item.name}
								</NavLink>
							))}
						{!regex.test(path.pathname) &&
							navigation.map((item) => (
								<NavLink
									key={item.name}
									to={item.href}
									className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
									{item.name}
								</NavLink>
							))}
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end cursor-pointer">
					<button id='install' onClick={install} hidden className='pr-5 items-center justify-center'>
							<ArrowDownTrayIcon className='text-gray-700 size-6' />
						</button>
						<button
							onClick={() => setDarkMode(!darkMode)}
							className="pr-5">
							{regex.test(path.pathname) ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="size-6 text-white">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="size-6 text-gray-900 dark:text-white">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
									/>
								</svg>
							)}
						</button>
						{regex.test(path.pathname) ? (
							<a
								href="https://municipaldemairena.com"
								className="text-sm font-semibold leading-6 text-white"
								style={{ textShadow: "0px 0px 10px black" }}>
								municipaldemairena.com <span aria-hidden="true">&rarr;</span>
							</a>
						) : (
							<a
								href="https://municipaldemairena.com"
								className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
								municipaldemairena.com <span aria-hidden="true">&rarr;</span>
							</a>
						)}
					</div>
				</nav>
				<Dialog
					className="lg:hidden ease-linear"
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}>
					<div className="fixed inset-0 z-50" />
					<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full h-96 overflow-y-auto bg-white dark:bg-slate-700 rounded-b-lg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ease-in-out duration-3000 drop-shadow-lg">
						<div className="flex items-center justify-between ">
							<a
								href="/"
								className="-m-1.5 p-1.5">
								<span className="sr-only">Your Company</span>
								<img
									className="h-8 w-auto"
									src={logo}
									alt=""
								/>
							</a>
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(false)}>
								<span className="sr-only">Close menu</span>
								<XMarkIcon
									className="h-6 w-6 dark:text-white"
									aria-hidden="true"
								/>
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 ease-linear">
											{item.name}
										</a>
									))}
								</div>
								<div className="py-6">
									<a
										href="https://municipaldemairena.com"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 ease-linear">
										municipaldemairena.com <span aria-hidden="true">&rarr;</span>
									</a>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>
		</div>
	);
}
