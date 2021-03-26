// Sticky header and smooth

$(function () {
  $('.header').each(function () {
    const $header = $('.header');
    const $window = $(window);
    const height = $('.header').height();

    headerOffSetTop = $header.offset().top;

    $('body').css('padding-top', -height);

    $('a[href^="#"]').click(function () {
      const href = $(this).attr('href');
      const target = $(href == '#' || href == '' ? 'html' : href);
      const position = target.offset().top - height;
      $('html, body').animate({ scrollTop: position }, 200, 'swing');
      return false;
    });

    $window.on('scroll', function () {
      if ($window.scrollTop() > headerOffSetTop) {
        $header.addClass('sticky');
      } else {
        $header.removeClass('sticky');
      }
    });
    $window.trigger('scroll');
  });
});

// Menu trigger

$(function () {
  const $toggleBtn = $('.js-hamburger-btn');
  const $nav = $('.js-nav-menu');
  const open = 'is-open';
  const active = 'active';

  $toggleBtn.on('click', function () {
    $(this).toggleClass(active);
    if (!$nav.hasClass(open)) {
      $nav.addClass(open);
    } else {
      $nav.removeClass(open);
    }
    $('a[href^="#"]').click(function () {
      if ($nav.hasClass(open)) {
        $nav.removeClass(open);
        $toggleBtn.removeClass(active);
      }
    });
  });
  $($nav).on('click', function () {
    $toggleBtn.trigger('click');
  });
});

// Swiper

$(function () {
  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true,
      stopOnLastSlide: true,
    },
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 30,
      slideShadows: false,
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
});

$(function () {
  $(window).scroll(function () {
    const wHeight = $(window).height();
    const scrollAmount = $(window).scrollTop();
    $('.scrollanime').each(function () {
      const targetPosition = $(this).offset().top;
      if (scrollAmount > targetPosition - wHeight + 60) {
        $(this).addClass('fadeInDown');
      }
    });
  });
});
