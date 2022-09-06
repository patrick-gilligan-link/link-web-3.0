const mentorInit = () => {
  // gsap.set($(".nav").find(".new"), {
  //   width: "15.28em",
  //   paddingTop: "1.16em",
  //   paddingBottom: "1.16em",
  //   paddingLeft: "2.89em",
  //   paddingRight: "2.89em"
  // });

  /**
   * Load More
   */
  function loadMore() {
    let lis = $(".meet__cms-item");
    let min = 10;
    let max = lis.length;
    let visible = min;

    function showUpToIndex(index) {
      lis.hide();
      lis.slice(0, index).show();
    }

    function disableButtons() {
      if (visible >= max) {
        visible = max;
        $(".meet__more  ").hide();
      } else {
        $(".meet__more  ").show();
      }
    }

    showUpToIndex(visible);
    disableButtons();

    $(".meet__more  ").click(function (e) {
      e.preventDefault();
      visible = visible + 4;
      disableButtons();
      showUpToIndex(visible);
      setTimeout(() => {
        locoScroll.update();
        ScrollTrigger.refresh();
      }, 100);
    });
  }

  loadMore();

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
          defaults: { duration: 0.8, ease: "power3" },
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

  // Slider
  let swiperVideos = new Swiper(".swiper", {
    slidesPerView: "auto",
    keyboard: true,
    direction: "horizontal",
    speed: 800,
    touchEventsTarget: "container",
    freeMode: false,
    grabCursor: true,
    breakpoints: {
      320: {
        centeredSlides: true,
        spaceBetween: 20,
        slidesPerView: 1,
        initialSlide: 0,
      },
      480: {
        centeredSlides: true,
        spaceBetween: 60,
        slidesPerView: 1,
      },
      991: {
        centeredSlides: false,
        spaceBetween: 100,
        // slidesPerView: 1
      },
    },
  });

  $(".testimonial__arrow.is--right").click(() =>
    swiperVideos.slideNext(1000, true)
  );
  $(".testimonial__arrow.is--left").click(() =>
    swiperVideos.slidePrev(1000, true)
  );
};

window.addEventListener("load", () => {
  mentorInit();
  ScrollTrigger.refresh();
});
