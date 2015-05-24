$(document).foundation();
var i;
var GlobalWriter;


$(document).ready(function(){
    localStorage.setItem('counter', 0);
    //localStorage.setItem('0',"cooking");
    //localStorage.setItem('1',"learn python");
    //localStorage.setItem('2',"read a book");
    //localStorage.setItem('3',"do s.th");
    //localStorage.setItem('4',"do anything else");
    //i = 5;
    //
    //for (var i = 0; i < localStorage.length; i++){
    //    $('#tasks').append(
    //        '<li><a href="#" class="button" id="' + i + '" onclick="openTask(event);">' + localStorage.getItem(localStorage.key(i)) + '</a></li >'
    //
    //    );
    //}
    parseFile();
    onDeviceReady();

});

function parseFile() {
    $.get('todo.txt').done(function (data) {
    //$.get('https://raw.githubusercontent.com/BakeCode/todoro/master/todoroApp/www/todo.txt').done(function (data) {
        todo = TodoTxt.parseFile(data);
        list = todo.items.call();
 var _class='primary';
        for (task of list) {
            if (task.isComplete()){
                _class ='secondary';
            }
            $('#tasks').append(
                '<li><a href="#" class="button " + _class + " id="' + i + '" onclick="openTask(event);">' + task.textTokens().join(' ') + '</a></li >');
        }


    });
}

function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    fileSystem.root.getFile("todo.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    GlobalWriter = writer;
    parseFile();
}

function fail(error) {
    console.log(error.code);
}




function addTask() {
    text = $('#taskText').val();
    if (text != '') {
        $('#tasks').append(

            '<li><a href="#" class="button" id="' + i + '" onclick="openTask(event);">' + text + '</a></li >');
            localStorage.setItem(i, text);
        todo.addItem(text);
        i++;
        localStorage.setItem("i", i);
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
        var count= localStorage.getItem('counter');
        count++;
        localStorage.setItem('counter', count);
        $('#counter').html(count);
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


function appendTextToFile(task) {
    GlobalWriter.onwrite = function(evt) {
        console.log("write success");
    };
    GlobalWriter.seek(GlobalWriter.length);
    GlobalWriter.write(task);
}

