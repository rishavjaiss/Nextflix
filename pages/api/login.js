import { firebaseAuth, firestore } from "../../firebase.config";

export default function handler(req, res) {
  const auth = firebaseAuth.getAuth();
  firebaseAuth
    .signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(({ user }) => {
      getProfiles(user).then((profiles) => {
        res
          .status(200)
          .json({ status: "Successful", userData: user, profiles });
      });
    })
    .catch((error) => {
      res.status(404).json({ status: "Something went wrong.", error });
    });
}

const getProfiles = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const profiles = [];
      const querySnapshot = await firestore.getDocs(
        firestore.collection(firestore.db, `user-${user.uid}`)
      );
      querySnapshot.forEach((doc) => {
        profiles.push({ id: doc.id, alias: doc.data().first });
      });
      resolve(profiles);
    } catch (e) {
      reject(e);
    }
  });
};
