import React, { useState } from "react";
import "./ProfileUpdate.css";
import { RxAvatar } from "react-icons/rx";
import { PiChatsBold } from "react-icons/pi";

const ProfileUpdate = () => {
	const [image, setImage] = useState(false);
	return (
		<div className="profile">
			<div className="profile-container">
				<form className="profile-form">
					<h3>Profile Details</h3>
					<label htmlFor="avatar">
						<input
							onChange={(e) => {
								setImage(e.target.files[0]);
							}}
							type="file"
							id="avatar"
							accept=".png .jpg .jpeg"
							hidden
						/>
						{image ? (
							<img
								src={URL.createObjectURL(image)}
								alt="profile pic"
							/>
						) : (
							<RxAvatar size={40} color="grey" />
						)}
						Upload Profile Image
					</label>
					<input type="text" placeholder="Your Name" required />
					<textarea
						placeholder="Write Profile Bio"
						required
					></textarea>
					<button type="submit">Save</button>
				</form>
				{image ? (
					<img
						className="profile-pic"
						src={URL.createObjectURL(image)}
						alt="profile pic"
					/>
				) : (
					<div className="logo">
						<PiChatsBold size={40} className="profile-pic" />
						<p>Chat App</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileUpdate;
