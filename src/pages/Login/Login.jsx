import React, { useState } from "react";
import "./Login.css";
import { PiChatsBold } from "react-icons/pi";
import { signup } from "../../config/firebase";

const Login = () => {
	const [currentState, setCurrentState] = useState("Sign Up");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmitHandler = (event) => {
		event.preventDefault();
		if (currentState === "Sign Up") {
			signup(username, email, password);
		}
	};

	return (
		<div className="login">
			<div className="logo">
				<PiChatsBold size={130} className="logo-icon" />
				<p>Chat App</p>
			</div>
			<div className="login-form">
				<form onSubmit={onSubmitHandler}>
					<h2>{currentState}</h2>
					{currentState === "Sign Up" && (
						<input
							type="text"
							placeholder="username"
							className="form-input"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					)}
					<input
						type="email"
						placeholder="Email Adress"
						className="form-input"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="form-input"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
		</div>
	);
};

export default Login;
