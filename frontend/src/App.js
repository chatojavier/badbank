import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Balance from './pages/Balance';
import AllData from './pages/AllData';
import NavBar from './components/NavBar';
import RequireAuth from './components/RequireAuth';
import UpdateUserValues from './components/UpdateUserValues';
import UserPersistence from './components/UserPersistence';

function App() {
	const [burgerOpen, setBurgerOpen] = useState(false);
	const [userValues, setUserValues] = useState({
		balance: 0,
		deposits: 0,
		withdraws: 0,
	});
	const [isLogged, setIsLogged] = useState(false);

	return (
		<div className='main-layout flex flex-col h-full'>
			<UserContext.Provider
				value={{
					userValues,
					setUserValues,
					isLogged,
					setIsLogged,
				}}>
				<UserPersistence>
					<UpdateUserValues>
						<NavBar
							burgerOpen={[burgerOpen, setBurgerOpen]}
							userStateValues={userValues}
						/>
					</UpdateUserValues>

					<Routes>
						<Route path='/' element={<Home />} />
						<Route
							path='/createaccount/'
							element={<CreateAccount />}
						/>
						<Route path='/login/' element={<Login />} />
						<Route
							path='/deposit/'
							element={
								<RequireAuth>
									<UpdateUserValues>
										<Deposit />
									</UpdateUserValues>
								</RequireAuth>
							}
						/>
						<Route
							path='/withdraw/'
							element={
								<RequireAuth>
									<UpdateUserValues>
										<Withdraw />
									</UpdateUserValues>
								</RequireAuth>
							}
						/>
						<Route
							path='/balance/'
							element={
								<RequireAuth>
									<UpdateUserValues>
										<Balance />
									</UpdateUserValues>
								</RequireAuth>
							}
						/>
						<Route path='/AllData/' element={<AllData />} />
					</Routes>
				</UserPersistence>
			</UserContext.Provider>
		</div>
	);
}

export default App;
