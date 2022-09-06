gsap.registerPlugin(ScrollTrigger, SplitText);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
  multiplier: 0.8,
  lerp: 0.065,
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed",
});

ScrollTrigger.defaults({
  markers: false,
  scroller: ".main",
});

let mm = gsap.matchMedia();
let isDesktop = "(min-width: 991px)";
let isTM = "(max-width: 991px)";
let isMobile = "(max-width: 480px)";

const mainInit = () => {
  /**
   * Loader
   */
  const loader = () => {
    // Loader In
    let loaderLayer = $(".loader");
    let tlIn = gsap.timeline({ onComplete: none });
    function none() {
      $(loaderLayer).css("display", "none");
    }
    tlIn
      .to(loaderLayer, { opacity: 0, duration: 0.6 })
      .to(loaderLayer, { display: "none" });

    // Transition Out
    let trigger = $(
      "a.nav__item,a.nav__logo,a.btn-parent,a.meet__overlay,.form__btn--dscrb a, a.burger__item, a.nav__login"
    );
    let tlOut = gsap.timeline({ paused: true });
    tlOut.to(loaderLayer, { opacity: 1, duration: 0.6 });
    $(trigger).click(function (e) {
      $(loaderLayer).css("display", "block");
      tlOut.play();
      e.preventDefault();
      var goTo = this.getAttribute("href");

      setTimeout(function () {
        window.location = goTo;
      }, 610);
    });
  };
  loader();

  /**
   * Nav Scroll
   */
  const navScroll = () => {
    let nav = $(".nav");
    let btn = $(nav).find(".nav__btn").find(".btn-parent");
    let navText = $(btn).find(".p--20");
    let bg = $(nav).find(".nav__bg");
    let divider = $(nav).find(".divider");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "50 top",
        end: "150 top",
        toggleActions: "play none none reverse",
      },
    });
    let paddingTop;
    if (window.innerWidth < 480) {
      paddingTop = "3.2em";
    } else {
      paddingTop = "0.5em";
    }

    tl.to(nav, { paddingTop: paddingTop })
      .fromTo(
        btn,
        {
          width: "15.28em",
          paddingTop: "1.16em",
          paddingLeft: "2.89em",
          paddingRight: "2.89em",
        },
        {
          paddingTop: "0",
          paddingBottom: "0",
          paddingLeft: "0",
          paddingRight: "0",
          height: "3.13em",
          width: "11.4em",
        },
        "<"
      )
      .fromTo(bg, { opacity: 0 }, { opacity: 1 }, "<")
      .to(navText, { fontSize: "0.93em" }, "<")
      .fromTo(divider, { opacity: 0 }, { opacity: 0.25 }, "<");
  };
  navScroll();

  /**
   * Link Styles
   */
  const linkItalic = () => {
    $(".is--link").each(function () {
      let split = new SplitText(this, { type: "chars, words" });
      let padding;
      if ($(this).parent().hasClass("h1--72")) {
        padding = "0.3vw";
        $(split.words).addClass("col--gradient-3");
      } else {
        padding = "0.2vw";
        $(split.words).addClass("col--gradient-2");
        if (this.closest(".overview")) {
          $(split.words).removeClass("col--gradient-2");
        }
      }
      gsap.set(split.chars, { position: "static" });
      gsap.set($(split.chars).eq(1), {
        paddingRight: padding,
        fontStyle: "italic",
      });
    });
  };
  linkItalic();

  /**
   * Btns Hover
   */
  mm.add("(min-width:991px)", () => {
    const btnHover = () => {
      $(".btn-parent, .intro__right--bot").each(function () {
        let self = $(this);
        let parent = $(self).parent();
        let arrow = $(self).find(".btn-arrow");
        let tl = gsap.timeline({
          paused: true,
          defaults: { duration: 0.1, ease: "ease" },
        });
        tl.to(self, { scale: 1.1 }).to(arrow, { rotationY: 180 }, "<");
        if ($(parent).hasClass("subscr__btn")) {
          $(parent).on("mouseenter", () => tl.restart());
          $(parent).on("mouseleave", () => tl.reverse());
        } else {
          $(self).on("mouseenter", () => tl.restart());
          $(self).on("mouseleave", () => tl.reverse());
        }
        if ($(parent).hasClass("parents__btn")) {
          $(parent).on("mouseenter", () => tl.restart());
          $(parent).on("mouseleave", () => tl.reverse());
        }
      });
    };
    btnHover();
  });
  /**
   * Nav Items Hover
   */
  mm.add("(min-width:991px)", () => {
    const linkItemHover = () => {
      $(".nav__item, a.footer__item, .nav__login").each(function () {
        let self = $(this);

        $(self).hover(() => {
          $(self).toggleClass("col--gradient-2");
        });
      });
    };
    linkItemHover();
  });

  /**
   * Text Scroll Animation
   */
  const lineAnimation = () => {
    $("[line-animation=1]").each(function () {
      let self = $(this);
      let split = new SplitText(self, { type: "lines" });
      gsap.set(split.lines, { position: "static" });
      let tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.8, ease: "power3", stagger: 0.1 },
      });
      let length = $(split.lines).length;
      if (length === 1) {
        tl.from(self, { opacity: 0 });
      } else {
        tl.from(split.lines, { opacity: 0 });
      }

      ScrollTrigger.create({
        trigger: self,
        start: "top 80%",
        onEnter: () => tl.play(),
      });
    });
  };
  lineAnimation();

  /**
   * Burger
   */
  const burger = () => {
    let burger = $(".burger");
    let items = $(burger).find(".burger__item");
    let divider = $(burger).find(".divider");
    let log = $(burger).find(".burger__login");
    let burgerBtn = $(burger).find(".burger__btn");
    let openBtn = $(".nav__burger");
    let body = $("html");
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3", stagger: 0.05 },
    });
    gsap.set(burger, { display: "none" });
    tl.to(burger, { display: "block" })
      .from(burger, { opacity: 0 }, "<")
      .from(items, { opacity: 0 })
      .from(divider, { transformOrigin: "left", scaleX: 0 }, "<")
      .from(log, { opacity: 0 }, "<10%")
      .from(burgerBtn, { opacity: 0 }, "<10%");

    $(function () {
      var burgerClicks = [
        function () {
          tl.restart();
          burger.addClass("noverflow");
          // locoScroll.stop();
        },
        function () {
          setTimeout(function () {
            counter = 0;
          }, 200);
          tl.timeScale(1.4).reverse();
          burger.removeClass("noverflow");
        },
      ];
      var counter = 0;
      $(openBtn).click(function () {
        if (counter >= 2) return false;
        burgerClicks[counter]();
        counter++;
      });
    });
  };
  burger();

  /**
   * LightBox Animation
   */
  const lightbox = () => {
    let lightbox = $(".lightbox");
    let triggerOpen = $("[lightbox='trigger']");
    let triggerClose = lightbox.find(".lightbox__close");
    let triggerOverlay = lightbox.find(".lightbox__overlay");
    gsap.set(lightbox, { display: "none" });
    let tl = gsap.timeline({ paused: true });
    tl.to(lightbox, { display: "flex", duration: 0 }).from(
      lightbox,
      { opacity: 0, duration: 0.2 },
      "<"
    );

    triggerOpen.click(() => tl.restart());
    triggerClose.click(() => tl.reverse());
    triggerOverlay.click(() => tl.reverse());

    let backgroundVid = lightbox.find(".video-bg");

    backgroundVid.on("click", function () {
      let myVideo = $(this).find("video");
      $(this).toggleClass("playing");
      if ($(this).hasClass("playing")) {
        myVideo.prop("muted", false);
        myVideo.prop("currentTime", 0);
      } else {
        myVideo.prop("muted", true);
      }
    });
  };
  lightbox();

  /**
   * Query Styles
   */
  mm.add(isMobile, () => {
    $(".footer__item").find(".h6--24").removeClass("col--gradient-2");
    $(".footer__item--title").find(".p--20").addClass("col--gradient-2");
  });
};

