import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Logo from "../../assets/bb_logo_light.png";
import Logo2x from "../../assets/bb_logo_light@2x.png";
import userPic from "../../assets/user_pic.svg";
import Burger from "../Burger";
import RoundedButton from "../RoundedButton";

const NavBar = ({ burgerOpen }) => {
	const { userValues, isLogged } = useContext(UserContext);

	return (
		<nav className='navbar shadow bg-white bg-opacity-60 backdrop-filter backdrop-blur z-20 rounded-b-2xl'>
			<div className='mx-auto p-4 flex justify-between items-center'>
				<a className='navbar-brand' href='#'>
					<img
						src={Logo}
						srcSet={`${Logo2x} 2x`}
						alt='logo Bad Bank'
						className='h-14'
					/>
				</a>
				<div className='lg:hidden'>
					<Burger isOpen={burgerOpen} />
				</div>
				<div className='hidden lg:flex space-x-2'>
					{isLogged ? (
						<div className='flex space-x-2 items-center'>
							<span className='font-semibold'>{`Welcome ${
								userValues.users[userValues.userIndex].name
							}`}</span>
							<img src={userPic} alt='User Pic' className='w-8' />
						</div>
					) : (
						<>
							<Link to='/login'>
								<RoundedButton color='blue'>
									Sign In
								</RoundedButton>
							</Link>
							<Link to='/createaccount'>
								<RoundedButton color='blue'>
									Create Account
								</RoundedButton>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
