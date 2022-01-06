import { useContext, useEffect } from 'react';
import PageContainer from '../../components/PageContainer';
import Card from '../../components/Card';
import Block from '../../components/Block';
import BarPercent from '../../components/BarPercent';
import { UserContext } from '../../contexts/UserContext';
import currencyFormat from '../../helpers/currencyFormat';

const Balance = () => {
	const { userValues } = useContext(UserContext);

	return (
		<PageContainer>
			<Card title='Balance' compClass='w-full' blur={true}>
				<Block compClass='w-96 mb-4' key='balance'>
					<div className='flex justify-between items-end'>
						<span className='text-blue-dark font-bold'>
							S/ {currencyFormat(userValues.balance)}
						</span>
						<span className='text-xs text-gray'>
							Current Balance
						</span>
					</div>
					<BarPercent
						percent={
							(userValues.balance * 100) / userValues.deposits
						}
					/>
				</Block>
				<Block compClass='w-96 mb-4' key='deposits'>
					<div className='flex justify-between items-end'>
						<span className='text-green-700 font-bold'>
							S/ {currencyFormat(userValues.deposits)}
						</span>
						<span className='text-xs text-gray'>Income</span>
					</div>
					<BarPercent percent={100} color='green' />
				</Block>
				<Block compClass='w-96' key='withdraw'>
					<div className='flex justify-between items-end'>
						<span className='text-red-700 font-bold'>
							S/ {currencyFormat(userValues.withdraws)}
						</span>
						<span className='text-xs text-gray'>Outcome</span>
					</div>
					<BarPercent
						percent={
							(userValues.withdraws * 100) / userValues.deposits
						}
						color='red'
					/>
				</Block>
			</Card>
		</PageContainer>
	);
};

export default Balance;
