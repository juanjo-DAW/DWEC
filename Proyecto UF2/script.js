function guardarHoras(){
    var monday = document.getElementById("lunes");
    localStorage.setItem("lunes", monday.value);

    var tuesday = document.getElementById("martes");
    localStorage.setItem("martes", tuesday.value);

    var wednesday = document.getElementById("miercoles");
    localStorage.setItem("miercoles", wednesday.value);
    
    var thursday = document.getElementById("jueves");
    localStorage.setItem("jueves", thursday.value);
    
    var friday = document.getElementById("viernes");
    localStorage.setItem("viernes", friday.value);

    var saturday = document.getElementById("sabado");
    localStorage.setItem("sabado", saturday.value);

    var sunday = document.getElementById("domingo");
    localStorage.setItem("domingo", sunday.value);
    
    var total_horas_semana = parseInt(monday.value) + parseInt(tuesday.value) + parseInt(wednesday.value) + parseInt(thursday.value) + parseInt(friday.value) + parseInt(saturday.value) + parseInt(sunday.value);
    localStorage.setItem("horas_semanales",total_horas_semana);

    const tarea_nombre = document.getElementById("tarea").value;
    const totalHoras = document.getElementById("totalHoras").value;
    const semanas = totalHoras / total_horas_semana;
    
    const fechafinal = new Date();
    fechafinal.setDate(fechafinal.getDate() + (semanas * 7));
    
    const result = `La tarea "${tarea_nombre}" terminara el ${fechafinal.toDateString()}.`;
    console.log(result);
}