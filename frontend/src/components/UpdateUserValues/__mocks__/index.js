import { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const UpdateUserValues = ({ children }) => {
	const { setUserValues, setIsLogged } = useContext(UserContext);
	useEffect(() => {
		const result = {
			uid: 'VDL7XTKQ9EM3qRqAqw7K7PnA3Xq1',
			name: 'Alex',
			email: 'alex@mit.edu',
			balance: 2500,
			deposits: 4080,
			withdraws: 1580,
		};
		setUserValues(result);
		setIsLogged(true);
	}, []);
	return children;
};

export default UpdateUserValues;
