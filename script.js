document.addEventListener('DOMContentLoaded', () => {
  const cursos = document.querySelectorAll('.curso');
  const cumplidos = new Set();

  // Verifica si los prerrequisitos están cumplidos
  function verificarPrerrequisitos() {
    cursos.forEach(curso => {
      const prereqs = curso.getAttribute('data-prerequisitos');
      const input = curso.querySelector('input');

      if (prereqs) {
        const prereqList = prereqs.split(',').map(p => p.trim());
        const habilitado = prereqList.every(p => cumplidos.has(p));

        curso.classList.toggle('bloqueado', !habilitado);
        if (input) input.disabled = !habilitado;

        // Si el curso se vuelve bloqueado, eliminarlo de cumplidos
        if (!habilitado && input && input.checked) {
          input.checked = false;
          cumplidos.delete(curso.getAttribute('data-id'));
          curso.style.textDecoration = 'none';
        }
      }
    });
  }

  // Marca cursos seleccionados como cumplidos y actualiza visualmente
  cursos.forEach(curso => {
    const input = curso.querySelector('input');
    if (input) {
      input.addEventListener('change', () => {
        const id = curso.getAttribute('data-id');

        if (input.checked) {
          cumplidos.add(id);
          curso.style.textDecoration = 'line-through';
        } else {
          cumplidos.delete(id);
          curso.style.textDecoration = 'none';
        }

        verificarPrerrequisitos();
      });
    }
  });

  verificarPrerrequisitos(); // Inicial
});

