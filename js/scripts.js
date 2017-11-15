var resultadoBusqueda;
var tipoConsulta;

busqueda = function(){
    var cedula = document.getElementById("cedula");
    var placa = document.getElementById("placa");
    var modelo = document.getElementById("modelo");
    var year = document.getElementById("year");

    if (cedula.value.length > 0) {
        console.log(cedula);
        tipoConsulta = 1;
        return cedula;
    }else if (placa.value.length  > 0) {
        console.log(placa);
        tipoConsulta = 2;
        return placa;
    }else if (modelo.value.length  > 0 && year.value.length  > 0) {
        tipoConsulta = 3;
        return modelo && year;
    }else {
        alert("Por favor, entra un valor para realizar la busqueda!")
        return null;
    }
}


peticion_req = function() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        console.log("ajax no soportado");
        return null;
    }
}

consultarDatos = function() {
    var req = peticion_req();
    var m = 'GET';
    var url="datos/autos.json";
    resultadoBusqueda = busqueda();
    if (resultadoBusqueda != null) {
    console.log(resultadoBusqueda);
        //document.getElementById('cedula');
        req.open(m, url, true);
        req.setRequestHeader('Accept', "application/json"); //tipo de aplicacion json
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                muestraContenido(req.responseText);//carga respuesta de peticion
            }
        }
        req.send(null);

    }
}

muestraContenido = function(r) {
    var idj = document.getElementById("lista");
    if (!r || r == 'null') {
        idj.innerHTML = 'sin datos';
        return;
    }else{
        var valorJson = jsonContenido(resultadoBusqueda, JSON.parse(r));//carga de obj json
        if (valorJson != null) {
            idj.innerHTML = valorJson.cedula + " | " + valorJson.nombre + " | " + valorJson.modelo + " | " + valorJson.marchamo;
        } else{
            idj.innerHTML = "No se encontro ningun registro valido para su consulta";
        }
    }

}

jsonContenido = function (valor, obj) {
    var resultadoObj = {};
    console.log(valor);
    for (i in obj) {
        if (valor.value == obj[i].cedula && tipoConsulta == 1) {
            resultadoObj = obj[i];
            console.log()
            return resultadoObj;
        }else if(valor.value == obj[i].placa && tipoConsulta == 2){
            resultadoObj = obj[i];
            console.log()
            return resultadoObj;
        }else if (valor.value == obj[i].modelo && valor.value == obj[i].year && tipoConsulta == 3) {
            resultadoObj = obj[i];
            console.log()
            return resultadoObj;
        } else {}
    }
    return null;
}