window.addEventListener("load", function () {
  gsap.set(["main", "header"], { autoAlpha: 1 });
  gsap.set(
    [
      ".video__body",
      ".meet__cms-item",
      ".feature__number",
      ".videos__cms-item",
      ".tags__mentor--cms-item",
    ],
    { rotation: 0 }
  );
  gsap.set([".testimonial__body", ".meet__cms-item"], {
    z: "-1px",
    perspective: 200,
    transformOrigin: "50% 50% 1",
  });
  mainInit();
  setTimeout(function () {
    locoScroll.update();
  }, 1000);
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

$(window).resize(function (e) {
  locoScroll.update();
});

let activeLink = $("[aria-current='page']");

function removeLink() {
  let classes = $(activeLink).attr("class");

  $(activeLink).replaceWith(function () {
    return $("<div class='new'>" + $(this).html() + "</div>");
  });
  $(".new").addClass(classes);
}

setTimeout(() => {
  let elem = $(".new");
  $(elem).each(function () {
    let self = $(this);
    let parent = $(self).parent();
    if ($(parent).hasClass("nav__btn")) {
      $(self).addClass("btn-parent");
    }
  });
}, 100);

mm.add(isDesktop, () => {
  removeLink();
});

$(".new").on("click", function () {
  let slider = document.querySelectorAll("section")[0];
  locoScroll.scrollTo(slider);
});

// On Back Button Tap
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};
// Hide Transition on Window Width Resize
setTimeout(() => {
  $(window).on("resize", function () {
    setTimeout(() => {
      $(".transition").css("display", "none");
    }, 50);
  });
}, 50);
