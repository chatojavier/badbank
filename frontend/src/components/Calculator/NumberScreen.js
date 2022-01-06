function NumberScreen({ value, onChange, alert }) {
	return (
		<div className='relative'>
			<input
				pattern='^[0-9]{1,2}([,.][0-9]{1,2})?$'
				placeholder='0'
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

export default NumberScreen;
