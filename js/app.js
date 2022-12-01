// ======================  Valores Globales =======================


let contadorAcertados = 0;
let nivel;

//Valor a sumar
let valuePack = random(1, 10) * 10;

let juego1 = [
  [
    [4, 8, 12, 16],
    [3, 6, 7, 11],    
    [1, 2, 5, 9],
    [10, 13, 14, 15],
  ],
  [
    [7, 8, 11, 12],
    [2, 3, 4, 6],        
    [1, 5, 9, 13],
    [10, 14, 15, 16],
  ],
  [
    [4, 8, 12, 16],
    [1, 2, 3, 6],
    [5, 9, 10, 13],
    [7, 11, 14, 15],
  ],
];

let juego2 = [
  [1, 2, 7, 8],
  [3, 9, 14, 15],
  [4, 5, 6, 10],
  [11, 12, 18, 24],
  [13, 19, 20, 25],
  [29, 30, 35, 36],
  [21, 27, 28, 34],
  [26, 31, 32, 33],  
  [16, 17, 22, 23],
];

let juego3 = [
  [1, 9, 10, 18],
  [2, 3, 4, 12],
  [5, 6, 7, 13],
  [8, 14, 15, 16],
  [11, 19, 20, 27],
  [17, 25, 26, 33],  
  [23, 24, 31, 32],
  [21, 22, 28, 29],
  [40, 48, 56, 64],
  [44, 45, 46, 52],
  [35, 36, 37, 43],
  [30, 38, 39, 47],
  [34, 41, 42, 49],
  [50, 51, 57, 58],
  [53, 59, 60, 61],
  [54, 55, 62, 63],
];

let userSelect = [];

// ======================  Valores Globales =======================


window.onload = () => {
  panelInicio();
};

// ====================== Pantalla de inicio ===================
function panelInicio() {
  let div = document.createElement("div");

  let h1 = document.createElement("h1");
  h1.innerText = "Sumatorio EL JUEGO!";

  let h4 = document.createElement("h4");

  h4.innerText =
    "Deberas completar el panel uniendo 4 valores que formen el número a sumar. Buena suerte! LA NECESITARÁS";

  div.appendChild(h1);
  div.appendChild(h4);

  // BOTON FACIL
  let btn1 = document.createElement("input");
  btn1.setAttribute("type", "button");
  btn1.setAttribute("value", "Facil");
  btn1.setAttribute("id", "btn1");
  btn1.addEventListener("click", () => {
    nivel = juego1[ random(0, juego1.length) ];
    generarTablero(4, 4);
  });
  div.appendChild(btn1);

  // BOTON MEDIO
  let btn2 = document.createElement("input");
  btn2.setAttribute("type", "button");
  btn2.setAttribute("value", "Medio");
  btn2.setAttribute("id", "btn2");
  btn2.addEventListener("click", () => {
    nivel = juego2;
    generarTablero(6, 6);
  });
  div.appendChild(btn2);

  // BOTON DIFICIL
  let btn3 = document.createElement("input");
  btn3.setAttribute("type", "button");
  btn3.setAttribute("value", "Dificil");
  btn3.setAttribute("id", "btn3");
  btn3.addEventListener("click", () => {
    nivel = juego3;
    generarTablero(8, 8);
  });
  div.appendChild(btn3);

  document.body.appendChild(div);
}

// ======================  Area de juego =======================


// Genera el tablero acorde al juego seleccionado
function generarTablero(alto, ancho) {
  document.body.innerHTML = "";

  let h1 = document.createElement("h1");
  h1.innerText = "Sumatorio de " + valuePack;

  let table = document.createElement("table");
  let tbody = document.createElement("tbody");
  let num = 1;
  table.appendChild(tbody);
  for (let i = 0; i < alto; i++) {
    let tr = document.createElement("tr");

    for (let j = 0; j < ancho; j++) {
      let td = document.createElement("td");
      td.setAttribute("id", num);
      td.style.textAlign = "center";
      tr.appendChild(td);
      num++;
    }

    tbody.appendChild(tr);
  }

  document.body.appendChild(h1);
  document.body.appendChild(table);
  table.addEventListener("click", seleccion);

  mostrarJuego(alto);
  let input1 = document.createElement("input");
  input1.setAttribute("value", "Rendirse");
  input1.setAttribute("type", "button");
  document.body.appendChild(input1);
  input1.addEventListener("click", resolverJuego);

}

