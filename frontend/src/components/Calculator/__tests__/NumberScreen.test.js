import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberScreen from '../NumberScreen';

describe('Calcularot Number Screen Behavior', () => {
	test('Passing Screen Values', () => {
		const numValue = 2350.76;
		const { rerender } = render(
			<NumberScreen value={numValue} onChange={() => true} />
		);
		expect(screen.getByPlaceholderText('0').value).toBe('2350.76');
		rerender(<NumberScreen value={34.98765} onChange={() => true} />);
		expect(screen.getByPlaceholderText('0').value).toBe('34.98765');
	});
	test('Passing Alert Values', () => {
		const alertValue = 'this is an alert';
		render(
			<NumberScreen value={1} onChange={() => true} alert={alertValue} />
		);
		const currentBalanceText = screen.getByText(/this is an alert/i);
		expect(currentBalanceText).toBeInTheDocument();
	});
});
