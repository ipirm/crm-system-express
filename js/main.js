 $(".menu .list li").click(function() {
    $(".menu .list li").removeClass("active");
    $(this).toggleClass("active");
  });