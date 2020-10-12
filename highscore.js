var highscores = JSON.parse(localStorage.getItem("highscores"));

console.log(highscores)

if(highscores != null) {
    $('#highscoreContainer').empty()
    
    highscores.forEach((e,i) => {
        var scoreTag = document.createElement("p");
        scoreTag.textContent = '' + (i + 1) + '. ' + e.initials + ' - ' + e.score;
        scoreTag.setAttribute('class','')
        $('#highscoreContainer').append(scoreTag);
    });
}
    
$('#home').on('click',function(){
  window.location.href = './index.html';
})

$('#clear').on('click',function(){
    var confirmClear = confirm('are you sure you want to clear you history')

    if(confirmClear) {
        localStorage.clear();
        $('#highscoreContainer').empty()
        $('#highscoreContainer').text('No Scores Saved')

    }
})