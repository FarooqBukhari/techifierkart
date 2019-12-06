//writing review
var $star_rating = $('.star-rating .fa-star');

var SetRatingStar = function() {
return $star_rating.each(function() {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
    return $(this).removeClass('far').addClass('fas');
    } else {
    return $(this).removeClass('fas').addClass('far');
    }
});
};

$star_rating.on('click', function() {
$star_rating.siblings('input.rating-value').val($(this).data('rating'));
return SetRatingStar();
});

SetRatingStar();
$(document).ready(function(){

    //Tab toggling
    $(".description").show();
    $(".specs").hide();
    $(".reviews").hide();
    $(".writeReview").hide();
    //-- Click on detail or Specs
    $("ul.menu-items > li").on("click",function(){
        $("ul.menu-items > li").removeClass("active");
        $(this).addClass("active");
        if($(".attr1").hasClass("active")){
            $(".description").show();
            $(".specs").hide();
            $(".reviews").hide();
            $(".writeReview").hide();
        }   
        else if($(".attr2").hasClass("active")){
            $(".description").hide();
            $(".specs").show();
            $(".reviews").hide();
            $(".writeReview").hide();
        } 
        else if($(".attr3").hasClass("active")){
            $(".description").hide();
            $(".specs").hide();
            $(".reviews").show();
            $(".writeReview").hide();
        }
        else{
            $(".description").hide();
            $(".specs").hide();
            $(".reviews").hide();
            $(".writeReview").show();
        }
    })                    
});