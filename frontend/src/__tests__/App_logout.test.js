import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../components/UserPersistence');
jest.mock('../components/UpdateUserValues', () => {
	return {
		__esModule: true,
		default: ({ children }) => {
			return children;
		},
	};
});

describe('Testing App Routes (Logged Out)', () => {
	test('Create Acount', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		//go to create account page
		const createAccountButton = screen.getByText(/Create Account/i);
		userEvent.click(createAccountButton);
		const createAccountText = screen.getByText(
			/Please fill the imputs to create account./i
		);
		expect(createAccountText).toBeInTheDocument();
	});
	test('Loggin', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		//go to create account page
		const loginButton = screen.getByText(/Sign In/i);
		userEvent.click(loginButton);
		const loginText = screen.getByText(/Please sign in to your account./i);
		expect(loginText).toBeInTheDocument();
	});
	test('Home', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		//go to create account page
		const homeButton = screen.getByRole('link', { name: 'home_link' });
		userEvent.click(homeButton);
		const homeText = screen.getByText(/Your unreliable bank/i);
		expect(homeText).toBeInTheDocument();
	});
});
