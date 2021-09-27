import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Card from "../../components/Card";
import PageContainer from "../../components/PageContainer";
import FormRegister from "../../components/FormRegister";
import RoundedButton from "../../components/RoundedButton";

const CreateAccount = () => {
	const [showForm, setShowForm] = useState(true);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { userValues, setUserValues } = useContext(UserContext);

	const registerInputs = [
		{
			label: "Name",
			placeholder: "Enter your name",
			type: "text",
			value: name,
			setValue: setName,
		},
		{
			label: "Email",
			placeholder: "address@email.com",
			type: "email",
			value: email,
			setValue: setEmail,
		},
		{
			label: "Password",
			placeholder: "Enter your password",
			type: "password",
			value: password,
			setValue: setPassword,
		},
	];

	const clearForm = () => {
		setName("");
		setEmail("");
		setPassword("");
		setShowForm(true);
	};
	const validate = (field) => {
		if (!field) {
			return false;
		}
		return true;
	};
	const handleCreate = () => {
		if (!validate(name)) return;
		if (!validate(email)) return;
		if (!validate(password)) return;
		const newUserValues = userValues;
		newUserValues.users.push({
			name,
			email,
			password,
			balance: 0,
			deposits: 0,
			withdraws: 0,
			loggedin: false,
		});
		setUserValues(newUserValues);
		console.log("newValues: ", newUserValues);
		console.log("globalValues: ", userValues);
		setShowForm(false);
	};

	return (
		<PageContainer>
			<div className='body-text mx-12'>
				{showForm ? (
					<Card
						title='Register'
						subtitle='Please fill the imputs to create account.'
						blur={true}>
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
