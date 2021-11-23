import { getAuth, createUserWithEmailAndPassword } from "../../firebase.config";

export default function handler(req, res) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(({ user }) => {
      res.status(200).json({ status: "Account Created.", user });
    })
    .catch((error) => {
      res.status(404).json({ status: "Something went wrong.", error });
    });
}
