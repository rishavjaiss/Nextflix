import { firebaseAuth } from "../../firebase.config";

export default function handler(req, res) {
  const auth = firebaseAuth.getAuth();
  firebaseAuth
    .signOut(auth)
    .then(() => {
      res.status(200).json({ status: "Successful" });
    })
    .catch((error) => {
      res.status(404).json({ status: "Something went wrong.", error });
    });
}
