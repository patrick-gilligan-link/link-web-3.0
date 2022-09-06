const howInit = () => {
  /**
   * Feature progress
   */
  const featureProgress = () => {
    let parent = $(".feature__content");
    let progress = $(".feature__progress--active");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: "top 30%",
        end: "bottom 30%",
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

    ScrollTrigger.create({
      trigger: trigger,
      start: "top center",
      end: "24% center",
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
      start: "25% center",
      end: "49% center",
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
      start: "50% center",
      end: "74% center",
      onEnter: () => {
        $(numberBG).removeClass("active");
        $(numberBG).eq(2).addClass("active");
      },
      onEnterBack: () => {
        $(numberBG).removeClass("active");
        $(numberBG).eq(2).addClass("active");
      },
    });

    ScrollTrigger.create({
      trigger: trigger,
      start: "75% center",
      end: "100% center",
      onEnter: () => {
        $(numberBG).removeClass("active");
        $(numberBG).eq(3).addClass("active");
      },
      onEnterBack: () => {
        $(numberBG).removeClass("active");
        $(numberBG).eq(3).addClass("active");
      },
    });
  };
  featureScroll();

  /**
   * FAQ Tabs
   */
  $(".faq__top").on("click", function () {
    if (!$(this).hasClass("open")) {
      $(".faq__top.open").click();
    }
    let sibling = $(this).siblings(".faq__bot");
    let iconLine = sibling.find(".faq__icon--line.is--ab");
    let animationDuration = 300;

    if ($(this).hasClass("open")) {
      sibling.animate({ height: "0px" }, animationDuration);
      $(".faq__icon--line.is--ab").addClass("open");
      $(".faq__item").removeClass("open");
      iconLine.css("transform", "rotate(90deg)");
    } else {
      sibling.css("height", "auto");
      let autoHeight = sibling.height();
      sibling.css("height", "0px");
      $(this).parent().addClass("open");
      $(this).find(".faq__icon--line.is--ab").removeClass("open");
      sibling.animate({ height: autoHeight }, animationDuration, function () {
        sibling.css("height", "auto");
      });
    }
    $(this).toggleClass("open");
    setTimeout(function () {
      locoScroll.update();
    }, 400);
  });

  /**
   * Mentor Hover Animation
   */
  const mentorHover = () => {
    $(".tags__mentor--cms-item").each(function () {
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
  };
  mentorHover();

  /**
   * Partners Hover Animation
   */
  const partnersHover = () => {
    $(".partners__item").each(function () {
      let self = $(this);
      // let icon = self.find(".partners__icon");
      let text = self.find(".p--20");
      let tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.4, ease: "power3" },
      });
      tl.to(self, { scale: 1.04 });

      self.on("mouseenter", () => {
        tl.restart();
        text.addClass("col--gradient-2");
      });
      self.on("mouseleave", () => {
        tl.reverse();
        text.removeClass("col--gradient-2");
      });
    });
  };
  partnersHover();
};

window.addEventListener("load", () => howInit());
