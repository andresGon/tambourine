// Starter JavaScript for Tambourine
document.addEventListener('DOMContentLoaded', () => {
  const heading = document.querySelector('main h1');
  if (!heading) return;

  // Toggle a highlight class when the heading is clicked
  heading.addEventListener('click', () => {
    heading.classList.toggle('highlight');
  });

  // Expose a small helper for debugging in the console
  window.tambourine = {
    toggleHeading() { heading.classList.toggle('highlight'); }
  };
});
