import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";

function DeleteObjective() {
    const [objetivos, setObjetivos] = useState([]);
  
    useEffect(() => {
      const objetivos = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)));
      setObjetivos(objetivos);
    }, []);
  
    const handleBorrarObjetivo = (id) => {
      const nuevosObjetivos = objetivos.filter((objetivo) => objetivo.id !== id);
      setObjetivos(nuevosObjetivos);
    
      localStorage.removeItem(id.toString());
    
      nuevosObjetivos.forEach((objetivo) => {
        localStorage.setItem(objetivo.id.toString(), JSON.stringify(objetivo));
      });
    };
    
    return (
      <div>
        <h1>Lista de objetivos</h1>
        <ul>
          {objetivos.map((objetivo) => (
            <li key={objetivo.id}>
              <Link to={`/objetivos/${objetivo.id}`}>{objetivo.nombre}</Link>
              <button onClick={() => handleBorrarObjetivo(objetivo.id)}>Borrar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
export default DeleteObjective;