import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders Home", () => {
	render(<App />);
	const linkElement = screen.getByText(/Your unreliable bank/i);
	expect(linkElement).toBeInTheDocument();
});

test("create an account", () => {
	const { getByPlaceholderText, getByRole } = render(<App />);

	//go to create account page
	const registerButton = screen.getByText(/Create Account/i);
	userEvent.click(registerButton);

	//get elements
	const inputName = getByPlaceholderText("Enter your name");
	const inputEmail = getByPlaceholderText("address@email.com");
	const inputPassword = getByPlaceholderText("Enter your password");
	const button = getByRole("button", { name: /register/i });

	//make new events
	userEvent.type(inputName, "Javier");
	userEvent.type(inputEmail, "javier@mit.edu");
	userEvent.type(inputPassword, "secret");
	userEvent.click(button);

	//Check data
	const submitMessage = screen.getByText(/You are registered now./i);
	expect(submitMessage).toBeInTheDocument();
});
