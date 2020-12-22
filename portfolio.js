$(document).ready(function () {

  var owl = $("#owl-demo");

  owl.owlCarousel({
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
    afterMove: moved
  });

  var owlDate = owl.data("owlCarousel");
  var gallery = $(".slider-gallery ul");
  var prev = $('.prev.gallery-controls');
  var next = $('.next.gallery-controls');
  var count = 0;
  var extraItem = gallery[0].childElementCount - 8;

  if (gallery[0].clientHeight > 450 && gallery[0].offsetTop === 0) {
    $('.next.gallery-controls').addClass('active');
  }
  else if (gallery[0].clientHeight > 450 && gallery[0].offsetTop > 0) {
    $('.gallery-controls').addClass('active');
  }

  prev.on('click', function () {
    if (count >= 0) {
      gallery.css('top', '+=57px');
      count--
    }

    if (count < extraItem) {
      $('.next.gallery-controls').addClass('active');
    }

    if (count === 0) {
      $('.prev.gallery-controls').removeClass('active');
    }

  });

  next.on('click', function () {
    if (count < extraItem) {
      gallery.css('top', '-=57px');
      count++
    }

    if (count >= 1) {
      $('.prev.gallery-controls').addClass('active');
    }

    if (count === extraItem) {
      $('.next.gallery-controls').removeClass('active');
    }

  });

  $(".next.controls").click(function () {
    owl.trigger("owl.next");
    if (extraItem > 0) {

      if (owlDate.currentItem >= 7 && count < extraItem) {
        gallery.css('top', '-=57px');
        count++
      }
      if (owlDate.currentItem >= 7 && count > 1) {
        $('.prev.gallery-controls').addClass('active');
        $('.next.gallery-controls').removeClass('active');
      }
      if (owlDate.currentItem === 0) {
        gallery.css('top', '0');
        count = 0;
        $('.prev.gallery-controls').removeClass('active');
        $('.next.gallery-controls').addClass('active');
      }
    }
  });

  $(".prev.controls").click(function () {
    owl.trigger("owl.prev");
    if (extraItem > 0) {
      if (owlDate.currentItem >= 7 && count >= 1) {
        gallery.css('top', '+=57px');
        count--
      }
      if (owlDate.currentItem >= 7 && count < extraItem) {
        $('.next.gallery-controls').addClass('active');
      }
      if (owlDate.currentItem >= 7 && count === 0) {
        $('.prev.gallery-controls').removeClass('active');
      }
      if (owlDate.currentItem === owlDate.maximumItem) {
        var size = '-' + (extraItem * 57) + 'px';
        gallery.css('top', size);
        $('.prev.gallery-controls').addClass('active');
        $('.next.gallery-controls').removeClass('active');
        count = extraItem;
      }
    }
  });


  $(".slider").on("mouseover", function (e) {
    $(".slider").addClass("active");
  });

  $(".slider").on("mouseleave", function () {
    setTimeout(function () {
      $(".slider").removeClass("active");
    }, 1500);
  });

  $(".slider-gallery").on("click", "img", function () {
    var sliderNum = $(this).parent().data("slide");
    owl.trigger("owl.goTo", sliderNum);
  });

  function moved() {
    var $element = $(".slider-gallery li");
    $element.removeClass("active");
    $(".slider-gallery").find('[data-slide="' + owlDate.currentItem + '"]').addClass("active");
  }
});
