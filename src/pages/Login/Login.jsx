import React, { useState } from "react";
import "./Login.css";
import { PiChatsBold } from "react-icons/pi";
const Login = () => {
	const [currentState, setCurrentState] = useState("Sign Up");
	return (
		<div className="login">
			<div className="logo">
				<PiChatsBold size={130} className="logo" />

				<p>Chat App</p>
			</div>
			<form className="login-form">
				<h2>{currentState}</h2>
				{currentState === "Sign Up" && (
					<input
						type="text"
						placeholder="username"
						className="form-input"
						required
					/>
				)}
				<input
					type="email"
					placeholder="Email Adress"
					className="form-input"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					className="form-input"
					required
				/>
				{currentState === "Sign Up" && (
					<div className="login-term">
						<input type="checkbox" />
						<p>Agree to the terms of use & provacy policy.</p>
					</div>
				)}
				<button type="submit">{currentState}</button>

				<div className="login-forgot">
					<p className="login-toggle">
						{currentState === "Sign Up"
							? "Already have an account? "
							: "You don't have an account? "}
						<span
							onClick={() => {
								if (currentState === "Sign Up") {
									setCurrentState("Login");
								} else {
									setCurrentState("Sign Up");
								}
							}}
						>
							click here
						</span>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
