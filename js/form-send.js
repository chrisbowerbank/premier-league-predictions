$(function() {
  $('input[type="radio"]').change(function(i) {
     var matchPick = $(this).val();
     $(this).parents('.fs-radio-group').find('.match-pick').val(matchPick);
     console.log(matchPick);
  });
  var formID = '1tu32J-pGtFoLui7FNGetTK9CeCGC2AE8EOGbAoAggG0';
  
  $('#myform').submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: 'https://docs.google.com/forms/d/1tu32J-pGtFoLui7FNGetTK9CeCGC2AE8EOGbAoAggG0/formResponse',
      data: $('#myform').serialize(),
      statusCode: { //the status code from the POST request
        0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
          //success
          $('#form-success').text('hooray!');
        },
        200: function(data) {//200 is a success code. it went through!
          //success
          $('#form-success').text('hooray!');
        },
        403: function(data) {//403 is when something went wrong and the submission didn't go through
          //error
          alert('Oh no! something went wrong. we should check our code to make sure everything matches with Google');
        }
      }
    });
  });
});
