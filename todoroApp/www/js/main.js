$(document).foundation();
var i;
function addTask() {
    text = $('#taskText').val();
    if (text != '') {
        $('#tasks').append(
            '<li><a href="#" class="button" id="' + i + '" onclick="openTask(event);">' + text + '</a></li >');
        i++;
        //clean input field
        $('#taskText').val('');
    }
    else
        alert("Are you stupid?")

}
function openTask(event) {
    var todoText = event.target.textContent;
    $('#page1').hide();
    $('.footer').hide();
    $('#page2').show();
    $('#currentTask').html(todoText);
}


function backToList() {
    $('#page2').hide();
    $('#page1').show();
    $('.footer').show();
}

//Timer 25:00

var seconds = 1500;
var countdownTimer;

function secondPassed() {

    var minutes = Math.round((seconds - 30) / 60),
        remainingSeconds = seconds % 60;

    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    $('#startbutton').html(minutes + ":" + remainingSeconds);
    if (seconds == 0) {
        clearInterval(countdownTimer);
        $('#startbutton').html("00:00");
    } else {
        seconds--;
    }
}

function startCycle(event, boolToggle) {
    var button = $('#startbuuton');
    if (boolToggle) {
        button.attr('onclick', false);
        button.addClass('alert');
        button.removeClass('primary');
        countdownTimer = setInterval('secondPassed()', 1000);
    }
    else {
        button.attr('onclick', true);
        clearInterval(countdownTimer);
    }

}