// Muestra los valores en los casilleros
function mostrarJuego() {
  let tds = document.querySelectorAll("td");

  nivel.forEach((pieza) => {
    let i = 0;

    let valores = valoresPiezas();

    pieza.forEach((c) => {
      tds.forEach((td) => {
        // console.log(td.id);
        // console.log(pieza[i]);
        if (td.id == c) {
          td.innerText = valores[i];
          i++;
        }
      });
    });
  });
}

//Genera los valores de las piezas (4 casilleros) de modo que la suma de los 4 sea igual al numero que hay que sumar
function valoresPiezas() {
  let valores = [];
  let v1, v2, v3, v4;
  while (v1 + v2 + v3 + v4 != valuePack) {
    v1 = random(1, valuePack);
    v2 = random(1, valuePack);
    v3 = random(1, valuePack);
    v4 = random(1, valuePack);
  }
  valores.push(v1);
  valores.push(v2);
  valores.push(v3);
  valores.push(v4);

  return valores;
}

// ======================  Logica de juego =======================


// Funcion que al seleccionar un casillero ejecuta la funcionalidad de juego y verifica 
// al seleccionar 4 casilleros si es correcta la pieza con el array del juego seleccionado
function seleccion(e) {

  if (e.target.id != null) {
    if (userSelect.length < 4) {
      e.target.style.border = "3px solid black";
      userSelect.push(e.target.id);
    }

    if (userSelect.length == 4) {
      let color = colorRandom();
      let borderar = false;
      userSelect.sort((a, b) => a - b);

      nivel.forEach((pieza, i) => {

        let par = (i % 2 == 0);

        if (userSelect.join(",") === pieza.join(",")) {
          pieza.forEach((c) => {
            let td = document.getElementById(c);
            td.addEventListener("click", (e) => {
              e.stopPropagation();
            });
            td.style.border = "0px";            
            td.style.fontSize = "150%"
            td.style.fontWeight = "bold";
            td.style.backgroundColor = color;
            if(par) {
              td.style.border = "2px solid black"
            }
          });

          contadorAcertados++;
        }
      });

      userSelect.forEach((c) => {
        let td = document.getElementById(c);
        td.style.border = "1px solid black";
      });
      userSelect = [];
    }
  }

  if (contadorAcertados === nivel.length) {
    let table = document.querySelector("table");
    table.removeEventListener("click", seleccion);
    modal("Ganaste");
  }
}

// Funcion que resuelve el juego y pinta las piezas
function resolverJuego(e) {

  nivel.forEach(( pieza, i) => {
    let color = colorRandom();
    let par = (i % 2 == 0);
    pieza.forEach((c) => {
      let td = document.getElementById(c);
      td.style.backgroundColor = color;
      td.style.border = "0px";
      td.style.fontSize = "150%"
      if(par) {
        td.style.border = "2px solid black"
      }
    });
  });
  let table = document.querySelector("table");
  table.removeEventListener("click", seleccion);
  e.target.setAttribute("disabled", "true");

  setTimeout(() => {
    modal("Perdiste");
  }, 3000);
}

// ======================  Area de Mensaje =======================


// Panel modal que visualiza el resultado del juego si se rinde o si gana
function modal(resultado) {
  let divmodal = document.createElement("div");
  let h1modal = document.createElement("h1");
  h1modal.innerHTML = resultado;
  h1modal.style.fontSize = "8rem";

  let input2 = document.createElement("input");
  input2.setAttribute("value", "Menú principal");
  input2.setAttribute("type", "button");
  input2.setAttribute("id", "menu");
  input2.addEventListener("click", () => {
    window.location.reload();
  });
  divmodal.setAttribute("id", "modal");

  divmodal.appendChild(h1modal);
  divmodal.appendChild(input2);
  document.body.appendChild(divmodal);
}

// ======================  Funciones Random number y color =======================


function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Devuelve un color de un array de colores
function colorRandom() {
  let colores = [
    "5BA8A0",
    "CBE54E",
    "94B447",
    "5D6E1E",
    "329D9C",
    "56C596",
    "235D3A",
    "397D54",
    "F9E07F",
    "00adb8",
    "ff6700",
    "ff9248",
    "ffb38a",
    "efa818",
    "f7aa40",
    "669a9c",
    "648b4a",
  ];
  return "#" + colores[random(0, colores.length)];
}
