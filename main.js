const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        renderFraction: function (currentClass) {return '0<span class="' + currentClass + '"></span>'},
      },
  // Navigation arrows
  navigation: {
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const targetElement = document.querySelector('.amenities-list');

  if (!targetElement) {
    console.warn("Elemento con clase '.amenities-list' no encontrado.");
    return;
  }

  // Bandera para asegurar que la clase solo se añada una vez
  let hasBeenAdded = false;
  // Bandera para asegurar que la clase solo se remueva una vez
  let hasBeenRemoved = false;

  // 1. Define las opciones con dos thresholds
  // 1.0: Detección de entrada/salida COMPLETA (100%)
  // 0.0: Detección de entrada/salida PARCIAL (un píxel)
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0.0, 1.0] 
  };

  // 2. Define la función de callback
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      
      // A. Lógica para la ADICIÓN (100% visible)
      // Verifica si el 100% del elemento es visible (intersectionRatio === 1)
      if (entry.intersectionRatio === 1 && !hasBeenAdded) {
        
        entry.target.classList.add('fade-in-left');
        hasBeenAdded = true;
        hasBeenRemoved = false; // Resetear para permitir la remoción posterior
        console.log("✅ CLASE AÑADIDA 1X: 'fade-in-left'.");
        
      } 
      
      // B. Lógica para la REMOCIÓN (0% visible)
      // Verifica si el elemento ha salido completamente (intersectionRatio === 0)
      // Y que la clase ya se haya añadido, y que aún no se haya removido
      else if (entry.intersectionRatio === 0 && hasBeenAdded && !hasBeenRemoved) {
        
        entry.target.classList.remove('fade-in-left');
        hasBeenRemoved = true;
        hasBeenAdded = false; // Resetear para permitir la adición posterior
        console.log("❌ CLASE REMOVIDA 1X: 'fade-in-left'.");

        // Si solo quieres una remoción y adición en la vida de la página,
        // puedes detener la observación aquí:
        // observer.unobserve(entry.target); 
      }
    });
  };

  // 3. Crea la instancia y comienza a observar
  const observer = new IntersectionObserver(callback, options);
  observer.observe(targetElement);
});


document.addEventListener('DOMContentLoaded', function() {
  // 1. Selecciona todos los elementos con la clase .menu
  const targetElements = document.querySelectorAll('.menus');

  if (targetElements.length === 0) {
    console.warn("No se encontraron elementos con la clase '.menu'.");
    return;
  }

  // 2. Define las opciones con dos thresholds
  const options = {
    root: null, 
    rootMargin: '0px', 
    // Los umbrales que disparan el callback:
    // 0.0: Para detectar cuando sale por completo.
    // 0.2: Para detectar cuando entra el 20%.
    threshold: [0.0, 0.2] 
  };

  // 3. Define la función de callback
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      const element = entry.target;
      const elementName = element.className; // Para el log

      // A. Lógica para la ADICIÓN (Entrada al 20% o más)
      // entry.intersectionRatio es la proporción visible (0.0 a 1.0)
      if (entry.intersectionRatio >= 0.2) {
        
        // Verifica si la clase ya existe antes de añadirla para optimizar
        if (!element.classList.contains('if-visible')) {
            element.classList.add('if-visible');
            console.log(`🟢 CLASE AÑADIDA: 'if-visible' a ${elementName} (Visibilidad >= 20%).`);
        }
      
      } 
      
      // B. Lógica para la REMOCIÓN (Salida Total)
      // Verifica si la proporción visible es 0 (ha salido completamente)
      else if (entry.intersectionRatio === 0) {
        
        // Verifica si la clase existe antes de removerla
        if (element.classList.contains('if-visible')) {
            element.classList.remove('if-visible');
            console.log(`🔴 CLASE REMOVIDA: 'if-visible' de ${elementName} (Salida total 0%).`);
        }
      }
    });
  };

  // 4. Crea la instancia del observador
  const observer = new IntersectionObserver(callback, options);

  // 5. Comienza a observar CADA elemento .menu
  targetElements.forEach(element => {
    observer.observe(element);
  });
});