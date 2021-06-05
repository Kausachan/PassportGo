import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyB0y6fxmo6Wgwgyr62baIp_EHTqymCTxZ0",
    authDomain: "passport-a112d.firebaseapp.com",
    projectId: "passport-a112d",
    storageBucket: "passport-a112d.appspot.com",
    messagingSenderId: "495464334099",
    appId: "1:495464334099:web:a7145f2bc3a2fc1f9050e6",
    measurementId: "G-WY96L2TNQB"
}

export const createUserProfile = async (userAuth, additionalData) =>{
	if(!userAuth) return;
	const userRef = await firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	if(!snapShot.exists)
	{
		const {displayName, email} = userAuth;
		const createdAt = new Date();

		try{
			await userRef.set({
				displayName,
				email,
				createdAt,
				 Registration : false,
            	Verification : false,
				...additionalData
			})
		}catch (e){
			console.log(e);
		}
	}
	return userRef;
}

if(!firebase.apps.length){
	firebase.initializeApp(config);
}else{
	firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;