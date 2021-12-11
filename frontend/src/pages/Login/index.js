import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Card from '../../components/Card';
import FormLogin from '../../components/FormLogin';
import PageContainer from '../../components/PageContainer';
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showForm, setShowForm] = useState(true);
	const [status, setStatus] = useState('');
	const { setUserValues, setIsLogged } = useContext(UserContext);
	const [connectState, setConnectState] = useState({
		isLoading: false,
		isError: false,
		isSuccess: false,
		dataToReceive: '',
	});

	const loginInputs = [
		{
			label: 'Email',
			placeholder: 'address@email.com',
			type: 'email',
			value: email,
			setState: setEmail,
		},
		{
			label: 'Password',
			placeholder: 'Enter your password',
			type: 'password',
			value: password,
			setState: setPassword,
		},
	];
	const validate = (field) => {
		if (!field) {
			return false;
		}
		return true;
	};

	let navigate = useNavigate();
	let location = useLocation();
	let from = location.state?.from?.pathname || '/balance';

	const handleLogin = async () => {
		if (!validate(email)) return;
		if (!validate(password)) return;

		setConnectState({
			...connectState,
			isLoading: true,
			isError: false,
			isSuccess: false,
		});
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const idToken = await userCredential.user.getIdToken();
			const data = { uid: userCredential.user.uid };
			const url = process.env.REACT_APP_LOGIN_API;
			const headers = { Authorization: idToken };
			const result = await axios.post(url, data, { headers });
			setConnectState({
				...connectState,
				isLoading: false,
				isError: false,
				isSuccess: true,
				dataToReceive: result.data,
			});
			if (result.data === false) {
				setStatus('Invalid account.');
			} else {
				setUserValues(result.data);
				console.log('User ID: ', result.data.uid);
				setIsLogged(true);
				setShowForm(false);
				navigate(from, { replace: true });
			}
		} catch (error) {
			console.log(error.message);
			setConnectState({
				...connectState,
				isLoading: false,
				isError: true,
				isSuccess: false,
			});
			setStatus('There is a problem with login.');
		}
	};

	return (
		<PageContainer>
			<div className='body-text mx-12'>
				{showForm ? (
					<Card
						title='Sign In'
						subtitle='Please sign in to your account.'
						blur={true}
						isLoading={connectState.isLoading}>
						<FormLogin
							inputs={loginInputs}
							submit={handleLogin}
							useAlert={[status, setStatus]}
						/>
					</Card>
				) : (
					<Card title='Success' subtitle='You are logged in.'></Card>
				)}
			</div>
		</PageContainer>
	);
};

export default Login;
