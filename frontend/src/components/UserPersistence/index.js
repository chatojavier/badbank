import { auth } from '../../firebase-config';
import { useEffect, useState, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { UserContext } from '../../contexts/UserContext';
import LoadingScreen from '../LoadingScreen';

const UserPersistence = ({ children }) => {
	const { setIsLogged } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		console.log('verifying if there is a logged acount');
		onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				console.log('Logged acount not found');
				setIsLogged(false);
				setIsLoading(false);
			} else {
				console.log(`${currentUser.email} is logged in.`);
				setIsLogged(true);
				setIsLoading(false);
			}
		});
	}, []);
	return isLoading ? <LoadingScreen></LoadingScreen> : children;
};

export default UserPersistence;
