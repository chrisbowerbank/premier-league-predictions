$(function() {
  $('input[type="radio"]').change(function(i) {
     var matchPick = $(this).val();
     $(this).parents('.fs-radio-group').find('.match-pick').val(matchPick);
     console.log(matchPick);
  });
  
});
