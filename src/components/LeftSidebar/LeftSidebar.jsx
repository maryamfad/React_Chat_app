import React from "react";
import "./LeftSidebar.css";
import { PiChatsBold } from "react-icons/pi";
import { TiThMenuOutline } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const LeftSidebar = () => {
	const navigate = useNavigate();

	const inputHandler = async (e) => {
		try {
			const input = e.target.value;
			const userRef = collection(db, "users");
			const q = query(
				userRef,
				where("username", "==", input.toLowerCase())
			);
			const querySnap = await getDocs(q);
			if (!querySnap.empty) {
				console.log(querySnap.docs[0].data());
			}
		} catch (error) {
			console.log("error in ", error);
			toast.error(error.message);
		}
	};
	return (
		<div className="left-sidebar">
			<div className="left-sidebar-top">
				<div className="left-sidebar-nav">
					<div className="logo">
						<PiChatsBold size={40} />
						<p>Chat App</p>
					</div>
					<div className="menu">
						<TiThMenuOutline className="menu-icon" size={16} />
						<div className="sub-menu">
							<p onClick={() => navigate("/profile")}>
								Edit Profile
							</p>
							<hr />
							<p>Logout</p>
						</div>
					</div>
				</div>
				<div className="left-sidebar-search">
					<FaSearch size={16} />
					<input
						onChange={inputHandler}
						type="text"
						placeholder="Search here ..."
					/>
				</div>
			</div>
			<div className="left-sidebar-list">
				{Array(12)
					.fill("")
					.map((item, index) => (
						<div key={index} className="friends">
							<img src="/profile-pic-1.avif" alt="profile pic" />
							<div>
								<p>Richard Sanford</p>
								<span>Hello, How are you?</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default LeftSidebar;
