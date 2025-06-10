import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
	apiKey: "AIzaSyAnidGxgJXpUrzztc9edil54p48tVGWaWg",
	authDomain: "chatapp-36a9d.firebaseapp.com",
	projectId: "chatapp-36a9d",
	storageBucket: "chatapp-36a9d.firebasestorage.app",
	messagingSenderId: "371623923554",
	appId: "1:371623923554:web:35cce7255930a86c36e63b",
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
