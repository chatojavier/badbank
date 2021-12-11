import { useState } from 'react';
import Card from '../../components/Card';
import PageContainer from '../../components/PageContainer';
import FormRegister from '../../components/FormRegister';
import RoundedButton from '../../components/RoundedButton';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const CreateAccount = () => {
	const [showForm, setShowForm] = useState(true);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [connectState, setConnectState] = useState({
		isLoading: false,
		isError: false,
		isSuccess: false,
		dataToReceive: '',
	});

	const registerInputs = [
		{
			label: 'Name',
			placeholder: 'Enter your name',
			type: 'text',
			value: name,
			setValue: setName,
		},
		{
			label: 'Email',
			placeholder: 'address@email.com',
			type: 'email',
			value: email,
			setValue: setEmail,
		},
		{
			label: 'Password',
			placeholder: 'Enter your password',
			type: 'password',
			value: password,
			setValue: setPassword,
		},
	];

	const clearForm = () => {
		setName('');
		setEmail('');
		setPassword('');
		setShowForm(true);
	};
	const validate = (field) => {
		if (!field) {
			return false;
		}
		return true;
	};
	const handleCreate = async () => {
		if (!validate(name)) return;
		if (!validate(email)) return;
		if (!validate(password)) return;

		setConnectState({
			...connectState,
			isLoading: true,
			isError: false,
			isSuccess: false,
		});
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const idToken = await userCredential.user.getIdToken();
			const data = { name, email, uid: userCredential.user.uid };
			const url = process.env.REACT_APP_CREATE_API;
			const headers = { Authorization: idToken };
			const result = await axios.post(url, data, { headers });
			setConnectState({
				...connectState,
				isLoading: false,
				isError: false,
				isSuccess: true,
				dataToReceive: result.data,
			});
			console.log(`User ${name} created`);
			setShowForm(false);
		} catch (error) {
			console.log(error.message);
			setConnectState({
				...connectState,
				isLoading: false,
				isError: true,
				isSuccess: false,
			});
		}
	};

	return (
		<PageContainer>
			<div className='body-text mx-12'>
				{showForm ? (
					<Card
						title='Register'
						subtitle='Please fill the imputs to create account.'
						blur={true}
						isLoading={connectState.isLoading}>
						<FormRegister
							inputs={registerInputs}
							onClick={handleCreate}
						/>
					</Card>
				) : (
					<Card title='Success' subtitle='You are registered now.'>
						<RoundedButton onClick={clearForm}>
							Add another account
						</RoundedButton>
					</Card>
				)}
			</div>
		</PageContainer>
	);
};

export default CreateAccount;
