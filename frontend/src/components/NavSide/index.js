import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';

const linksTools = [
	{
		path: 'balance',
		label: 'Balance',
		svg: (
			<svg
				className='w-5 h-5'
				fill='currentColor'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 20 20'>
				<path d='M19.46,8.7h0L11.3.54a1.83,1.83,0,0,0-2.6,0h0L.55,8.69h0a1.84,1.84,0,0,0,1.22,3.14h.39v6A2.15,2.15,0,0,0,4.3,20H7.49a.59.59,0,0,0,.59-.59v-4.7a1,1,0,0,1,1-1h1.88a1,1,0,0,1,1,1v4.7a.59.59,0,0,0,.59.59H15.7a2.16,2.16,0,0,0,2.16-2.15v-6h.3a1.84,1.84,0,0,0,1.3-3.14Zm-.83,1.77a.67.67,0,0,1-.47.2h-.89a.59.59,0,0,0-.59.59v6.59a1,1,0,0,1-1,1H13.1V14.71a2.17,2.17,0,0,0-2.16-2.16H9.06A2.16,2.16,0,0,0,6.9,14.71v4.12H4.3a1,1,0,0,1-1-1V11.26a.59.59,0,0,0-.59-.59h-.9A.68.68,0,0,1,1.17,10a.72.72,0,0,1,.2-.46h0L9.53,1.37a.66.66,0,0,1,.94,0h0l8.16,8.15h0A.66.66,0,0,1,18.63,10.47Z' />
			</svg>
		),
	},
	{
		path: 'deposit',
		label: 'Deposit',
		svg: (
			<svg
				className='w-5 h-5'
				fill='currentColor'
				stroke='currentColor'
				viewBox='0 0 512 512'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M469,228.4c-22.8-20-57-20-79.8,2.9l-79.8,79.8V54.5C309.4,26,286.6.3,258.1.3c-31.4-2.9-57,22.8-57,54.2V311.1l-79.8-79.8c-22.8-22.8-62.7-22.8-82.7,0s-20,57,2.9,79.8L226.8,499.3c17.1,17.1,42.8,17.1,57,0L469,311.1C494.6,288.3,494.6,251.2,469,228.4Zm-14.3,68.4L269.4,482.1c-8.6,8.6-20,8.6-28.5,0L55.6,296.8c-17.1-14.3-14.3-39.9,2.9-54.2,5.7-2.9,11.4-5.7,17.1-5.7,11.4,0,22.8,2.9,28.5,11.4l99.8,99.8c2.9,2.9,8.6,2.9,11.4,2.9,2.9-2.9,5.7-5.7,5.7-11.4V54.5c0-17.1,14.3-31.4,31.4-34.2,20,0,34.2,14.3,34.2,31.4V336.8c0,5.7,2.9,8.6,5.7,11.4s8.6,0,11.4-2.9l99.8-99.8a36.24,36.24,0,1,1,51.2,51.3Z' />
			</svg>
		),
	},
	{
		path: 'withdraw',
		label: 'Withdraw',
		svg: (
			<svg
				className='w-5 h-5 transform rotate-180'
				fill='currentColor'
				stroke='currentColor'
				viewBox='0 0 512 512'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M469,228.4c-22.8-20-57-20-79.8,2.9l-79.8,79.8V54.5C309.4,26,286.6.3,258.1.3c-31.4-2.9-57,22.8-57,54.2V311.1l-79.8-79.8c-22.8-22.8-62.7-22.8-82.7,0s-20,57,2.9,79.8L226.8,499.3c17.1,17.1,42.8,17.1,57,0L469,311.1C494.6,288.3,494.6,251.2,469,228.4Zm-14.3,68.4L269.4,482.1c-8.6,8.6-20,8.6-28.5,0L55.6,296.8c-17.1-14.3-14.3-39.9,2.9-54.2,5.7-2.9,11.4-5.7,17.1-5.7,11.4,0,22.8,2.9,28.5,11.4l99.8,99.8c2.9,2.9,8.6,2.9,11.4,2.9,2.9-2.9,5.7-5.7,5.7-11.4V54.5c0-17.1,14.3-31.4,31.4-34.2,20,0,34.2,14.3,34.2,31.4V336.8c0,5.7,2.9,8.6,5.7,11.4s8.6,0,11.4-2.9l99.8-99.8a36.24,36.24,0,1,1,51.2,51.3Z' />
			</svg>
		),
	},
	{
		path: 'alldata',
		label: 'All Data',
		svg: (
			<svg
				className='w-5 h-5'
				fill='currentColor'
				stroke='currentColor'
				viewBox='0 0 512 512'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M441.24,137.66,306.55,3a10.15,10.15,0,0,0-7.16-3H109.6A41.85,41.85,0,0,0,67.8,41.8V470.2A41.85,41.85,0,0,0,109.6,512H402.4a41.85,41.85,0,0,0,41.8-41.8V144.81A10.09,10.09,0,0,0,441.24,137.66ZM309.51,34.55,409.65,134.69H331.07a21.58,21.58,0,0,1-21.56-21.56V34.55ZM424,470.2a21.58,21.58,0,0,1-21.56,21.56H109.6A21.58,21.58,0,0,1,88,470.2V41.8A21.58,21.58,0,0,1,109.6,20.24H289.27v92.89a41.85,41.85,0,0,0,41.8,41.8H424Z' />
				<path d='M337,257H175.05a10.12,10.12,0,0,0,0,20.24H337A10.12,10.12,0,0,0,337,257Z' />
				<path d='M337,302.21H175.05a10.12,10.12,0,0,0,0,20.24H337a10.12,10.12,0,0,0,0-20.24Z' />
				<path d='M337,347.4H175.05a10.12,10.12,0,1,0,0,20.24H337a10.12,10.12,0,1,0,0-20.24Z' />
				<path d='M284.33,392.6H175.05a10.12,10.12,0,0,0,0,20.24H284.33a10.12,10.12,0,1,0,0-20.24Z' />
			</svg>
		),
	},
];

