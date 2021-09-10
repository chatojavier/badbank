import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Card from "../../components/Card";
import FormLogin from "../../components/FormLogin";
import PageContainer from "../../components/PageContainer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [status, setStatus] = useState("");
  const { userValues, setUserValues, setIsLogged } = useContext(UserContext);
  const loginInputs = [
    {
      label: "Email",
      placeholder: "address@email.com",
      type: "email",
      value: email,
      setState: setEmail,
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      value: password,
      setState: setPassword,
    },
  ];
  const handleLogin = () => {
    console.log("Email: ", email, "| Password: ", password);
    let newUserValues = userValues;
    newUserValues.users.find((user, index) => {
      if (user.email === email && user.password === password) {
        newUserValues.users[index].loggedin = true;
        newUserValues.userIndex = index;
        setUserValues(newUserValues);
        console.log("Global User Values: ", userValues);
        setIsLogged(true);

        setShowForm(false);
        setTimeout(function () {
          window.location.hash = "#/";
        }, 1000);
        return true;
      }
      setStatus("Email or Password incorrect.");
    });
  };
  return (
    <PageContainer>
      <div className='body-text mx-12'>
        {showForm ? (
          <Card title='Sign In' subtitle='Please sign in to your account.'>
            <FormLogin inputs={loginInputs} submit={handleLogin} />
            <div className='text-red text-xs mt-2'>{status}</div>
          </Card>
        ) : (
          <Card title='Success' subtitle='You are logged in.'></Card>
        )}
      </div>
    </PageContainer>
  );
};

export default Login;
