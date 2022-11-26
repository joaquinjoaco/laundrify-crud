import { NavLink } from "react-router-dom";

const FormSelector = () => {
     return (

          <div className="form-selector">
               <NavLink exact to="/login" className="navlink" activeClassName="is-active">Iniciar sesión</NavLink>
               <NavLink exact to="/register" className="navlink" activeClassName="is-active">Registrarse</NavLink>
          </div>
     );
}

export default FormSelector;