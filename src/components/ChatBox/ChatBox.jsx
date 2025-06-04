import React from "react";
import { FaCircle } from "react-icons/fa";
import { LuMessageCircleWarning } from "react-icons/lu";
import { GrGallery } from "react-icons/gr";
import { IoSendOutline } from "react-icons/io5";

import "./ChatBox.css";
const ChatBox = () => {
	return (
		<div className="chat-box">
			<div className="chat-user">
				<img src="/profile-pic-1.avif" alt="profile pic" />

				<p>
					Richard Sanford <FaCircle size={8} color="#5bf232" />{" "}
				</p>
				<LuMessageCircleWarning className="help" />
			</div>

			<div className="chat-message">
				<div className="sender-message">
					<p className="message">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
					<div>
						<img src="/profile-pic-1.avif" alt="profile pic" />
						<p>2:30 PM</p>
					</div>
				</div>
				<div className="sender-message">
					<img
						src="/pic1.avif"
						alt="sent pic"
						className="message-image"
					/>
					<div>
						<img src="/profile-pic-1.avif" alt="profile pic" />
						<p>2:30 PM</p>
					</div>
				</div>
				<div className="reciever-message">
					<p className="message">
						Laborum doloribus in mollitia vitae obcaecati veritatis
						dolor.
					</p>
					<div>
						<img src="/profile-pic-1.avif" alt="profile pic" />
						<p>2:30 PM</p>
					</div>
				</div>
			</div>
			<div className="chat-input">
				<input type="text" placeholder="Send a message" />
				<input
					type="file"
					id="image"
					accept="image/png, image/jpeg"
					hidden
				/>
				<label htmlFor="image">
					<GrGallery className="icon" size={18} />
				</label>
				<IoSendOutline className="icon" size={18} />
			</div>
		</div>
	);
};

export default ChatBox;
