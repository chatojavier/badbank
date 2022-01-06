import { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { auth } from '../../firebase-config';
import axios from 'axios';

const UpdateUserValues = ({ children }) => {
	const { setUserValues } = useContext(UserContext);

	useEffect(() => {
		(async () => {
			try {
				const user = auth.currentUser;
				const idToken = await user.getIdToken();
				const url = String(process.env.REACT_APP_USER_API + user.uid);
				const headers = { Authorization: idToken };
				const result = await axios.get(url, { headers });
				setUserValues(result.data);
				console.log('User values updated: ', result.data);
			} catch (error) {
				console.log(error.message);
			}
		})();
	}, []);
	return children;
};

export default UpdateUserValues;
