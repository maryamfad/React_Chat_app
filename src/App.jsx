import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
const App = () => {
	const navigate = useNavigate();
	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				navigate("/chat");
			} else {
				navigate("/");
			}
		});
	}, []);
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Login />}></Route>
				<Route path="/chat" element={<Chat />}></Route>
				<Route path="/profile" element={<ProfileUpdate />}></Route>
			</Routes>
		</>
	);
};

export default App;
