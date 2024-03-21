import 'swiper/css';

import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

import createLenis from '$utils/createLenis';

function createExpertsSlider() {
  return new Swiper('.swiper', {
    modules: [Navigation, Autoplay],
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 16,
    slideToClickedSlide: true,
    keyboard: true,
    // centeredSlides: true,
    // loop: true,
    grabCursor: true,
    allowTouchMove: true,
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    },
    speed: 500,
    breakpoints: {
      0: {
        /* when window >=0px - webflow mobile landscape/portriat */
        slidesPerView: 1.5,
        slidesPerGroup: 1,
      },
      480: {
        /* when window >=0px - webflow mobile landscape/portriat */
        slidesPerView: 2,
        slidesPerGroup: 1,
      },
      767: {
        /* when window >= 767px - webflow tablet */
        slidesPerView: 3.5,
        slidesPerGroup: 1,
      },
      992: {
        /* when window >= 988px - webflow desktop */
        slidesPerView: 4.5,
        slidesPerGroup: 1,
      },
    },
  });
}

window.addEventListener('DOMContentLoaded', () => {
  createExpertsSlider();
  createLenis();
});
