import React, { useContext, useState } from "react";
import "./LeftSidebar.css";
import { PiChatsBold } from "react-icons/pi";
import { TiThMenuOutline } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";

const LeftSidebar = () => {
	const navigate = useNavigate();
	const { userData } = useContext(AppContext);
	const [users, setUsers] = useState([]);
	const [showSearch, setShowSearch] = useState(false);
	const inputHandler = async (e) => {
		try {
			const input = e.target.value;
			if (input) {
				setShowSearch(true);
				const userRef = collection(db, "users");
				const q = query(
					userRef,
					where("username", ">=", input.toLowerCase()),
					where("username", "<", input.toLowerCase() + "\uf8ff")
				);
				const querySnap = await getDocs(q);
				if (!querySnap.empty) {
					const matchedUsers = querySnap.docs
						.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
						.filter((user) => user.id !== userData.id);
					console.log(matchedUsers);
					console.log(userData);

					setUsers(matchedUsers);
				} else {
					setUsers(null);
				}
			} else {
				setShowSearch(false);
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
				{showSearch && users.length > 0
					? users.map((item, index) => (
							<div key={index} className="friends add-user">
								<img
									src={item.avatar || "/person.png"}
									style={{ background: "white" }}
								/>
								<p>{item.name}</p>
							</div>
					  ))
					: Array(12)
							.fill("")
							.map((item, index) => (
								<div key={index} className="friends">
									<img
										src="/profile-pic-1.avif"
										alt="profile pic"
									/>
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
