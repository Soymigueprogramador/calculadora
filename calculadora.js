//aca conecte la pantalla y los botones.
const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
//aca intento que se guarden los resultados en el local storage. 
let resultados = JSON.parse(localStorage.getItem("resultados")) || [];
//aca arrancamos con los eventos de los botones y con la calculadora. 
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;
        //un condicional en la que si el sistema detecta "c" borra todo y muestra un "0". 
        if (boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }
        //si el sistema detecta una operacion erronea va a mostrar un "invalido",
        //"ejemplo: 2 / 2 = invalido". 
        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }
        //despues de cada operacion apretamos el boton de igual y nos da el resultado. 
        if (boton.id === "igual") {
            try {
                const resultado = eval(pantalla.textContent);
                pantalla.textContent = resultado;
                resultados.push(resultado);
                localStorage.setItem("resultados", JSON.stringify(resultados));
            } catch {
                pantalla.textContent = "Error!";
            }
            return;
        }
        
        if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
    })
});