import { useEffect } from "react";
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuth, isAuth }) {

     // const [currentDisplayname, setcurrentDisplayname] = useState(null);


     let navigate = useNavigate();

     // Handles user authentication with Google provider
     const signInWithGoogle = () => {
          signInWithPopup(auth, provider).then((result) => {
               localStorage.setItem("isAuth", true);
               setIsAuth(true);
               navigate("/home");
               // setcurrentDisplayname(auth.currentUser.displayName);
          });
     }


     // if the user is authenticated they are going to be redirected to the home page 
     useEffect(() => {
          if (isAuth) {
               navigate("/home");
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     return (
          <div className="login">
               <img className="laundrify" src="/assets/laundrify.svg" alt="Laundrify" />
               <div className="login-form">
                    <div className="login-form-inputs">
                         <h1>¡Bienvenido!</h1>
                         <h2>Inicia sesión con Google</h2>
                         <button className="login-with-google-btn" onClick={signInWithGoogle}>
                              Inicia sesión con Google
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default Login;