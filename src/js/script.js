'use strict';

const nav = document.querySelector('.nav');

// Menu fade animation
const navFade = function () {
  const menuFade = function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');

      siblings.forEach((el) => {
        if (el !== link) el.style.opacity = this;
      });
    }
  };

  nav.addEventListener('mouseover', menuFade.bind(0.5));
  nav.addEventListener('mouseout', menuFade.bind(1));
};

navFade();

// Stickty navigation  Starts

const navSticky = function () {
  const header = document.querySelector('.header');
  const stickyNav = function (entries) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  };

  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.2,
    //   rootMargin: '-120px' (navHeight),
  });

  headerObserver.observe(header);
};

navSticky();

// Sticky navigation Ends

// Reveal on scroll starts
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Reveal on scroll ends

// Smooth scrolling starts
const smoothScrolling = function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
};

document.querySelector('.nav__list').addEventListener('click', smoothScrolling);

// Smooth scrolling ends

// Slider starts

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach((dot) => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      // -100% 0% 100% 200%
    });
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots(0);
    activateDot(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    // Short circuiting
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // e.target.classList.add('.dots__dot--active');
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(currentSlide);
    }
  });
};

slider();

// Slider ends
