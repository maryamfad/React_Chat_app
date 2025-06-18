import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
	const [userData, setUserData] = useState(null);
	const [chatData, setChatData] = useState(null);

	const loadUserData = async (uid) => {
		try {
			const userRef = doc(db, "users", uid);
			const userSnap = await getDoc(userRef);
			const userData = userSnap.data();
			setUserData(userData);

			//update last seen time
			await updateDoc(userRef, {
				lastSeen: Date.now(),
			});

			//update last seen time every one minute
			setInterval(async () => {
				if (auth.chatUser) {
					await updateDoc(userRef, {
						lastSeen: Date.now(),
					});
				}
			}, 60000);
		} catch (error) {
			console.log("error in load user data", error);
			toast.error(error.code.split("/")[1].split("-").join(" "));
		}
	};

	useEffect(() => {
		if (userData) {
			const chatRef = doc(db, "chat", userData.id);
			const unsub = onSnapshot(chatRef, async (res) => {
				const chatItems = res.data().chatData;
				const tempData = [];
				for (const item of chatItems) {
					const userRef = doc(db, "users", item.rId);
					const userSnap = await getDoc(userRef);
					const userData = userSnap.data();
					tempData.push({ ...item, userData });
				}
				setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
			});

			return () => {
				unsub();
			};
		}
	}, [userData]);
	const value = {
		userData,
		setUserData,
		chatData,
		setChatData,
		loadUserData,
	};
	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
