import { Route, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Balance from "./pages/Balance";
import AllData from "./pages/AllData";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
	const [burgerOpen, setBurgerOpen] = useState(false);
	const [userValues, setUserValues] = useState({
		users: [
			{
				name: "Abel",
				email: "abel@mit.edu",
				password: "secret",
				balance: 2155,
				deposits: 4300,
				withdraws: 2145,
				loggedin: true,
			},
		],
		userIndex: 0,
	});
	const [isLogged, setIsLogged] = useState(true);
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		setCounter(counter + 1);
	}, [userValues]);
	console.log(`App Rendered ${counter} times`);

	console.log("App userValues", userValues);
	return (
		<HashRouter>
			<div className='main-layout flex flex-col h-full'>
				<UserContext.Provider
					value={{
						userValues,
						setUserValues,
						isLogged,
						setIsLogged,
					}}>
					<NavBar
						burgerOpen={[burgerOpen, setBurgerOpen]}
						userStateValues={userValues}
					/>
					<Route path='/' exact component={Home} />
					<Route
						path='/createaccount/'
						exact
						component={CreateAccount}
					/>
					<Route path='/login/' exact component={Login} />
					<Route path='/deposit/' exact component={Deposit} />
					<Route path='/withdraw/' exact component={Withdraw} />
					<Route path='/balance/' exact component={Balance} />
					<Route path='/alldata/' exact component={AllData} />
				</UserContext.Provider>
			</div>
		</HashRouter>
	);
}

export default App;
