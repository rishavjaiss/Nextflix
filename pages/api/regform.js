export default function handler(req, res) {
  res.status(200).json({ email: req.body.email, password: req.body.password });
}
