import { firebaseAuth, createProfile } from "../../firebase.config";

export default function handler(req, res) {
  const auth = firebaseAuth.getAuth();
  firebaseAuth
    .createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(({ user }) => {
      createProfile(user, null, "admin").then((doc) => {
        res.status(200).json({
          status: "Account Created.",
          userData: user,
          userDocRef: doc,
        });
      });
    })
    .catch((error) => {
      res.status(404).json({ status: "Something went wrong.", message: error });
    });
}
