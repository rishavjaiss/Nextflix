import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);

export async function getProfileImage() {
  const listRef = ref(storage, "gs://nextflix-6f202.appspot.com/images");
  return new Promise((resolve, reject) => {
    listAll(listRef)
      .then((res) => {
        const randomNumber = Math.ceil(Math.random() * res.items.length);
        getDownloadURL(
          ref(
            storage,
            `gs://nextflix-6f202.appspot.com/${res.items[randomNumber].fullPath}`
          )
        )
          .then((url) => {
            resolve(url);
          })
          .catch((e) => reject(e));
      })
      .catch((error) => reject(error));
  });
}

export async function createProfile(user, newAlias, role) {
  return new Promise(async (resolve, reject) => {
    try {
      const imageUrl = await getProfileImage();
      const docRef = await addDoc(collection(db, `user-${user.uid}`), {
        first: newAlias ? newAlias : user.email.split("@")[0],
        image: imageUrl,
        role,
      });
      resolve(docRef);
    } catch (e) {
      reject(e);
    }
  });
}

export async function getProfiles(uid) {
  return new Promise(async (resolve, reject) => {
    try {
      const profiles = [];
      const querySnapshot = await getDocs(collection(db, `user-${uid}`));
      querySnapshot.forEach((doc) => {
        profiles.push({
          id: doc.id,
          alias: doc.data().first,
          imageUrl: doc.data().image,
        });
      });
      resolve(profiles);
    } catch (e) {
      reject(e);
    }
  });
}

export async function checkSession() {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({ data: user });
      } else {
        reject({ data: "No User" });
      }
    });
  });
}

const firebaseAuth = {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};

const firestore = {
  db,
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
};
export { firebaseAuth, firestore };
