const homeInit = () => {
  /**
   * Home Loader
   */
  const homeLoader = () => {
    let hero = $(".hero");
    let nav = $(".nav");
    let right = $(".hero__right");
    let imgs = $(".hero__img--item");
    let title = $(".hero__title").find(".h1--72");
    let btn = $(".hero__btn");
    let bgItem = $(".bg--item.is--1");
    let split = new SplitText(title, { type: "lines" });
    let tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3", stagger: 0.2 },
    });
    tl.from(split.lines, { y: 20, opacity: 0 })
      .from(imgs, { opacity: 0 }, "<")
      .from(right, { opacity: 0 }, "<0.2")
      .from(nav, { opacity: 0 }, "<0.2")
      .from(btn, { opacity: 0 }, "<0.2")
      .from(bgItem, { opacity: 0 }, "<0.2");
  };
  homeLoader();

  /**
   * Mentor Scroll
   */
  const mentorScroll = () => {
    // Phone Scroll Animation
    let trigger = $(".mentor__body");
    let phone = $(".mentor__phone");
    let items = $(".mentor__phone--item");

    mm.add(isDesktop, () => {
      let tlPhone = gsap.timeline({
        scrollTrigger: { trigger: trigger, start: "top 80%" },
      });
      tlPhone.from(items, { y: 50, opacity: 0, duration: 1, stagger: 0.4 });
    });

    mm.add(isTM, () => {
      let tlPhone = gsap.timeline({
        scrollTrigger: { trigger: phone, start: "top 80%" },
      });
      tlPhone.from(items, { y: 50, opacity: 0, duration: 1, stagger: 0.4 });
    });

    // Line Scroll Animation
    $(".mentor__progress--line").each(function () {
      let self = $(this);
      let tlText = gsap.timeline({
        scrollTrigger: { trigger: self, start: "top 80%" },
      });
      tlText.from(self, { transformOrigin: "top", scaleY: 0 });
    });
  };
  mentorScroll();

  /**
   * Stats Fade In
   */
  const statsNumbers = () => {
    $(".stats__item").each(function () {
      let self = $(this);
      let number = $(self).find(".stats__number").find(".h3--48").eq(0);
      let text;
      let tl = gsap.timeline({ paused: true });
      number.each(function () {
        text = $(this).text();
        tl.fromTo(
          number,
          { innerText: 0 },
          {
            ease: "power3",
            duration: 1.5,
            snap: { innerText: 1 },
            innerText: text,
          }
        );
      });

      ScrollTrigger.create({
        trigger: self,
        start: "top 90%",
        onEnter: () => tl.play(),
      });
    });
  };
  statsNumbers();

  /**
   * Stats line Animation
   */
  const statsScroll = () => {
    let parent = $(".stats__body");
    let line = $(parent).find(".stats__line");
    let tl = gsap.timeline({
      scrollTrigger: { trigger: line, start: "center bottom" },
    });

    let clip;
    mm.add("(min-width: 480px)", () => {
      clip = "inset(0 100% 0 0)";
    });
    mm.add(isMobile, () => {
      clip = "inset(0 0 100% 0)";
    });

    tl.from(line, { clipPath: clip, duration: 1.5 });
  };
  statsScroll();

  /**
   * Stats Hover Animation
   */
  const statsHover = () => {
    mm.add(isDesktop, () => {
      $(".stats__item").each(function () {
        let self = $(this);
        let number = $(self).find(".stats__number");
        let tl = gsap.timeline({
          paused: true,
          defaults: { duration: 0.2, ease: "power3" },
        });
        tl.to(number, { scale: 1.3, transformOrigin: "bottom left" });

        $(self).on("mouseenter", () => tl.restart());
        $(self).on("mouseleave", () => tl.reverse());
      });
    });
  };
  statsHover();

  /**
   * Mentor Hover Animation
   */
  const mentorHover = () => {
    mm.add(isDesktop, () => {
      $(".meet__cms-item").each(function () {
        let self = $(this);
        let descr = $(self).find(".meet__descr").find(".p--20");
        let content = $(self).find(".meet__content");
        let split = new SplitText(descr, { type: "lines" });
        let btn = $(self).find(".meet__content--btn");
        $(split.lines).css("display", "none");
        $(split.lines).eq(0).css("display", "block");
        let text = $(split.lines).eq(0).text();
        $(split.lines)
          .eq(0)
          .text(text + "...");

        let tl = gsap.timeline({
          paused: true,
          defaults: { duration: 0.2, ease: "power3" },
        });
        tl.fromTo(content, { height: "6.94em" }, { height: "12.15em" })
          .from(btn, { opacity: 0 }, "<")
          .from($(split.lines).eq(1), { opacity: 0 }, "<");

        $(self).on("mouseenter", () => {
          $(split.lines).css("display", "block");
          $(split.lines).eq(0).text(text);
          tl.restart();
        });
        $(self).on("mouseleave", () => {
          $(split.lines).css("display", "none");
          $(split.lines).eq(0).css("display", "block");
          $(split.lines)
            .eq(0)
            .text(text + "...");
          tl.reverse();
        });
      });
    });
  };
  mentorHover();

  /**
   * Feature progress
   */
  const featureProgress = () => {
    let parent = $(".feature__content");
    let progress = $(".feature__progress--active");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: "top bottom",
        end: "bottom 20%",
        scrub: true,
      },
    });

    tl.from(progress, { transformOrigin: "top", scaleY: 0, ease: "none" });
  };
  featureProgress();

  /**
   * Feature Scroll Animation
   */
  const featureScroll = () => {
    let trigger = $(".feature__content");
    let number = $(".feature__number");
    let numberBG = $(number).find(".feature__number--bg");

    let play2 = { frame: 0 },
      playLottie2 = lottie.loadAnimation({
        container: document.querySelector(".feature__right--content"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "https://uploads-ssl.webflow.com/62fa12005b54e470cfe44e68/62fe6d6408e80d8af72ed346_Anim_2.json",
      });

    playLottie2.addEventListener("DOMLoaded", function () {
      let tlAnimation2 = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "8% center",
          end: "32% center",
          toggleActions: "restart none reverse none",
        },
      });

      tlAnimation2.to(play2, {
        frame: playLottie2.totalFrames - 1,
        ease: "none",
        duration: 4,
        onUpdate: () => playLottie2.goToAndStop(play2.frame, true),
      });
    });

    mm.add(isDesktop, () => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top center",
        end: "32% center",
        onEnter: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(0).addClass("active");
        },
        onEnterBack: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(0).addClass("active");
        },
      });

      ScrollTrigger.create({
        trigger: trigger,
        start: "33% center",
        end: "65% center",
        onEnter: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(1).addClass("active");
        },
        onEnterBack: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(1).addClass("active");
        },
      });

      ScrollTrigger.create({
        trigger: trigger,
        start: "66% center",
        end: "100% center",
        onEnter: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(2).addClass("active");
        },
        onEnterBack: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(2).addClass("active");
        },
      });
    });

    mm.add(isTM, () => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top 70%",
        end: "top 19%",
        onEnter: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(0).addClass("active");
        },
        onEnterBack: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(0).addClass("active");
        },
      });

      ScrollTrigger.create({
        trigger: trigger,
        start: "top 20%",
        end: "top -1%",
        onEnter: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(1).addClass("active");
        },
        onEnterBack: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(1).addClass("active");
        },
      });

      ScrollTrigger.create({
        trigger: trigger,
        start: "top -2%",
        end: "bottom bottom",
        onEnter: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(2).addClass("active");
        },
        onEnterBack: () => {
          $(numberBG).removeClass("active");
          $(numberBG).eq(2).addClass("active");
        },
      });
    });
  };
  featureScroll();

  /**
   * Main Video
   */
  const mainVideo = () => {
    let parent = $(".video");
    let backgroundVid = parent.find(".video-bg");
    let overlay = parent.find(".video__overlay");
    let content = parent.find(".video__title");
    let trigger = parent.find(".video__body");
    let myVideo = $(backgroundVid).find("video");
    let tl = gsap.timeline({ paused: true });
    tl.to([overlay, content], { opacity: 0, duration: 0.2 });

    trigger.on("click", function () {
      $(backgroundVid).toggleClass("playing");
      if ($(backgroundVid).hasClass("playing")) {
        myVideo.prop("muted", false);
        myVideo.prop("currentTime", 0);
        tl.restart();
      } else {
        myVideo.prop("muted", true);
        tl.reverse();
      }
    });

    ScrollTrigger.create({
      trigger: trigger,
      start: "bottom top",
      end: "top bottom",
      onEnter: () => {
        myVideo.prop("muted", true);
        tl.reverse();
      },
      onLeave: () => {
        myVideo.prop("muted", true);
        tl.reverse();
      },
      onEnterBack: () => {
        myVideo.prop("muted", true);
        tl.reverse();
      },
      onLeaveBack: () => {
        myVideo.prop("muted", true);
        tl.reverse();
      },
    });
  };
  mainVideo();

  /**
   * Testimonial LightBox Animation
   */
  const testimonialLightbox = () => {
    let triggerOpen = $("[testimonial-ligthbox='trigger']");

    triggerOpen.each(function () {
      let open = $(this);
      let img = open.find(".videos__img");
      let content = open.find(".videos__content");
      let play = open.find(".videos__play");
      let backgroundVid = open.find(".video-bg");
      let tl = gsap.timeline({ paused: true });
      tl.to([img, content, play], { opacity: 0, duration: 0.2 });

      $(function () {
        var burgerClicks = [
          function () {
            tl.restart();
          },
          function () {
            setTimeout(function () {
              counter = 0;
            }, 200);
            tl.reverse();
          },
        ];
        var counter = 0;
        $(open).click(function (e) {
          e.stopPropagation();
          if (counter >= 2) return false;
          burgerClicks[counter]();
          counter++;
        });
      });

      open.on("click", function () {
        let myVideo = $(backgroundVid).find("video");
        $(backgroundVid).toggleClass("playing");
        // $(open).toggleClass("playing");
        if ($(backgroundVid).hasClass("playing")) {
          myVideo.prop("muted", false);
          myVideo.prop("currentTime", 0);
        } else {
          myVideo.prop("muted", true);
        }
      });
    });

    $(document).click(function () {
      if ($(".videos__cms-item").hasClass("playing")) {
        $(".videos__cms-item.playing").click();
      }
    });
  };
  testimonialLightbox();

  /**
   * Slider Settings
   */
  // Hero Slider
  let swiperHero = new Swiper(".hero__swiper--parent", {
    slidesPerView: "auto",
    spaceBetween: 20,
    keyboard: true,
    direction: "vertical",
    loop: true,
    speed: 1000,
    touchEventsTarget: "container",
    centeredSlides: true,
    autoplay: {
      delay: 800,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        spaceBetween: 5,
        speed: 1000,
      },
      480: {
        spaceBetween: 20,
      },
    },
  });

  // Slider Testimonials
  let swiperTestimonial = new Swiper(".testimonial__cms-wrapper", {
    slidesPerView: "auto",
    keyboard: true,
    direction: "horizontal",
    loop: true,
    speed: 1000,
    touchEventsTarget: "container",
    freeMode: false,
    grabCursor: true,
    breakpoints: {
      320: {
        initialSlide: 0,
        speed: 1000,
      },
      480: {
        centeredSlides: true,
        spaceBetween: 60,
      },
      991: {
        centeredSlides: false,
        spaceBetween: null,
        // slidesPerView: 1
      },
    },
  });

  $(".testimonial__arrow.is--right").click(() =>
    swiperTestimonial.slideNext(1000, true)
  );
  $(".testimonial__arrow.is--left").click(() =>
    swiperTestimonial.slidePrev(1000, true)
  );
};

window.addEventListener("load", () => homeInit());
