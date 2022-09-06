let list = $(".options");

$(list).on("mouseenter", () => locoScroll.stop());
$(list).on("mouseleave", () => locoScroll.start());

const dropOpen = () => {
  let parent = $(".form__select--parent");
  let arrow = $(".select__top--arrow");
  let top = $(".select__top");
  let bot = $(".select__bot");
  let tl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.4, ease: "power2" },
  });
  gsap.set(bot, { display: "none" });
  tl.to(bot, { display: "block" })
    .from(bot, { opacity: 0 }, "<")
    .to(arrow, { rotation: 180 }, "<");

  $(top).click(() => tl.play());
  $(parent).on("mouseleave", () => tl.reverse());
};

dropOpen();

const formSteps = () => {
  let step1 = $(".start__form--step.is--1");
  let step2 = $(".start__form--step.is--2");
  let title1 = $(".start__top--item.is--1");
  let title2 = $(".start__top--item.is--2");
  let btnNext = $(".start__next-btn").find(".btn-parent");
  let nextParent = $(".start__next-btn");
  gsap.set(step1, { display: "flex" });
  gsap.set(title1, { display: "block" });
  gsap.set([step2, title2], { display: "none", opacity: 0 });
  let tl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.4, ease: "power2" },
  });

  tl.to([step1, title1, nextParent], { opacity: 0 })
    .to([step1, title1, nextParent], { display: "none" })
    .to([step2, title2], { display: "block", opacity: 1 });

  $(btnNext).click(() => {
    tl.play();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
formSteps();

$(".start__form--step-list").each(function () {
  let popup = $(this);
  let input = $(".start__form--step.is--1").find("input");
  $.validator.addMethod("letters", function (value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Z\s]*$/);
  });

  $.validator.setDefaults({
    debug: true,
  });

  let validator = popup.validate({
    rules: {
      name: { required: true, minlength: 2, letters: true },
      email: { required: true, email: true },
      phone: { required: true, minlength: 7, maxlength: 13 },
    },
    messages: {
      name: "Please specify your name",
      email: "Please specify a valid email address",
      phone: "Please specify a valid phone number",
    },
  });

  const checkInputs = () => {
    // console.log(popup.valid());
    if (popup.valid() === true) {
      $(".btn-validate").css("pointer-events", "none");
    }
  };

  $(".btn-validate").click(() => {
    validator.form();
    $("label.error").css("opacity", "1");
  });
  $(input).on("keydown", () => checkInputs());

  let btnHeight = $(".start__next-btn").find(".btn-border").height();
  let btnWidth = $(".start__next-btn").find(".btn-border").width();
  gsap.set(".btn-validate", { height: btnHeight, width: btnWidth });
});
$("select").each(function () {
  var $this = $(this),
    numberOfOptions = $(this).children("option").length;

  $this.addClass("s-hidden");
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="styledSelect"></div>');
  var $styledSelect = $this.next("div.styledSelect");
  $styledSelect.text($this.children("option").eq(0).text());
  var $list = $("<ul />", {
    class: "options",
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
    $("<li />", {
      text: $this.children("option").eq(i).text(),
      rel: $this.children("option").eq(i).val(),
    }).appendTo($list);
  }
  $(".options").find("li").eq(0).remove();

  var $listItems = $list.children("li");
  let submit = $(".form__submit");
  let href;
  let condition = false;

  $styledSelect.click(function (e) {
    e.stopPropagation();
    $("div.styledSelect.active").each(function () {
      $(this).removeClass("active").next("ul.options").hide();
    });
    $(this).toggleClass("active").next("ul.options").toggle();
  });

  $listItems.click(function (e) {
    e.stopPropagation();
    $styledSelect
      .text($(this).text())
      .removeClass("active")
      .prepend("<div class='circle bg--gradient-3'></div>");
    $this.val($(this).attr("rel"));
    $list.hide();
  });

  const checkValue = () => {
    if ($this.val() === "Stress") {
      href = "/schedule/stress";
    }
    if ($this.val() === "Anxiety") {
      href = "/schedule/anxiety";
    }
    if ($this.val() === "Handling Pressure") {
      href = "/schedule/handling-pressure";
    }
    if ($this.val() === "College Planning") {
      href = "/schedule/college-planning";
    }
    if ($this.val() === "Insecurity") {
      href = "/schedule/insecurity";
    }
    if ($this.val() === "Loneliness") {
      href = "/schedule/loneliness";
    }
    if ($this.val() === "Academic Challenges") {
      href = "/schedule/academic-challenges";
    }
    if ($this.val() === "Communication") {
      href = "/schedule/communication";
    }
    if ($this.val() === "Feeling Lost") {
      href = "/schedule/feeling-lost";
    }
    if ($this.val() === "Relationships") {
      href = "/schedule/relationships";
    }
    if ($this.val() === "Self-Expression") {
      href = "/schedule/self-expression";
    }
  };

  $(submit).click(function () {
    checkValue();
    let timer = setInterval(function () {
      if ($(".success").css("display") === "block") {
        condition = true;
        if (condition === true) {
          clearInterval(timer);
          location.href = href;
        }
      }
    }, 10);
  });

  $(document).click(function () {
    $styledSelect.removeClass("active");
    $list.hide();
  });

  $(".styledSelect").addClass("p--16");
  $(".options li").addClass("p--16");
  $(".styledSelect").prepend("<div class='circle'></div>");
});
