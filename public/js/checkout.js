$(document).ready(function(){
  $(".stripe-button-el span").remove();
  $("button.stripe-button-el").removeAttr('style').css({
    "display":"inline-block",
    "width":"auto",
    "padding":"15px",
    "background":"red",
    "color":"white",
    "font-size":"1.3em" }).html("Pay With Card");
});