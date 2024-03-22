import 'swiper/css';

import gsap from 'gsap';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

import createLenis from '$utils/createLenis';

function animateTabs() {
  const tabButtons = document.querySelectorAll('[data-element="tab-button"]');
  console.log(tabButtons);
  const tabContents = document.querySelectorAll('[data-element="tab-content"]');
  const dividers = document.querySelectorAll('[data-element="divider"]');

  let activeButtonIndex = null;

  tabButtons.forEach((tabButton) => {
    const tabButtonFill = tabButton.querySelector('[data-element="tab-fill"]');
    tabButton.addEventListener('mouseenter', (event) => {
      tabButtonFill.classList.add('is-active');
      tabButton.classList.add('is-active');
    });
    tabButton.addEventListener('mouseleave', (event) => {
      // Only remove the is-active class if this is not the active button
      if (tabButton.getAttribute('data-index') !== activeButtonIndex) {
        tabButtonFill.classList.remove('is-active');
        tabButton.classList.remove('is-active');
      }
    });

    tabButton.addEventListener('click', (event) => {
      // Remove is-active class from all buttons and fills except the clicked one
      tabButtons.forEach((otherTabButton) => {
        if (otherTabButton !== tabButton) {
          otherTabButton.classList.remove('is-active');
          const otherTabButtonFill = otherTabButton.querySelector('[data-element="tab-fill"]');
          otherTabButtonFill.classList.remove('is-active');
        }
      });
      // Update the active button index

      activeButtonIndex = tabButton.getAttribute('data-index');
      // Ensure the clicked button and its fill are set as active
      tabButton.classList.add('is-active');
      tabButtonFill.classList.add('is-active');

      const tabButtonIndex = tabButton.getAttribute('data-index');
      tabContents.forEach((tabContent) => {
        const tabContentIndex = tabContent.getAttribute('data-index');
        if (tabButtonIndex === tabContentIndex) {
          tabButtonFill.classList.add('is-active');
          gsap.set(tabContent, {
            autoAlpha: 0,
            delay: 0.35,
            onComplete: () => {
              tabContent.classList.add('is-active');
            },
          });

          gsap.to(dividers[0], { duration: 0.35, autoAlpha: 1, delay: 0.25 });
          gsap.to(tabContent, { duration: 0.35, autoAlpha: 1, delay: 0.35 });
          gsap.to(dividers[1], { duration: 0.35, autoAlpha: 1, delay: 0.45 });
        } else {
          gsap.to(dividers, { duration: 0.25, autoAlpha: 0 });
          gsap.to(tabContent, {
            duration: 0.35,
            autoAlpha: 0,
            onComplete: () => {
              tabContent.classList.remove('is-active');
            },
          });
        }
      });
    });
  });
}

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
  animateTabs();
  createExpertsSlider();
  createLenis();
});
