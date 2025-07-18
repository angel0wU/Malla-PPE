""document.addEventListener('DOMContentLoaded', () => {
  const cursos = document.querySelectorAll('.curso');
  const cumplidos = new Set();

  // Verifica si los prerrequisitos están cumplidos
  function verificarPrerrequisitos() {
    cursos.forEach(curso => {
      const prereqs = curso.getAttribute('data-prerequisitos');
      if (prereqs) {
        const prereqList = prereqs.split(',').map(p => p.trim());
        const habilitado = prereqList.every(p => cumplidos.has(p));
        curso.classList.toggle('bloqueado', !habilitado);
        curso.querySelector('input, select')?.disabled = !habilitado;
      }
    });
  }

  // Marca los cursos seleccionados como cumplidos
  cursos.forEach(curso => {
    const input = curso.querySelector('input, select');
    if (input) {
      input.addEventListener('change', () => {
        if (input.type === 'checkbox' && input.checked) {
          cumplidos.add(curso.getAttribute('data-id'));
        } else if (input.tagName === 'SELECT' && input.value !== '') {
          cumplidos.add(input.value);
        }
        verificarPrerrequisitos();
      });
    }
  });

  verificarPrerrequisitos();
});

 
