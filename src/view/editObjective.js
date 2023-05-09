import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";

function EditObjective() {
  const [objetivos, setObjetivos] = useState([]);

  useEffect(() => {
    const objetivos = Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
    setObjetivos(objetivos);
  }, []);

  const handleEditarObjetivo = (id) => {
    const objetivoIndex = objetivos.findIndex((objetivo) => objetivo.id === id);
  
    const objetivoEditado = { ...objetivos[objetivoIndex] };
  
    let nuevoNombre = "";
    while (!nuevoNombre) {
      nuevoNombre = prompt("Ingrese el nuevo nombre del objetivo:", objetivoEditado.nombre);
      if (!nuevoNombre) {
        mostrarError();
      }
    }
    objetivoEditado.nombre = nuevoNombre;
  
    let nuevaFechaInicio = "";
    while (!nuevaFechaInicio) {
      nuevaFechaInicio = prompt("Ingrese la nueva fecha de inicio (formato: YYYY-MM-DD):", objetivoEditado.fechaInicio);
      if (!nuevaFechaInicio) {
        mostrarError();
      } else if (!/^\d{4}-\d{2}-\d{2}$/.test(nuevaFechaInicio)) {
        nuevaFechaInicio = "";
        alert("La fecha ingresada no tiene el formato adecuado.");
      }
    }
    objetivoEditado.fechaInicio = nuevaFechaInicio;
    
  
    const nuevasHorasPorDia = [...objetivoEditado.horasPorDia];
    ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].forEach((dia, index) => {
      let nuevasHoras = "";
      while (nuevasHoras === "" || isNaN(nuevasHoras)) {
        nuevasHoras = prompt(`Ingrese las horas para ${dia} (actual: ${objetivoEditado.horasPorDia[index]})`);
      }
      nuevasHorasPorDia[index] = Number(nuevasHoras);
    });
    objetivoEditado.horasPorDia = nuevasHorasPorDia;
  
    const nuevosObjetivos = [...objetivos];
    nuevosObjetivos[objetivoIndex] = objetivoEditado;
    setObjetivos(nuevosObjetivos);
  
    function mostrarError() {
      alert("Debe ingresar un valor para continuar.");
    }
  
    localStorage.setItem(id.toString(), JSON.stringify(objetivoEditado));
  };
  
  return (
    <div>
      <h1>Lista de objetivos</h1>
      <ul>
        {objetivos.map((objetivo) => (
          <li key={objetivo.id}>
            <Link to={`/objetivos/${objetivo.id}`}>{objetivo.nombre}</Link>
            <div>Fecha de inicio: {objetivo.fechaInicio}</div>
            <div>Fecha de inicio: {objetivo.fechaFinalizacion}</div>
            <div>
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia, index) => (
                <div key={dia}>
                  {dia}: {objetivo.horasPorDia[index]}
                </div>
              ))}
            </div>
            <button onClick={() => handleEditarObjetivo(objetivo.id)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditObjective;