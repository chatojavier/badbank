import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../components/UserPersistence');
jest.mock('../components/UpdateUserValues');
jest.mock('../components/RequireAuth');
jest.mock('../firebase-config');

describe('Testing App Routes (Logged In)', () => {
	test('Balance', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		//go to create account page
		const homeButton = screen.getByRole('link', { name: 'home_link' });
		userEvent.click(homeButton);
		const balanceButton = screen.getByRole('link', {
			name: 'balance_link',
		});
		userEvent.click(balanceButton);
		const balanceText = screen.getAllByText(/Balance/i);
		const currentBalanceText = screen.getByText(/Current Balance/i);
		expect(balanceText.length).toEqual(3);
		expect(currentBalanceText).toBeInTheDocument();
	});
	test('Deposit', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		//go to create account page
		const homeButton = screen.getByRole('link', { name: 'home_link' });
		userEvent.click(homeButton);
		const depositButton = screen.getByRole('link', {
			name: 'deposit_link',
		});
		userEvent.click(depositButton);
		const depositText = screen.getAllByText(/Deposit/i);
		const currentBalanceText = screen.getByText(/Current Balance/i);
		expect(depositText.length).toEqual(2);
		expect(currentBalanceText).toBeInTheDocument();
	});
	test('Withdraw', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		//go to create account page
		const homeButton = screen.getByRole('link', { name: 'home_link' });
		userEvent.click(homeButton);
		const withdrawButton = screen.getByRole('link', {
			name: 'withdraw_link',
		});
		userEvent.click(withdrawButton);
		const withdrawText = screen.getAllByText(/Withdraw/i);
		const currentBalanceText = screen.getByText(/Current Balance/i);
		expect(withdrawText.length).toEqual(2);
		expect(currentBalanceText).toBeInTheDocument();
	});
	test('All Data', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		//go to create account page
		const homeButton = screen.getByRole('link', { name: 'home_link' });
		userEvent.click(homeButton);
		const alldataButton = screen.getByRole('link', {
			name: 'alldata_link',
		});
		userEvent.click(alldataButton);
		const alldataText = screen.getAllByText(/All Data/i);
		const uidText = screen.getByText(/UID/i);
		expect(alldataText.length).toEqual(2);
		expect(uidText).toBeInTheDocument();
	});
	test('Login in login redirect to Balance', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		//go to create account page
		const homeButton = screen.getByRole('link', { name: 'home_link' });
		userEvent.click(homeButton);
		window.history.pushState({}, 'Login', '/login');
		setTimeout(() => {
			const balanceText = screen.getAllByText(/Balance/i);
			const currentBalanceText = screen.getByText(/Current Balance/i);
			expect(balanceText.length).toEqual(3);
			expect(currentBalanceText).toBeInTheDocument();
		}, 1000);
	});
	test('Create Acount', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		//go to create account page
		const createAccountButton = screen.getByText(/Add an account/i);
		userEvent.click(createAccountButton);
		const createAccountText = screen.getByText(
			/Please fill the imputs to create account./i
		);
		expect(createAccountText).toBeInTheDocument();
	});
});
