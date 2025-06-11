import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
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
