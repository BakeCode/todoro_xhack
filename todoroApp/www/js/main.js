$(document).foundation();
var i;
function addTask() {
    text = $('#taskText').val();
    if (text != '') {
        $('#tasks').append(
            '<li><a href="#" class="button" id="' + i +'" onclick="openTask(event);">' + text + '</a></li >');
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

function backToList(){
    $('#page2').hide();
    $('#page1').show();
    $('.footer').show();
}