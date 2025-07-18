document.addEventListener("DOMContentLoaded", function () {
  const allCourses = document.querySelectorAll(".course");
  const takenCourses = new Set();

  // Manejar checkboxes
  document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        takenCourses.add(checkbox.id);
      } else {
        takenCourses.delete(checkbox.id);
      }
      updateCourseStates();
    });
  });

  // Manejar selects únicos (por ejemplo, Filosofía vs Teología)
  document.querySelectorAll("select[data-group]").forEach((select) => {
    select.addEventListener("change", () => {
      // Marcar lo elegido como tomado
      takenCourses.add(select.value);
      updateCourseStates();
    });
  });

  function updateCourseStates() {
    allCourses.forEach((course) => {
      const prereq = course.dataset.prereq;
      if (prereq) {
        const required = prereq.split(",");
        const fulfilled = required.every((r) => takenCourses.has(r.trim()));
        course.classList.toggle("disabled", !fulfilled);
        course.querySelectorAll("input, select").forEach((el) => {
          el.disabled = !fulfilled;
        });
      }
    });

    // Manejo de selección única
    const grouped = document.querySelectorAll("select[data-group]");
    const used = new Set();
    grouped.forEach((select) => {
      used.add(select.value);
    });
    grouped.forEach((select) => {
      const group = select.dataset.group;
      const current = select.value;
      Array.from(select.options).forEach((opt) => {
        opt.disabled = opt.value !== current && used.has(opt.value);
      });
    });
  }

  updateCourseStates(); // Ejecutar al cargar
});
document.addEventListener("DOMContentLoaded", function () {
  const allCourses = document.querySelectorAll(".course");
  const takenCourses = new Set();

  // Manejar checkboxes
  document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        takenCourses.add(checkbox.id);
      } else {
        takenCourses.delete(checkbox.id);
      }
      updateCourseStates();
    });
  });

  // Manejar selects únicos (por ejemplo, Filosofía vs Teología)
  document.querySelectorAll("select[data-group]").forEach((select) => {
    select.addEventListener("change", () => {
      // Marcar lo elegido como tomado
      takenCourses.add(select.value);
      updateCourseStates();
    });
  });

  function updateCourseStates() {
    allCourses.forEach((course) => {
      const prereq = course.dataset.prereq;
      if (prereq) {
        const required = prereq.split(",");
        const fulfilled = required.every((r) => takenCourses.has(r.trim()));
        course.classList.toggle("disabled", !fulfilled);
        course.querySelectorAll("input, select").forEach((el) => {
          el.disabled = !fulfilled;
        });
      }
    });

    // Manejo de selección única
    const grouped = document.querySelectorAll("select[data-group]");
    const used = new Set();
    grouped.forEach((select) => {
      used.add(select.value);
    });
    grouped.forEach((select) => {
      const group = select.dataset.group;
      const current = select.value;
      Array.from(select.options).forEach((opt) => {
        opt.disabled = opt.value !== current && used.has(opt.value);
      });
    });
  }

  updateCourseStates(); // Ejecutar al cargar
});
