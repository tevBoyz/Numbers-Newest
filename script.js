// var mytable = document.getElementById("list_for_guessed");
var mytable = document.getElementById("table_history").getElementsByTagName('tbody')[0];
var mydisplay = document.getElementById("num_display");
var curr_num;
var res = [-1, -1, -1];
var guessed = []

var time = 0;
var timer = '';

var num_to_Guess = random4Digit();
// var num_to_Guess = 2134;

var input = document.getElementById("input");
var firstTime = true;

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    check();
  }
});


function addRow(number, cn, cp){
    guessed.push(number);
    var new_content = "<tr> <td>"+ guessed.length +"</td> <td>"+ number +"</td> <td>"+ cn +"</td> <td>"+ cp + "</td> </tr>";
    var new_row = mytable.insertRow(0);
    new_row.innerHTML = new_content;
}

function compare(guessed_num){
    res = [0, 4, 4];
    if(guessed_num == num_to_Guess){
        res[0] = 1;
    }
    else{
        let g = String(guessed_num).split('').map(Number);
        let an = String(num_to_Guess).split('').map(Number);

        res[0] = 0;
        res[1] = getCorrectPosCount(g, an);
        res[2] = getRightNums(g, an);
    }
}

function formatTime(totalSeconds) {
    // Calculate hours, minutes, and seconds
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    // Add leading zeros
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
}

function startTimer(){
    var timerEl = document.getElementById("timer-cont");
    timerEl.innerHTML = `<span>Time elapsed: 00:00:00</span>`;
    timer = setInterval(() => {
            time++;
            let formattedTime = formatTime(time);
            timerEl.innerHTML = `<span>Time elapsed: ${formattedTime}</span>`;
    }, 1000);
  }


function check(){
    if(firstTime) {
        startTimer();
        firstTime = false;
    }
    curr_num = document.getElementById("input").value;
    if (curr_num >= 1000 && curr_num <= 9999){
        document.getElementById("input").classList.remove("red")
        compare(curr_num);
        if (res[0] == 0){
            addRow(curr_num, res[2], res[1]);
            curr_num = document.getElementById("input").value = "";
        document.getElementById("input").focus();
        }
        else{
            addRow(curr_num, res[2], res[1]);
            clearInterval(timer);
            document.getElementById("main").style.display = "none";
            document.getElementById("congrats").style.display = "flex";
            document.getElementById("corres").innerHTML = curr_num;
            document.getElementById("finaltries").innerHTML = guessed.length;
            document.getElementById("timetaken").innerHTML = formatTime(time) + 's';
        }
    }
    else{
        alert('Please enter 4 digits to check. No Zeroes and No repititions');
        curr_num = document.getElementById("new_number").value = "";
        document.getElementById("new_number").focus();
    }
}

function getCorrectPosCount(guessed, answer){
    let count = 0;
    for(let i = 0; i < 4; i++){
        if(guessed[i] == answer[i])
            count++;
    }
    return count;
}


function back(){
    document.getElementById("main").style.display = "flex";
    document.getElementById("congrats").style.display = "none";
}

function restart(){
    location.reload();
}


function getRightNums(guessed, answer){
    let count = 0;
    let gotNums = [];
    for(let i = 0; i < 4; i++){
        if ((answer.indexOf(guessed[i]) !== -1) && (gotNums.indexOf(guessed[i]) == -1))
        { 
            count++;
            gotNums.push(guessed[i]);
        }
    }
    return count;
}


function validateInput() {
    const input = document.getElementById('input');
    const value = input.value;
    const floatingMsg = document.querySelector('.floating-message');
    
    // Hide floating message when typing
    if (value.length > 0) {
        floatingMsg.style.display = 'none';
    } else {
        floatingMsg.style.display = 'block';
    }


    let c = String(value).split('').map(Number);

    if (value.length > 4 || isNaN(value)) {
      alert('Please enter exactly 4 digits. No Zeroes, No repititions');
      input.value = '';
    }
    if(c.indexOf(0) !== -1){
    alert('No Zeroes, please');
    input.value = '';
    }
    if(hasDuplicates(value)){
        alert('No Duplicates, please');
        input.value = ''; 
    }
  }

  function info() {
    const infoDiv = document.getElementById('info');
    const infoButton = document.getElementById('infobutton');
    const mainContainer = document.getElementById('main_container');
    
    // Toggle based on current display state
    if (infoDiv.style.display !== 'flex') {
        // Show info
        infoDiv.style.display = 'flex';
        infoDiv.style.flexDirection = 'column';
        infoButton.style.backgroundColor = 'white';
        infoButton.style.color = 'rgba(249, 93, 71, 0.75)';
        mainContainer.style.display = 'none';
    } else {
        // Hide info
        infoDiv.style.display = 'none';
        infoButton.style.backgroundColor = '';
        infoButton.style.color = '';
        mainContainer.style.display = 'flex';
    }
}

  function hasDuplicates(a) {

    const noDups = new Set(a);
  
    return a.length !== noDups.size;
  }

  function random4Digit(){
    return shuffle( "123456789".split('') ).join('').substring(0,4);
  }
  
  function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }
  
window.onload = function() {
    input.focus();
    // startTimer();
};