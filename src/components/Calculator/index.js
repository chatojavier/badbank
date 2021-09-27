import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import currencyFormat from "../../helpers/currencyFormat";

const Calculator = ({ acceptHandler }) => {
	const [calcAmount, setCalcAmount] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [status, setStatus] = useState("");
	const { userValues, setUserValues } = useContext(UserContext);
	const currentUser = userValues.users[userValues.userIndex];
	const balance = currentUser.balance;
	const income = currentUser.deposits;
	const outcome = currentUser.withdraws;
	const isDeposit = window.location.hash === "#/deposit";

	function validate(s) {
		var rgx = /^[0-9]*\.?[0-9]*$/;
		const isValid = Boolean(s.match(rgx));
		return isValid;
	}

	const onChangeCalcAmount = (event) => {
		let newAmount = event.target.value;
		if (!validate(newAmount) && newAmount !== "-") {
			setStatus("Only numbers allowed");
			newAmount = newAmount.slice(0, -1);
		} else if (!validate(newAmount) && newAmount === "-") {
			setStatus("Only positive numbers allowed");
			newAmount = newAmount.slice(0, -1);
		} else {
			setStatus("");
			setCalcAmount(newAmount);
		}
		if (newAmount <= 0 || newAmount === false) {
			setSubmitDisabled(true);
		} else if (!isDeposit && newAmount > balance) {
			setSubmitDisabled(true);
			setStatus("The amount should be less than your balance");
		} else {
			setSubmitDisabled(false);
		}
	};

	const onClickNumber = (event) => {
		const numValue = event.target.innerHTML;
		let newAmount =
			Number(calcAmount) === 0 ? numValue : calcAmount + numValue;
		numValue === "Clear" && (newAmount = "");
		console.log(newAmount);
		validate(newAmount) && setCalcAmount(newAmount);
		if (newAmount <= 0 || (!isDeposit && newAmount > balance)) {
			setSubmitDisabled(true);
		} else {
			setSubmitDisabled(false);
		}
		event.preventDefault();
	};

	const onClickAccept = (event) => {
		if (isDeposit) {
			const newBalance = balance + Number(calcAmount);
			const newIncome = income + Number(calcAmount);
			const updatedCurrentUser = {
				...currentUser,
				balance: newBalance,
				deposits: newIncome,
			};
			const newUserValues = { ...userValues };
			newUserValues.users[userValues.userIndex] = updatedCurrentUser;
			setUserValues(newUserValues);
		} else {
			const newBalance = balance - Number(calcAmount);
			const newOutcome = outcome + Number(calcAmount);
			const updatedCurrentUser = {
				...currentUser,
				balance: newBalance,
				withdraws: newOutcome,
			};
			const newUserValues = { ...userValues };
			newUserValues.users[userValues.userIndex] = updatedCurrentUser;
			setUserValues(newUserValues);
		}
		setCalcAmount("");
		setSubmitDisabled(true);
		acceptHandler();
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
					value={"."}
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
				"number-button p-3 font-bold text-xl rounded-xl border border-solid text-center bg-white bg-opacity-70 active:bg-gradient-to-br active:text-white" +
				(submitDisabled
					? " opacity-30 cursor-default"
					: " hover:shadow") +
				(colSpan ? ` col-span-${colSpan}` : "") +
				(color
					? ` border-${color} text-${color} from-${color} to-${color}-dark`
					: " border-blue text-blue from-blue to-blue-dark")
			}
			onClick={onClickAccept ? onClickAccept : onClickNumber}
			disabled={submitDisabled}>
			{value}
		</button>
	);
}

export default Calculator;
