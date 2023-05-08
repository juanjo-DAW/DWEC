import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewObjective() {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const [horasObjetivo, setHorasObjetivo] = useState(0);
  const [horasPorDia, setHorasPorDia] = useState(Array(7).fill(0));
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().substring(0, 10));
  const [diasNoDisponibles, setDiasNoDisponibles] = useState([]);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleHorasObjetivoChange = (event) => {
    setHorasObjetivo(parseInt(event.target.value));
  };

  const handleHorasPorDiaChange = (event, index) => {
    const horas = [...horasPorDia];
    horas[index] = parseInt(event.target.value);
    setHorasPorDia(horas);
  };

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleDiasNoDisponiblesChange = (event) => {
    const dias = event.target.value.split(",").map((dia) => dia.trim());
    setDiasNoDisponibles(dias);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Crear objeto del objetivo
    const objetivo = {
      nombre,
      horasObjetivo,
      horasPorDia,
      fechaInicio,
      diasNoDisponibles,
    };
    // Guardar el objetivo en el local storage con una clave única
    const clave = `${nombre}_${new Date().getTime()}`;
    localStorage.setItem(clave, JSON.stringify(objetivo));
    // Navegar a la página principal
    navigate("/");
  };
  
  return (
    <div>
      <h2>Nuevo objetivo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre del objetivo:
            <input type="text" value={nombre} onChange={handleNombreChange} required />
          </label>
        </div>
        <div>
          <label>
            Horas objetivo:
            <input type="number" value={horasObjetivo} onChange={handleHorasObjetivoChange} required />
          </label>
        </div>
        <div>
          <label>
            Horas por día:
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia, index) => (
              <div key={dia}>
                {dia}:
                <input type="number" value={horasPorDia[index]} onChange={(event) => handleHorasPorDiaChange(event, index)} required />
              </div>
            ))}
          </label>
        </div>
        <div>
          <label>
            Fecha de inicio:
            <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} required />
          </label>
        </div>
        <div>
          <label>
            Días no disponibles (separados por comas):
            <input type="text" value={diasNoDisponibles} onChange={handleDiasNoDisponiblesChange} />
          </label>
        </div>
        <div>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default NewObjective;