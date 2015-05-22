/**
 * Created by denis on 22.05.15.
 */

$(document).foundation();
var i;
function addTask() {
    text = $('#taskText').val();
    if (text != '') {
        $('#tasks').append(
            '<li><a href="#" class="button" id="' + i +'">' + text + '</a></li >');
        i++;
        $('#taskText').val(" ");
    }
    else
        alert("Are you stupid?")

}
function openTask() {
    $('#page1').hide();
    $('#page2').show();
    $('#page2').html($('#i').val());
}