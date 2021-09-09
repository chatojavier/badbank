import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Card from "../../components/Card";
import PageContainer from "../../components/PageContainer";
import FormRegister from "../../components/FormRegister";
import RoundedButton from "../../components/RoundedButton"

const CreateAccount = () => {
    const [showForm, setShowForm] = useState(true);
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userValues, setUserValues} = useContext(UserContext);

    const registerInputs = [
        {
            label: 'Name',
            placeholder: 'Enter your name',
            type: 'text',
            value: name,
            setState: setName
        },
        {
            label: 'Email',
            placeholder: 'address@email.com',
            type: 'email',
            value: email,
            setState: setEmail
        },
        {
            label: 'Password',
            placeholder: 'Enter your password',
            type: 'password',
            value: password,
            setState: setPassword
        }
    ]

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setShowForm(true);
    }
    const validate = (field, label) => {
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }
    const handleCreate = () => {
        if (!validate(name, 'name')) return;
        if (!validate(email, 'email')) return;
        if (!validate(password, 'password')) return;
        const newUserValues = userValues;
        newUserValues.users.push({ name, email, password, balance: 0, loggedin: false, userIndex: null });
        setUserValues(newUserValues);
        console.log("newValues: ", newUserValues);
        console.log("globalValues: ", userValues);
        setShowForm(false);
    }

    return (
        <PageContainer>
            <div className="body-text mx-12">
                {showForm ? (
                    <Card title="Register" subtitle="Please fill the imputs to create account.">
                        <FormRegister inputs={registerInputs} onClick={handleCreate}/>
                        <div className="text-red">{status}</div>
                    </Card>
                ) : (
                    <Card title="Success" subtitle="You are registered now.">
                        <RoundedButton onClick={clearForm}>
                            Add another account
                        </RoundedButton>
                    </Card>
                )}
            </div>
        </PageContainer>
    )
}

export default CreateAccount;