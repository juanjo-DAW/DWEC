function guardarHoras(){
    var monday = document.getElementById("lunes");
    localStorage.setItem("lunes", monday);

    var tuesday = document.getElementById("martes");
    localStorage.setItem("martes", tuesday);

    var wednesday = document.getElementById("miercoles");
    localStorage.setItem("miercoles", wednesday);
    
    var thursday = document.getElementById("jueves");
    localStorage.setItem("jueves", thursday);
    
    var friday = document.getElementById("viernes");
    localStorage.setItem("viernes", friday);

    var saturday = document.getElementById("sabado");
    localStorage.setItem("sabado", saturday);

    var sunday = document.getElementById("domingo");
    localStorage.setItem("domingo", sunday);

}

function fechaActual(){
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    console.log(hoy.toLocaleDateString());
}

function horasTotalSemana(){
    
}