const linkProfile = {
	path: 'profile',
	label: 'Profile',
	svg: (
		<svg
			className='w-5 h-5'
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
		</svg>
	),
};

const addAccount = {
	path: 'createaccount',
	label: 'Add an account',
	svg: (
		<svg
			className='w-5 h-5'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'>
			<path
				d='M420.57,0H91.43A91.54,91.54,0,0,0,0,91.43V420.57A91.54,91.54,0,0,0,91.43,512H420.57A91.54,91.54,0,0,0,512,420.57V91.43A91.54,91.54,0,0,0,420.57,0Zm54.86,420.57a54.86,54.86,0,0,1-54.86,54.86H91.43a54.86,54.86,0,0,1-54.86-54.86V91.43A54.86,54.86,0,0,1,91.43,36.57H420.57a54.86,54.86,0,0,1,54.86,54.86Z'
				transform='translate(0 0)'
			/>
			<path
				d='M347.43,237.71H274.29V164.57a18.29,18.29,0,0,0-36.58,0v73.14H164.57a18.29,18.29,0,0,0,0,36.58h73.14v73.14a18.29,18.29,0,0,0,36.58,0V274.29h73.14a18.29,18.29,0,0,0,0-36.58Z'
				transform='translate(0 0)'
			/>
		</svg>
	),
};

const logoutData = {
	label: 'Logout',
	svg: (
		<svg
			className='w-5 h-5'
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2'
				d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'></path>
		</svg>
	),
};

const NavSideButtonLink = ({ path, label, svg }) => {
	return (
		<Link
			to={path && `/${path}`}
			className={`relative flex flex-row items-center h-11 focus:outline-none border-l-4 border-transparent ${
				window.location.pathname === `/${path}`
					? 'border-blue text-black pr-6 cursor-default'
					: 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
			}`}
			aria-label={`${path}_link`}>
			<span className='inline-flex justify-center items-center ml-4'>
				{svg}
			</span>
			<span className='mx-4 text-sm tracking-wide truncate opacity-0 group-hover:opacity-100'>
				{label}
			</span>
		</Link>
	);
};

const NavSideButtonAction = ({ label, svg, action }) => {
	return (
		<button
			className='relative w-full flex flex-row items-center h-11 focus:outline-none border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800'
			onClick={action}>
			<span className='inline-flex justify-center items-center ml-4'>
				{svg}
			</span>
			<span className='mx-4 text-sm tracking-wide truncate opacity-0 group-hover:opacity-100'>
				{label}
			</span>
		</button>
	);
};

const NavSide = () => {
	const { setIsLogged } = useContext(UserContext);

	const handleLogout = async () => {
		try {
			await signOut(auth);
			setIsLogged(false);
			setTimeout(function () {
				window.location = '/';
			}, 500);
		} catch (error) {}
	};

	return (
		<div className='flex flex-col top-0 left-0 bg-white bg-opacity-60 backdrop-filter backdrop-blur h-full border-r hover:w-full w-16 transition-all group'>
			<div className='overflow-y-auto overflow-x-hidden flex-grow'>
				<ul className='flex flex-col py-4 space-y-1'>
					{linksTools.map(({ path, label, svg }) => {
						return (
							<li key={path}>
								<NavSideButtonLink
									path={path}
									label={label}
									svg={svg}
								/>
							</li>
						);
					})}
					<li className='px-5' key='separator'>
						<div className='flex flex-row items-center h-8'>
							<div className=' h-0.5 w-full rounded-full bg-gray-300 '></div>
						</div>
					</li>
					{/* <li key='profile'>
						<NavSideButtonLink
							path={linkProfile.path}
							label={linkProfile.label}
							svg={linkProfile.svg}
						/>
					</li> */}
					<li key={addAccount.path}>
						<NavSideButtonLink
							path={addAccount.path}
							label={addAccount.label}
							svg={addAccount.svg}
						/>
					</li>
					<li key='logout'>
						<NavSideButtonAction
							label={logoutData.label}
							svg={logoutData.svg}
							action={handleLogout}
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NavSide;
