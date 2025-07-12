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


function check(){
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
            displayOnDisplay(curr_num, res[2], res[1]);
            addRow(curr_num, res[2], res[1]);
            clearInterval(timer);
            document.getElementById("main").style.display = "none";
            document.getElementById("congrats").style.display = "flex";
            document.getElementById("corres").innerHTML = curr_num;
            document.getElementById("finaltries").innerHTML = guessed.length;
            document.getElementById("timetaken").innerHTML = `${time}s`;
        }
    }
    else{
        alert('Please enter exactly 4 digits. No Zeroes, No repititions');
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

  function info(){
    if(document.getElementById('info').style.display == 'none'){
        document.getElementById('info').style.display = 'flex';
        document.getElementById('info').style.flexDirection = 'column';
        document.getElementById('infobutton').style.backgroundColor = 'white';
        document.getElementById('infobutton').style.color = 'rgba(249, 93, 71, 0.75)';
        document.getElementById('main_container').style.display = 'none';
    }
    else{
        document.getElementById('info').style.display = 'none';
        document.getElementById('infobutton').style.backgroundColor = 'rgba(249, 93, 71, 0.75)';
        document.getElementById('infobutton').style.color = 'white'
        document.getElementById('main_container').style.display = 'flex';
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
  

  function startTimer(){
    var timerEl = document.getElementById("timer-cont");
    timerEl.innerHTML = `<span>Time elapsed: ${time}</span>`
    timer = setInterval(() => {
            let cont = `<span>Time elapsed: ${++time}s</span>`;
            timerEl.innerHTML = cont;
    }, 1000);
  }

window.onload = function() {
    startTimer();
};