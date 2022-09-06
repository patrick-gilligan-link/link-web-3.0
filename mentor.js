const introLightbox = () => {
  let triggerOpen = $("[intro-ligthbox='trigger']");
  triggerOpen.each(function (i) {
    let open = $(this);
    let img = open.find(".profile__right--img, .meet__avatar");
    let overlay = open.find(".profile__righ--overlay, .intro__overlay");
    let content = open.find(".profile__right--content, .intro__mentor--split");
    let play = open.find(".video__play");
    let backgroundVid = open.find(".video-bg");
    let tl = gsap.timeline({ paused: true });
    tl.to([img, overlay, content, play], { opacity: 0, duration: 0.2 });

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
      $(open).click(function () {
        if (counter >= 2) return false;
        burgerClicks[counter]();
        counter++;
      });
    });

    open.on("click", function () {
      let myVideo = $(backgroundVid).find("video");
      $(backgroundVid).toggleClass("playing");
      if ($(backgroundVid).hasClass("playing")) {
        myVideo.prop("muted", false);
        myVideo.prop("currentTime", 0);
      } else {
        myVideo.prop("muted", true);
      }
    });
  });
};
introLightbox();

const spotlightLightbox = () => {
  let triggerOpen = $("[spotlight-ligthbox='trigger']");
  triggerOpen.each(function (i) {
    let open = $(this);
    let lightbox = $(".spotlight-lightbox").eq(i);
    let triggerClose = lightbox.find(".lightbox__close");
    let triggerOverlay = lightbox.find(".lightbox__overlay");
    gsap.set(lightbox, { display: "none" });
    let tl = gsap.timeline({ paused: true });
    tl.to(lightbox, { display: "flex", duration: 0 }).from(
      lightbox,
      { opacity: 0, duration: 0.2 },
      "<"
    );

    open.click(() => tl.restart());
    triggerClose.click(() => tl.reverse());
    triggerOverlay.click(() => tl.reverse());

    let backgroundVid = lightbox.find(".video-bg");

    backgroundVid.on("click", function () {
      let myVideo = $(backgroundVid).find("video");
      $(backgroundVid).toggleClass("playing");
      if ($(backgroundVid).hasClass("playing")) {
        myVideo.prop("muted", false);
        myVideo.prop("currentTime", 0);
      } else {
        myVideo.prop("muted", true);
      }
    });
  });
};
spotlightLightbox();
