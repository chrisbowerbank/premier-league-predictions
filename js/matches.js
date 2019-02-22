$(function() {
  var matchIds = [
    "entry.735501007",
    "entry.1902697499",
    "entry.2145179791",
    "entry.483015764",
    "entry.1766934893",
    "entry.1766934893",
    "entry.446400431",
    "entry.1567131592",
    "entry.192213138",
    "entry.108046031"
  ];
  var matchArr = [];
  $.ajax({
    url: "https://sheets.googleapis.com/v4/spreadsheets/1Cq-moMhz7MLKnomxK5qMkIXnOdJZi2N3SMcxamjxFKw/values/A2:C1000?key=AIzaSyDXF-TsAl08BQHZUUupA-kE7BEeJ5DRpWM&majorDimension=ROWS",
    type: "GET",
    success: function(data) {
      var matches = data.values;
      var week = data.values[0][4];
      $('#match-week').val(week);
      $('.week').text(week);
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
      $.each(matchArr,function(i,obj) {
        var matchBlock = '<div class="match form-panel">'+
                            '<div class="matchup">'+matchArr[i].team_A+' vs. '+matchArr[i].team_B+'</div>'+
                            '<div class="team-a team" data-team='+matchArr[i].team_A+'>'+
                              '<div class="team-name">'+matchArr[i].team_A+'</div>'+
                              '<div class="team-logo"><img src="https://cdn.jsdelivr.net/gh/chrisbowerbank/premier-league-predictions/img/'+matchArr[i].team_A_logo+'"></div>'+
                            '</div>'+
                            '<div class="draw team">Draw</div>'+
                            '<div class="team-b team" data-team="">'+matchArr[i].team_B+'</div>'+
                            '<input type="hidden" name="'+matchArr[i].matchId+'" class="match-pick match-'+[i]+'">'+
                          '</div>';
        $('#match-form').prepend(matchBlock);
      });
      $('.team').click(function() {

      });
      //form send
      var formID = '1tu32J-pGtFoLui7FNGetTK9CeCGC2AE8EOGbAoAggG0';
      $('#match-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
          url: 'http://cors.io/?https://docs.google.com/forms/d/1tu32J-pGtFoLui7FNGetTK9CeCGC2AE8EOGbAoAggG0/formResponse',
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
