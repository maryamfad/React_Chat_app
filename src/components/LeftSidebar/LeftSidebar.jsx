import React from "react";
import "./LeftSidebar.css";
import { PiChatsBold } from "react-icons/pi";
import { TiThMenuOutline } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const LeftSidebar = () => {
	return (
		<div className="left-sidebar">
			<div className="left-sidebar-top">
				<div className="left-sidebar-nav">
					<div className="logo">
						<PiChatsBold size={130} />
						<p>Chat App</p>
					</div>
					<div className="menu">
						<TiThMenuOutline size={16} />
					</div>
				</div>
				<div className="left-sidebar-search">
					<FaSearch size={16} />
					<input type="text" placeholder="Search here ..." />
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
