import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { auth } from '../../firebase-config';
import { useAuthUpdateDataApi } from '../../hooks/useDataApi';

const Calculator = ({ acceptHandler }) => {
	const [calcAmount, setCalcAmount] = useState('');
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [status, setStatus] = useState('');
	const { userValues, setUserValues } = useContext(UserContext);
	const [updateduserValues, setUpdateduserValues] = useState(userValues);
	const [skipCount, setSkipCount] = useState(true);
	const balance = userValues.balance;
	const income = userValues.deposits;
	const outcome = userValues.withdraws;
	const isDeposit = window.location.pathname === '/deposit';
	const [{ success, isError, isLoading, data }, setUpdateData] =
		useAuthUpdateDataApi({
			url: false,
			data: { uid: auth.currentUser.uid },
		});

	function validate(s) {
		var rgx = /^[0-9]*\.?[0-9]*$/;
		const isValid = Boolean(s.match(rgx));
		return isValid;
	}

	const onChangeCalcAmount = (event) => {
		let newAmount = event.target.value;
		if (!validate(newAmount) && newAmount !== '-') {
			setStatus('Only numbers allowed');
			newAmount = newAmount.slice(0, -1);
		} else if (!validate(newAmount) && newAmount === '-') {
			setStatus('Only positive numbers allowed');
			newAmount = newAmount.slice(0, -1);
		} else if (!isDeposit && newAmount > balance) {
			setStatus('The amount should be less than your balance');
			newAmount = newAmount.slice(0, -1);
		} else if (newAmount <= 0 || newAmount === false) {
			setSubmitDisabled(true);
			setCalcAmount('');
		} else {
			setStatus('');
			setCalcAmount(newAmount);
			setSubmitDisabled(false);
		}
		console.log(newAmount);
	};

	const onClickNumber = (event) => {
		const numValue = event.target.innerHTML;
		let newAmount =
			Number(calcAmount) === 0 ? numValue : calcAmount + numValue;
		numValue === 'Clear' && (newAmount = '');
		if (!isDeposit && newAmount > balance) {
			setStatus('The amount should be less than your balance');
			newAmount = newAmount.slice(0, -1);
		} else if (newAmount <= 0 || newAmount === false) {
			setSubmitDisabled(true);
			setCalcAmount('');
		} else {
			setStatus('');
			setCalcAmount(newAmount);
			setSubmitDisabled(false);
		}
		console.log(newAmount);
		event.preventDefault();
	};

	const onClickAccept = (event) => {
		if (isDeposit) {
			const newBalance = balance + Number(calcAmount);
			const newIncome = income + Number(calcAmount);

			const newUserValues = {
				...userValues,
				balance: newBalance,
				deposits: newIncome,
			};
			const url = process.env.REACT_APP_DEPOSIT_API;

			setUpdateduserValues(newUserValues);
			setUpdateData({ url: url, data: { ...data, ...newUserValues } });
			setSkipCount(false);
		} else {
			const newBalance = balance - Number(calcAmount);
			const newOutcome = outcome + Number(calcAmount);
			const newUserValues = {
				...userValues,
				balance: newBalance,
				withdraws: newOutcome,
			};
			const url = process.env.REACT_APP_WITHDRAW_API;

			setUpdateduserValues(newUserValues);
			setUpdateData({ url: url, data: { ...data, ...newUserValues } });
			setSkipCount(false);
		}
		event.preventDefault();
	};

	let numberButtonsList = [];
	for (let index = 1; index < 10; index++) {
		const element = (
			<NumberButton
				key={index}
				value={index}
				onClickNumber={onClickNumber}>
				index
			</NumberButton>
		);
		numberButtonsList.push(element);
	}

	useEffect(() => {
		if (skipCount) {
			return;
		}
		if (success) {
			setUserValues(updateduserValues);
			console.log('Updated Values: ', updateduserValues);
			setCalcAmount('');
			setSubmitDisabled(true);
			acceptHandler();
			setSkipCount(true);
		}
		if (isError) {
			setStatus('We had a problem with your operation.');
		}
	}, [isLoading]);

	return (
		<div className='calculator'>
			<NumberScreen
				value={calcAmount}
				onChange={onChangeCalcAmount}
				alert={status}></NumberScreen>
			<div className='calculator__buttons grid grid-cols-3 gap-2 mt-6'>
				{numberButtonsList}
				<NumberButton
					key='dot'
					value={'.'}
					onClickNumber={onClickNumber}></NumberButton>
				<NumberButton
					key='0'
					value={0}
					onClickNumber={onClickNumber}></NumberButton>
				<NumberButton
					key='clear'
					value='Clear'
					color='gray'
					onClickNumber={onClickNumber}></NumberButton>
				<NumberButton
					key='accept'
					value='Accept'
					color='green'
					colSpan={3}
					onClickAccept={onClickAccept}
					submitDisabled={submitDisabled}></NumberButton>
			</div>
		</div>
	);
};

function NumberScreen({ value, onChange, alert }) {
	return (
		<div className='relative'>
			<input
				pattern='^[0-9]{1,2}([,.][0-9]{1,2})?$'
				placeholder='0'
				step='0.01'
				className='number-screen w-full p-4 shadow-inner flex justify-between font-bold text-xl rounded-xl text-right | focus:outline-none focus:ring focus:ring-blue focus:ring-opacity-50'
				value={value}
				step='.01'
				onChange={onChange}></input>
			<div className='alert-msg absolute top-0 text-red text-xs m-2'>
				{alert}
			</div>
		</div>
	);
}

function NumberButton({
	value,
	color,
	onClickNumber,
	colSpan,
	onClickAccept,
	submitDisabled,
}) {
	return (
		<button
			className={
				'number-button p-3 font-bold text-xl rounded-xl border border-solid text-center bg-white bg-opacity-70 active:bg-gradient-to-br active:text-white' +
				(submitDisabled
					? ' opacity-30 cursor-default'
					: ' hover:shadow') +
				(colSpan ? ` col-span-${colSpan}` : '') +
				(color
					? ` border-${color} text-${color} from-${color} to-${color}-dark`
					: ' border-blue text-blue from-blue to-blue-dark')
			}
			onClick={onClickAccept ? onClickAccept : onClickNumber}
			disabled={submitDisabled}>
			{value}
		</button>
	);
}

export default Calculator;