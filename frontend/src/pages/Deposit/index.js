import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import PageContainer from '../../components/PageContainer';
import Card from '../../components/Card';
import Calculator from '../../components/Calculator';
import Block from '../../components/Block';
import currencyFormat from '../../helpers/currencyFormat';
import RoundedButton from '../../components/RoundedButton';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase-config';
import axios from 'axios';

const Deposit = () => {
	const { userValues, setUserValues, setIsLogged } = useContext(UserContext);
	const [showCal, setShowCal] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setIsLogged(true);
				const idToken = await user.getIdToken();
				const url = String(process.env.REACT_APP_USER_API + user.uid);
				const headers = { Authorization: idToken };
				const result = await axios.get(url, { headers });
				console.log(result);
				setUserValues(result.data);
			} else {
				console.log('not logged user');
				setIsLogged(false);
				window.location.hash = '#/login';
			}
		});
	}, []);

	const acceptHandler = () => {
		setShowCal(false);
	};
	const depositAgain = () => {
		setShowCal(true);
	};
	return (
		<PageContainer>
			<Card title='Deposit' compClass='w-full' blur='true'>
				{showCal ? (
					<Calculator acceptHandler={acceptHandler} />
				) : (
					<div className='flex flex-col justify-center items-center py-4'>
						<div className='mb-2'>Your deposit was received</div>
						<RoundedButton
							onClick={depositAgain}
							compClass={'bg-white bg-opacity-70'}>
							Do another deposit
						</RoundedButton>
					</div>
				)}
				<Block compClass='w-96 mt-4' key='balance'>
					<div className='flex justify-between items-end'>
						<span className='text-blue-dark font-bold'>
							S/ {currencyFormat(userValues.balance)}
						</span>
						<span className='text-xs text-gray'>
							Current Balance
						</span>
					</div>
				</Block>
			</Card>
		</PageContainer>
	);
};

export default Deposit;
