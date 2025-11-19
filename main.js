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