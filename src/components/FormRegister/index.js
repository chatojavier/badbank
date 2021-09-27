import { useState } from "react";
import RoundedButton from "../RoundedButton";

const FormRegister = ({ inputs, onClick }) => {
	const [accepted, setAccepted] = useState(false);

	const elInputs = inputs.map((input) => (
		<div className='space-y-2' key={input.label}>
			<label className='text-sm font-medium text-gray-700 tracking-wide'>
				{input.label}
			</label>
			<input
				className=' w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue'
				type={input.type}
				placeholder={input.placeholder}
				value={input.value}
				onChange={(e) => {
					const currentValue = e.currentTarget.value;
					input.setValue(currentValue);
				}}
			/>
		</div>
	));

	return (
		<div className='space-y-5'>
			{elInputs}
			<div className='flex items-center'>
				<input
					id='terms'
					name='terms'
					type='checkbox'
					className='h-4 w-4 bg-blue-dark focus:ring-blue border-gray-300 rounded'
					defaultChecked={accepted}
					onChange={() => setAccepted(!accepted)}
				/>
				<label className='ml-2 block text-sm text-gray-800'>
					<span>I accept the </span>
					<a
						href='#/createaccount'
						className='text-blue-dark hover:underline'>
						terms of service
					</a>
				</label>
			</div>
			<RoundedButton
				type='submit'
				compClass='w-36 py-2 text-sm'
				color='blue'
				onClick={onClick}
				isDisabled={!inputs.every((input) => input.value && accepted)}>
				Register
			</RoundedButton>
		</div>
	);
};

export default FormRegister;
