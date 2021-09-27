import { useContext } from "react";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import Block from "../../components/Block";
import BarPercent from "../../components/BarPercent";
import getCurrentMonth from "../../helpers/getCurrentMonth";
import { UserContext } from "../../contexts/UserContext";
import currencyFormat from "../../helpers/currencyFormat";
import RoundedButton from "../../components/RoundedButton";
import { Link } from "react-router-dom";

const Balance = () => {
	const { userValues } = useContext(UserContext);
	const currentUser = userValues.users[userValues.userIndex];
	return (
		<PageContainer>
			{userValues.userIndex !== null ? (
				<Card title='Balance' compClass='w-full' blur={true}>
					<Block compClass='w-96 mb-4' key='balance'>
						<div className='flex justify-between items-end'>
							<span className='text-blue-dark font-bold'>
								S/ {currencyFormat(currentUser.balance)}
							</span>
							<span className='text-xs text-gray'>
								Current Balance
							</span>
						</div>
						<BarPercent
							percent={
								(currentUser.balance * 100) /
								currentUser.deposits
							}
						/>
					</Block>
					<Block compClass='w-96 mb-4' key='deposits'>
						<div className='flex justify-between items-end'>
							<span className='text-green-700 font-bold'>
								S/ {currencyFormat(currentUser.deposits)}
							</span>
							<span className='text-xs text-gray'>Income</span>
						</div>
						<BarPercent percent={100} color='green' />
					</Block>
					<Block compClass='w-96' key='withdraw'>
						<div className='flex justify-between items-end'>
							<span className='text-red-700 font-bold'>
								S/ {currencyFormat(currentUser.withdraws)}
							</span>
							<span className='text-xs text-gray'>Outcome</span>
						</div>
						<BarPercent
							percent={
								(currentUser.withdraws * 100) /
								currentUser.deposits
							}
							color='red'
						/>
					</Block>
				</Card>
			) : (
				<Card
					title='Balance'
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

export default Balance;
