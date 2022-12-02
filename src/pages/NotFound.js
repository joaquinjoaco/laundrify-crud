import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const NotFound = ({ setShowMobileBar, isAuth }) => {
     let navigate = useNavigate();
     useEffect(() => {
          setShowMobileBar(true);
          if (!isAuth) {
               navigate("/");
          }
     });

     return (
          <div className="not-found">

               <h1>Not found!</h1>
          </div>);
}

export default NotFound;