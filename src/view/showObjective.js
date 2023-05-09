import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/app.css";

function ShowObjective() {
  const [objetivos, setObjetivos] = useState([]);
  const [filtroPorcentaje, setFiltroPorcentaje] = useState("");
  const [objetivosFiltrados, setObjetivosFiltrados] = useState([]);

  useEffect(() => {
    const objetivos = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)));
    setObjetivos(objetivos);
    setObjetivosFiltrados(objetivos);
  }, []);

  const calcularFechaFinalizacion = (horasPorDia, horasObjetivo, fechaInicio, diasNoDisponibles) => {
    let fechaFinalizacion = new Date(fechaInicio);
    let horasAcumuladas = 0;
    while (horasAcumuladas < horasObjetivo) {
      const diaSemana = fechaFinalizacion.getDay();
      if (!diasNoDisponibles.includes(diaSemana.toString())) {
        horasAcumuladas += horasPorDia[diaSemana];
      }
      fechaFinalizacion.setDate(fechaFinalizacion.getDate() + 1);
    }
    return fechaFinalizacion.toLocaleDateString();
  }

  const calcularPorcentajeProgreso = (horasPorDia, horasObjetivo, fechaInicio, diasNoDisponibles) => {
    const fechaActual = new Date();
    const fechaInicioMs = new Date(fechaInicio).getTime();
    const fechaActualMs = fechaActual.getTime();
    const horasTranscurridas = Math.floor((fechaActualMs - fechaInicioMs) / (1000 * 60 * 60));
    let horasAcumuladas = 0;
    let dia = new Date(fechaInicioMs);
    while (horasAcumuladas < horasTranscurridas && horasAcumuladas < horasObjetivo) {
      const diaSemana = dia.getDay();
      if (!diasNoDisponibles.includes(diaSemana.toString())) {
        horasAcumuladas += horasPorDia[diaSemana];
      }
      dia.setDate(dia.getDate() + 1);
    }
    return Math.floor((horasAcumuladas / horasObjetivo) * 100);
  };

  const handleFiltroPorcentaje = (event) => {
    setFiltroPorcentaje(event.target.value);
  };

  const handleAplicarFiltro = () => {
    if (filtroPorcentaje === "") {
      setObjetivosFiltrados(objetivos);
    } else {
      const objetivosFiltrados = objetivos.filter((objetivo) => {
        const porcentajeProgreso = calcularPorcentajeProgreso(objetivo.horasPorDia, objetivo.horasObjetivo, objetivo.fechaInicio, objetivo.diasNoDisponibles);
        return porcentajeProgreso >= parseInt(filtroPorcentaje);
      });
      setObjetivosFiltrados(objetivosFiltrados);
    }
  };

  return (
    <div>
      <h2>Lista de objetivos</h2>
      <label>Filtrar porcentaje de progreso:</label>
      <input type="number" value={filtroPorcentaje} onChange={handleFiltroPorcentaje} />
      <button onClick={handleAplicarFiltro}>Aplicar filtro</button>
      {objetivosFiltrados.length === 0 ? (
        <p>No hay objetivos que cumplan el filtro</p>
      ) : (
        <ul>
          {objetivosFiltrados.map((objetivo) => {
            const fechaFinalizacion = calcularFechaFinalizacion(objetivo.horasPorDia, objetivo.horasObjetivo, objetivo.fechaInicio, objetivo.diasNoDisponibles);
            const porcentajeProgreso = calcularPorcentajeProgreso(objetivo.horasPorDia, objetivo.horasObjetivo, objetivo.fechaInicio, objetivo.diasNoDisponibles);
            return (
              <li key={objetivo.id}>
                <Link to={`/objetivos/${objetivo.id}`}>{objetivo.nombre}</Link>
                <br></br>
                <span> Fecha inicio: {objetivo.fechaInicio}</span>
                <br></br>
                <span> Fecha finalización: {fechaFinalizacion}</span>
                <br></br>
                <span> Progreso: {porcentajeProgreso}%</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}

export default ShowObjective;
