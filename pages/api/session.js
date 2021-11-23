import { getAuth, onAuthStateChanged } from "../../firebase.config";

export default function handler(req, res) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      res.status(200).json({ data: user });
    } else {
      res.status(404).json({ data: "No user, Please login!" });
    }
  });
}
