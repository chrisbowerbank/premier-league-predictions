$(function() {
  var matchIds = [
    //1
    "entry.735501007",
    //2
    "entry.1902697499",
    //3
    "entry.2145179791",
    //4
    "entry.483015764",
    //5
    "entry.1766934893",
    //6
    "entry.2011366254",
    //7
    "entry.446400431",
    //8
    "entry.1567131592",
    //9
    "entry.192213138",
    //10
    "entry.108046031"
  ];
  var matchArr = [];
  $.ajax({
    url: "https://sheets.googleapis.com/v4/spreadsheets/1Cq-moMhz7MLKnomxK5qMkIXnOdJZi2N3SMcxamjxFKw/values/A2:E1000?key=AIzaSyDXF-TsAl08BQHZUUupA-kE7BEeJ5DRpWM&majorDimension=ROWS",
    type: "GET",
    success: function(data) {
      var matches = data.values;
      var week = data.values[0][4];
      $('#match-week').val(week);
      $('.week').text(week);
      console.log(matches);
      $.each(matches,function(i,obj) {
        var teamA = matches[i][0];
        var teamAlogo = matches[i][1];
        var teamB = matches[i][2];
        var teamBlogo = matches[i][3];
        var matchObj = {
          "team_A": teamA,
          "team_A_logo": teamAlogo,
          "team_B": teamB,
          "team_B_logo": teamBlogo,
          "matchId": matchIds[i]
        };
        matchArr.push(matchObj);
      });
      console.log(matchArr);
      $.each(matchArr.reverse(),function(i,obj) {
        var matchBlock = '<div class="match form-panel">'+
                            '<div class="matchup"><h3>'+matchArr[i].team_A+' vs. '+matchArr[i].team_B+'<h3></div>'+
                            '<div class="team-a team" data-team='+matchArr[i].team_A+'>'+
                              '<div class="team-name"><h3>'+matchArr[i].team_A+'<h3></div>'+
                              '<div class="team-logo"><img src="https://cdn.jsdelivr.net/gh/chrisbowerbank/premier-league-predictions/img/'+matchArr[i].team_A_logo+'" /></div>'+
                            '</div>'+
                            '<div class="draw team" data-team="draw"><span class="draw-circle"><h3>Draw</h3></span></div>'+
                            '<div class="team-a team" data-team='+matchArr[i].team_B+'>'+
                              '<div class="team-name"><h3>'+matchArr[i].team_B+'<h3></div>'+
                              '<div class="team-logo"><img src="https://cdn.jsdelivr.net/gh/chrisbowerbank/premier-league-predictions/img/'+matchArr[i].team_B_logo+'" /></div>'+
                            '</div>'+
                            '<input type="hidden" name="'+matchArr[i].matchId+'" class="match-pick match-'+[i]+'">'+
                          '</div>';
        $('#match-form').prepend(matchBlock);

      });
      $('.match:first').addClass('active');
      //pick winner
      var totalPanels = $('.form-panel').length + 1;
      var currentPanel = $('.form-panel.active').index() + 1;

      $('.team').click(function() {
        $(this).parents('.match').find('.team.active').removeClass('active');
        $(this).addClass('active');
        var pick = $(this).data('team');
        $(this).parents('.match').find('.match-pick').val(pick);
        var $this = $(this);
        setTimeout(function(){
          $this.parents('.match').removeClass('active').next('.form-panel').addClass('active');
          currentPanel = $('.form-panel.active').index() + 1;
          $('.current-panel').text(currentPanel);
          $('.progress-bar').width((currentPanel / totalPanels) * 100+'%');
        }, 1000);
      });
      //form navigation

      $('.total-panels').text(totalPanels);
      $('.current-panel').text(currentPanel);
      $('.prev-panel').click(function() {
        if ($('.form-panel.active').prev('.form-panel').length > 0) {
          $('.form-panel.active').removeClass('active').prev('.form-panel').addClass('active');
          currentPanel = $('.form-panel.active').index() + 1;
          $('.current-panel').text(currentPanel);
          $('.progress-bar').width((currentPanel / totalPanels) * 100+'%');
          if ($('.form-panel.active').next('.form-panel').length == 0) {
            $('#match-form').removeClass('review');
          }
        }
      });

      $('.next-panel').click(function() {
        if ($('.form-panel.active input').val() !== '' && $('.form-panel.active').next('.form-panel').length > 0) {
          $('.form-panel.active').removeClass('active').next('.form-panel').addClass('active');
          currentPanel = $('.form-panel.active').index() + 1;
          $('.current-panel').text(currentPanel);
          $('.progress-bar').width((currentPanel / totalPanels) * 100+'%');

        } else if ($('.form-panel.active input').val() !== '' && $('.form-panel.active').next('.form-panel').length == 0) {
          $('.form-panel.active').removeClass('active');
          $('#match-form').addClass('review');
          $('.next-panel').addClass('submit-picks').text('Submit');
          $('.review-display').removeClass('hidden');
          $('.matchweek-display').addClass('hidden');
          currentPanel = $('.form-panel.active').index() + 1;
          $('.current-panel').text(totalPanels);
          $('.progress-bar').width('100%');
          $('.submit-picks').click(function() {
            $('#match-form').submit();
          });
        }
      });
      //form send
      var formID = '1tu32J-pGtFoLui7FNGetTK9CeCGC2AE8EOGbAoAggG0';
      $('#match-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
          url: 'https://docs.google.com/forms/d/1tu32J-pGtFoLui7FNGetTK9CeCGC2AE8EOGbAoAggG0/formResponse',
          data: $('#match-form').serialize(),
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
    }, error: function(data) {
      console.log(data);
    }
  });
});
