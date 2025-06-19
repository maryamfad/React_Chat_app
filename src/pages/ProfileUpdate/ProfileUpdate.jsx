import React, { useState, useEffect, useContext } from "react";
import "./ProfileUpdate.css";
import { RxAvatar } from "react-icons/rx";
import { PiChatsBold } from "react-icons/pi";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { AppContext } from "../../context/AppContext";

const ProfileUpdate = () => {
	const navigate = useNavigate();
	const [image, setImage] = useState(false);
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [uid, setUid] = useState("");
	const [prevImage, setPrevImage] = useState(null);

	const { setUserData } = useContext(AppContext);

	const profileUpdate = async (event) => {
		event.preventDefault();
		try {
			const docRef = doc(db, "users", uid);
			if (image) {
				console.log(image);

				const imageURL = await upload(image);
				setPrevImage(imageURL);
				await updateDoc(docRef, {
					avatar: imageURL,
					bio: bio,
					name: name,
				});
			} else {
				await updateDoc(docRef, {
					bio: bio,
					name: name,
				});
			}
			const snap = await getDoc(docRef);
			setUserData(snap.data());
			navigate("/chat");
		} catch (error) {
			console.log("error in updating profile", error);
			toast.error(error);
		}
	};

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUid(user.uid);
				const docRef = doc(db, "users", user.uid);
				const docSnap = await getDoc(docRef);

				if (docSnap.data().name) {
					setName(docSnap.data().name);
				}
				if (docSnap.data().bio) {
					setBio(docSnap.data().bio);
				}
				if (docSnap.data().avatar) {
					setPrevImage(docSnap.data().avatar);
				}
			} else {
				// navigate("/");
			}
		});
	}, []);

	return (
		<div className="profile">
			<div className="profile-container">
				<form onSubmit={profileUpdate} className="profile-form">
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
					<input
						type="text"
						placeholder="Your Name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<textarea
						placeholder="Write Profile Bio"
						required
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					></textarea>
					<button type="submit">Save</button>
				</form>
				{image ? (
					<img
						className="profile-pic"
						src={URL.createObjectURL(image)}
						alt="profile pic"
					/>
				) : prevImage ? (
					<img
						className="profile-pic"
						src={prevImage}
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
