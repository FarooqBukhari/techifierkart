$('document').ready(function(){
    $(".searchBar").mouseenter(function(){
        $(".searchResults").css("display","block");
    })
    $(".searchBar").mouseleave(function(){
        $(".searchResults").css("display","none");
    })
});