// === CURSOS Y PRERREQUISITOS ===
const cursos = [
  { id: "nivel-lengua", nombre: "Nivelación en Lenguaje", ciclo: 0, tipo: "generales" },
  { id: "nivel-mate", nombre: "Nivelación en Matemáticas", ciclo: 0, tipo: "generales" },
  { id: "nivel-info", nombre: "Nivelación en Informática", ciclo: 0, tipo: "generales" },

  { id: "mate1", nombre: "Matemáticas I", ciclo: 1, tipo: "carrera", requisitos: ["nivel-mate"] },
  { id: "eco1", nombre: "Economía General I", ciclo: 1, tipo: "carrera", requisitos: ["nivel-mate"] },
  { id: "conta", nombre: "Fundamentos de Contabilidad", ciclo: 1, tipo: "carrera" },
  { id: "lengua1", nombre: "Lenguaje I", ciclo: 1, tipo: "generales", requisitos: ["nivel-lengua"] },
  { id: "intro-pfe", nombre: "Intro a Política, Filosofía y Economía", ciclo: 1, tipo: "carrera" },

  { id: "poder", nombre: "Poder e Instituciones", ciclo: 2, tipo: "carrera" },
  { id: "antro-filo", nombre: "Antropología Filosófica", ciclo: 2, tipo: "carrera" },
  { id: "lengua2", nombre: "Lenguaje II", ciclo: 2, tipo: "generales", requisitos: ["lengua1"] },
  { id: "pensamiento1", nombre: "Curso 1 de Pensamiento Crítico", ciclo: 2, tipo: "sello", opciones: ["filosofia", "teologia", "social"] },
  { id: "cienciassociales1", nombre: "Curso 1 de Ciencias Sociales", ciclo: 2, tipo: "sello", opciones: ["sociologia", "psicologia", "antropologia"] },

  { id: "mate2", nombre: "Matemáticas II", ciclo: 3, tipo: "carrera", requisitos: ["mate1"] },
  { id: "eco2", nombre: "Economía General II", ciclo: 3, tipo: "carrera", requisitos: ["eco1"] },
  { id: "polcomp", nombre: "Política Comparada", ciclo: 3, tipo: "carrera", requisitos: ["poder"] },
  { id: "invest", nombre: "Investigación Académica", ciclo: 3, tipo: "carrera" },
  { id: "procsoc1", nombre: "Curso 1 de Procesos Sociales", ciclo: 3, tipo: "sello", requisitos: ["lengua2"], opciones: ["cienciapol", "histeco", "histcrit"] }

  // 🔜 Puedes seguir agregando más cursos hasta ciclo 10 aquí
];

// === ESTADO ===
let estado = JSON.parse(localStorage.getItem("estadoCursos")) || {};
let seleccionUnica = JSON.parse(localStorage.getItem("seleccionUnica")) || {};

function guardarEstado() {
  localStorage.setItem("estadoCursos", JSON.stringify(estado));
  localStorage.setItem("seleccionUnica", JSON.stringify(seleccionUnica));
}

function estaDesbloqueado(curso) {
  if (!curso.requisitos) return true;
  return curso.requisitos.every(r => estado[r]);
}

function crearMalla() {
  document.querySelectorAll(".grid-container").forEach(div => div.innerHTML = "");

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.className = "curso";
    if (curso.opciones) div.classList.add("opcional");
    div.id = curso.id;
    div.innerText = curso.nombre;

    if (estado[curso.id]) div.classList.add("aprobado", "desbloqueado");
    else if (estaDesbloqueado(curso)) div.classList.add("desbloqueado");

    div.addEventListener("click", () => {
      if (!estaDesbloqueado(curso)) return;

      if (curso.opciones) mostrarOpciones(curso);
      else {
        estado[curso.id] = !estado[curso.id];
        guardarEstado();
        crearMalla();
      }
    });

    document.getElementById(`${curso.tipo}-ciclo-${curso.ciclo}`).appendChild(div);
  });
}

function mostrarOpciones(curso) {
  const modal = document.getElementById("selector-modal");
  const opcionesDiv = document.getElementById("selector-opciones");
  opcionesDiv.innerHTML = "";

  curso.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.innerText = capitalizar(opcion);
    const yaUsada = Object.values(seleccionUnica).includes(opcion);
    if (yaUsada && seleccionUnica[curso.id] !== opcion) btn.classList.add("disabled");

    btn.onclick = () => {
      if (btn.classList.contains("disabled")) return;
      estado[curso.id] = true;
      seleccionUnica[curso.id] = opcion;
      guardarEstado();
      modal.classList.add("hidden");
      crearMalla();
    };

    opcionesDiv.appendChild(btn);
  });

  document.getElementById("cerrar-modal").onclick = () => modal.classList.add("hidden");
  modal.classList.remove("hidden");
}

function capitalizar(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1).replace("_", " ");
}

crearMalla();

