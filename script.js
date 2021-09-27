var fons =  ["img/fon-blue.png", "img/fon-red.jpg","img/fon-brown.jpg", "img/fon-green.jpg"];
var colors = ["#6483f5", "#ff0000", "#f59600", "#10c900"];
var headHeight = $("#head").outerHeight();
$(function() {
  let windowWidth = document.documentElement.clientWidth;
  let windowHeight = document.documentElement.clientHeight;
  changeSize(windowWidth, windowHeight);
  $(window).resize(function() {
    windowHeight = document.documentElement.clientHeight;
    windowWidth = document.documentElement.clientWidth;
    changeSize(windowWidth, windowHeight);
  });

  var i = 0;
  setInterval(function() {
    i++;
    if (i > fons.length - 1) i = 0;
    $("#home").css("background-image", "url(" + fons[i] + ")");
    $("#ahome").css("background", colors[i]);
    $(".titleText").css("color", colors[i]);
    $(".star").css("color", colors[i]);
    $("#btn-send-massage").css("background", colors[i]);
    $("#hideMenu").css("background", colors[i]);
  }, 15000);

  $("#hideMenu").click(function() {
    $(".menu").slideToggle(500);
    $("#aHome").css("height", headHeight - 10 + "px");
  });
});

function changeSize(windowWidth, windowHeight) {
  let homeHeight = windowHeight > 500 ? windowHeight : 500
  let fontSize = windowWidth / 35 <= 20 ? 20 : windowWidth / 35;
  let contactMeHeight = windowHeight - headHeight > 400 ? windowHeight - headHeight : 400;
  $("#home").css("height", homeHeight + "px");
  $("#text").css("font-size", fontSize + "px");
  $("#contactMe").css("height", contactMeHeight + "px");
  $(".rating-area").css("margin-right", (($(".rate").outerWidth() - 250) / 2) + "px");
  $("#hideMenu").css("height", headHeight -10 + "px");
  if (windowWidth > 750) {
    $("#hideMenu").hide();
    $(".menu").show();
  } else {
    $(".menu").hide();
    $("#hideMenu").show();
  }
}

$("#btn-send-massage").on("click", function() {

});
