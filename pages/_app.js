import "../styles/globals.css";
import AuthProvider from "../utils/Auth.context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
