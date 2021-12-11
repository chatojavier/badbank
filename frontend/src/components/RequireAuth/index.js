import { auth } from '../../firebase-config';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
	console.log('auth requested');
	const location = useLocation();

	return auth.currentUser ? (
		children
	) : (
		<Navigate to={'/login'} state={{ from: location }} />
	);
};

export default RequireAuth;
