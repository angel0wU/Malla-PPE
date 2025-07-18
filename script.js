document.addEventListener('DOMContentLoaded', () => {
  const cursos = document.querySelectorAll('.curso');
  const cumplidos = new Set();

  function verificarPrerrequisitos() {
    cursos.forEach(curso => {
      const prereqs = curso.getAttribute('data-prerequisitos');
      if (prereqs) {
        const ids = prereqs.split(',').map(p => p.trim());
        const habilitado = ids.every(id => cumplidos.has(id));
        curso.classList.toggle('bloqueado', !habilitado);
      }
    });
  }

  cursos.forEach(curso => {
    curso.addEventListener('click', () => {
      const id = curso.getAttribute('data-id');
      if (!curso.classList.contains('bloqueado')) {
        curso.classList.add('bloqueado');
        cumplidos.add(id);
        verificarPrerrequisitos();
      }
    });
  });

  verificarPrerrequisitos();
});
