import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
	apiKey: import.meta.env.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.env
		.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await setDoc(doc(db, "users", user.uid), {
			id: user.uid,
			username: username.toLowerCase(),
			email,
			name: "",
			avatar: "",
			bio: "Hey there, I am using chat app",
			lastSeen: Date.now(),
		});
		await setDoc(doc(db, "chats", user.uid), {
			chatData: [],
		});
	} catch (error) {
		console.log("error in sign up", error);
		toast.error(error.message);
	}
};

export { signup };
