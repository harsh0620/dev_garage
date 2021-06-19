//Function to change todos to incomplete to complete
function change() 
{
    var elem = document.getElementById("myButton1");
    if (elem.value=="false") elem.value = "true";
    else elem.value = "false";
}
//Sidenav Bar Opening Materialize CSS Function
M.Sidenav.init(document.querySelector('.sidenav'))


//CKEDITOR function
CKEDITOR.replace('body',{
    plugins: 'wysiwygarea, toolbar, basicstyles, link'
})


//Digital Clock Time Show
function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    let session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();

//Maintainer Circle Show function
(function() {
  /**
   * Draws the outline of the svg circle to the percent set in data attr
   */
  function drawCharts() {
    
    var circles = document.querySelectorAll('.percent-circle');

    circles.forEach(function(el) {
      //pull the percentage and turn it into a fraction
      var percent = el.dataset.percent / 100;
      //work out the circumference from the width
      var diameter = el.offsetWidth;
      var circumference = Math.ceil(diameter * Math.PI);
      //now we have the circumference, we know how long the ouline should be
      var stroke = Math.ceil(circumference * percent);
      //also workout how long the line doesn't exist for
      var diff = circumference - stroke;

      //now add the strok dash array for the first two values
      //TODO : could this all be done with css?
      el.querySelector('.percent-circle-inner').style.strokeDasharray = stroke +'px '+ diff +'px';
    });
  }
  
  document.addEventListener('DOMContentLoaded', drawCharts);
})();

//Get Quote when clicked function
const api = "https://api.quotable.io/random";

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("btn");

btn.addEventListener("click", getQuote);

function getQuote() {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      quote.innerHTML = `"${data.content}"`;
      author.innerHTML = `- ${data.author}`;
    });
}
