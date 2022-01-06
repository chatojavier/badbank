import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index';
import { UserContext } from '../../contexts/UserContext';

test('renders Home', () => {
	const isLogged = false;
	render(
		<UserContext.Provider
			value={{
				isLogged,
			}}>
			<Home />
		</UserContext.Provider>
	);
	const linkElement = screen.getByText('Your unreliable bank');
	expect(linkElement).toBeInTheDocument();
});
