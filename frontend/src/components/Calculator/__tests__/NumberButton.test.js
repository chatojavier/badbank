import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberButton from '../NumberButton';

describe('Calcularot Number Button Behavior', () => {
	test('Passing number value', () => {
		const number = 0;
		const { rerender } = render(
			<NumberButton
				key={number}
				value={number}
				onClickNumber={() => true}
			/>
		);
		expect(screen.getByTestId('number-button')).toHaveTextContent(0);
		rerender(<NumberButton key={2} value={2} onClickNumber={() => true} />);
		expect(screen.getByTestId('number-button')).toHaveTextContent('2');
		rerender(
			<NumberButton key='dot' value={'.'} onClickNumber={() => true} />
		);
		expect(screen.getByTestId('number-button')).toHaveTextContent('.');
	});
	test('Passing Accept value', () => {
		render(
			<NumberButton
				key='accept'
				value='Accept'
				onClickAccept={() => true}
			/>
		);
		expect(screen.getByTestId('number-button')).toHaveTextContent('Accept');
	});
	test('Passing Clear value', () => {
		render(
			<NumberButton
				key='clear'
				value='Clear'
				onClickNumber={() => true}
			/>
		);
		expect(screen.getByTestId('number-button')).toHaveTextContent('Clear');
	});
	test('Testing Color and ColSpan Atributes', () => {
		render(<NumberButton key={0} value={0} colSpan={3} color='green' />);
		expect(screen.getByTestId('number-button')).toHaveClass(
			'col-span-3',
			'border-green',
			'text-green',
			'from-green',
			'to-green-dark'
		);
	});
	test('Test button disabled', () => {
		render(<NumberButton key={0} value={0} submitDisabled={true} />);
		expect(screen.getByTestId('number-button')).toBeDisabled();
	});
});
