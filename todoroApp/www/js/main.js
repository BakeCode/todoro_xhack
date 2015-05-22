$(document).foundation();
var i;
$(document).ready(function() {


    $.get('todo.txt').done(function (data) {
        todo = TodoTxt.parseFile(data);
        list = todo.items.call();


        for (task of list){
            $('#tasks').append(

                '<li><a href="#" class="button" id="' + i + '" onclick="openTask(event);">' + task.textTokens().join(' ') + '</a></li >');
        }

    });



});

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

    var barSize = (((1500 - seconds) / 1500) * 100);

    var progressFill = $('.meter');
    var progressBar = $('.progress');
    progressFill.width(
        barSize + '%'
    );

    if (barSize > 30.) {
        progressBar.removeClass('alert').addClass('primary');
    }

    if (barSize > 60) {
        progressBar.removeClass('primary').addClass('success');
    }
    if (seconds == 0) {
        clearInterval(countdownTimer);
        $('#startbutton').html("00:00");
    } else {
        seconds--;
    }
}

function startStopCycle(boolToggle) {
    var button = $('#startbutton');
    if (boolToggle) {
        button.attr('onclick', 'startStopCycle(false)');
        button.removeClass('primary').addClass('alert');
        countdownTimer = setInterval('secondPassed()', 1000);
    }
    else {
        button.attr('onclick', 'startStopCycle(true)');
        clearInterval(countdownTimer);
        button.addClass('primary');
        button.removeClass('alert');
    }

}
