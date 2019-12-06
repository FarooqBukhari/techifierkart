$('document').ready(function(){
  $('#email').change(function(){
    var email = $('#email').val();
    if (email == '') {
      $('#email').parent().removeClass();
      $('#email').siblings("span").text('');
        return;
    }
    if(email.length > 5){
      $.ajax({
        url: '/checkemail/'+ email,
        type: 'GET',
        dataType: 'json',
        contentType:'json',
        success: function(response){
          console.log(response);
            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
              $('#email').parent().removeClass();
              $('#email').parent().addClass("form_error");
              $('#email').siblings("span").text('');
            }
            else if (response.message == 'taken' ) {
            $('#email').parent().removeClass();
            $('#email').parent().addClass("form_error");
            $('#email').siblings("span").text('Sorry... Email already taken');
            }else if (response.message == 'not_taken') {
              $('#email').parent().removeClass();
              $('#email').parent().addClass("form_success");
              $('#email').siblings("span").text('Email available');
            }
        },
        error: function(xhr , status){
          console.log(xhr);
          console.log(status);
        },
        complete: function(xhr , status){
          console.log(xhr);
          console.log(status);
        }
      });
    }
  });
});