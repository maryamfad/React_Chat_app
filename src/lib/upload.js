import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";

const upload = async (file) => {
	const storage = getStorage();
	const storageRef = ref(storage, `images/${Date.now() + file.name}`);

	const uploadTask = uploadBytesResumable(storageRef, file);

	return new Promise((resolve, reject) => {
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {
				console.log("error in upload image", error);
				toast.error(error.code.split("/")[1].split("-").join(" "));
				reject(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);
					resolve(downloadURL);
				});
			}
		);
	});
};

export default upload;
