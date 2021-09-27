import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import Calculator from "../../components/Calculator";
import Block from "../../components/Block";
import currencyFormat from "../../helpers/currencyFormat";
import RoundedButton from "../../components/RoundedButton";
import { Link } from "react-router-dom";

const Withdraw = () => {
	const { userValues } = useContext(UserContext);
	const currentUser = userValues.users[userValues.userIndex];
	const [showCal, setShowCal] = useState(true);

	const acceptHandler = () => {
		setShowCal(false);
	};
	const depositAgain = () => {
		setShowCal(true);
	};
	return (
		<PageContainer>
			{userValues.userIndex !== null ? (
				<Card title='Withdraw' compClass='w-full' blur='true'>
					{showCal ? (
						<Calculator acceptHandler={acceptHandler} />
					) : (
						<div className='flex flex-col justify-center items-center py-4'>
							<div className='mb-2'>
								Your withdraw was received
							</div>
							<RoundedButton
								onClick={depositAgain}
								compClass={"bg-white bg-opacity-70"}>
								Do another withdraw
							</RoundedButton>
						</div>
					)}
					<Block compClass='w-96 mt-4' key='balance'>
						<div className='flex justify-between items-end'>
							<span className='text-blue-dark font-bold'>
								S/ {currencyFormat(currentUser.balance)}
							</span>
							<span className='text-xs text-gray'>
								Current Balance
							</span>
						</div>
					</Block>
				</Card>
			) : (
				<Card
					title='Error'
					subtitle='You are not logged in.'
					blur={true}>
					<RoundedButton compClass='bg-white bg-opacity-70'>
						<Link to='/createaccount'>Create account</Link>
					</RoundedButton>
				</Card>
			)}
		</PageContainer>
	);
};

export default Withdraw;
