document.addEventListener("DOMContentLoaded", () => {
  const selectedOptions = new Set();

  function updatePrerequisites() {
    document.querySelectorAll('[data-id]').forEach(course => {
      const prereqs = course.dataset.prereq?.split(" ") || [];
      const isUnlocked = prereqs.every(id => selectedOptions.has(id));
      course.classList.toggle("disabled", !isUnlocked);
    });
  }

  function setupSelectableCourses() {
    document.querySelectorAll(".grupo").forEach(group => {
      const radios = group.querySelectorAll("li");
      radios.forEach(option => {
        option.style.cursor = "pointer";
        option.addEventListener("click", () => {
          if (option.classList.contains("disabled")) return;

          const selectedId = option.dataset.id;

          // Desmarcar todos en el grupo
          radios.forEach(o => o.classList.remove("selected"));
          option.classList.add("selected");

          // Registrar selección
          [...radios].forEach(o => selectedOptions.delete(o.dataset.id));
          selectedOptions.add(selectedId);

          // Desactivar esta opción en otros grupos del mismo tipo
          const groupName = group.dataset.group;
          document.querySelectorAll(`.grupo[data-group='${groupName}']`).forEach(gr => {
            gr.querySelectorAll("li").forEach(o => {
              if (o.dataset.id === selectedId && !o.classList.contains("selected")) {
                o.classList.add("disabled");
              } else {
                o.classList.remove("disabled");
              }
            });
          });

          updatePrerequisites();
        });
      });
    });
  }

  function setupNormalCourses() {
    document.querySelectorAll(".ciclo > ul > li[data-id]").forEach(course => {
      course.addEventListener("click", () => {
        if (course.classList.contains("disabled")) return;
        course.classList.toggle("selected");
        const id = course.dataset.id;
        if (selectedOptions.has(id)) {
          selectedOptions.delete(id);
        } else {
          selectedOptions.add(id);
        }
        updatePrerequisites();
      });
    });
  }

  setupNormalCourses();
  setupSelectableCourses();
  updatePrerequisites();
});
