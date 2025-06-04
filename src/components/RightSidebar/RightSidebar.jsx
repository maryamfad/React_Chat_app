import React from "react";
import "./RightSidebar.css";
import { FaCircle } from "react-icons/fa";

const RightSidebar = () => {
	return (
		<div className="right-sidebar">
			<div className="right-sidebar-profile">
				<img src="/profile-pic-1.avif" alt="profile pic" />
				<h3>Richard Sanford</h3>
				<p>
					Hey there, I am Richard Hanson using chat app.
					<FaCircle size={8} color="#5bf232" />
				</p>
			</div>
			<hr />
			<div className="right-sidebar-media">
				<p>Media</p>
				<div>
					<img src={"/pic1.avif"} alt="" />
					<img src={"/pic2.jpg"} alt="" />
					<img src={"/pic3.avif"} alt="" />
					<img src={"/pic4.avif"} alt="" />
					<img src={"/pic5.avif"} alt="" />
					<img src={"/pic6.avif"} alt="" />
				</div>
			</div>
			<button>Logout</button>
		</div>
	);
};

export default RightSidebar;
