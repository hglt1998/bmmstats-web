import firebase from "../database/firebase";

export const searchAllRepertorios = async () => {
	try {
		const events = [];
		const actuacionesRef = firebase.db.collection("actuaciones").orderBy("fecha", "desc");
		const snapshot = await actuacionesRef.get();

		snapshot.forEach((doc) => {
			events.push(doc.data());
		});
		return events;
	} catch (error) {
		console.error(error);
	}
};
