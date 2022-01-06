import { auth } from '../../firebase-config';
import { useEffect, useState, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { UserContext } from '../../contexts/UserContext';
import LoadingScreen from '../LoadingScreen';
import axios from 'axios';

const UserPersistence = ({ children }) => {
	const { setIsLogged } = useContext(UserContext);
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		(async () => {
			console.log('verifying if there is a logged acount');
			try {
				const testConnection = await axios('/testconnection');
				onAuthStateChanged(auth, (currentUser) => {
					if (currentUser && testConnection.data) {
						console.log(`${currentUser.email} is logged in.`);
						setIsLogged(true);
						setLoaded(true);
					} else {
						!currentUser
							? console.log('Logged acount not found')
							: console.log('Server connection error');
						setIsLogged(false);
						setLoaded(true);
					}
				});
			} catch (error) {
				console.log('Server connection error: ', error.message);
				setIsLogged(false);
				setLoaded(true);
			}
		})();
	}, []);
	return loaded ? children : <LoadingScreen />;
};

export default UserPersistence;
