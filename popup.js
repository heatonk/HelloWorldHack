//Find UTC Time Offset
var HTMLTime = document.getElementById("offsetOutput");
var formatTime = null;
function systemTime() {
  if (document.getElementById("timezone-offset").value == "null") {
    var time = new Date();
    var currentTimeZoneOffset = time.getTimezoneOffset();
    //Format UTC Time
    var hours = Math.floor(currentTimeZoneOffset / 60);
    var minutes = currentTimeZoneOffset % 60;
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (currentTimeZoneOffset > 0) {
      formatTime = "UTC-" + hours + ":" + minutes;
    }
    else if (currentTimeZoneOffset < 0) {
      formatTime = "UTC+" + hours + ":" + minutes;
    }
  }
}

systemTime();

HTMLTime.innerHTML = formatTime;

function saveChanges(){
  if (sliderBoolean == false){
    localStorage.mydata = 'y';
  } else {
    localStorage.mydata = 'n';
  }

  chrome.storage.sync.set({
    'value': localStorage.mydata
  }, function(){

  })
}

//function saveManual(){
//  localStorage.mydata2 = document.getElementById("timezone-offset").options[document.getElementById("timezone-offset").selectedIndex].value;
//  
//  chrome.storage.sync.set({
//    'value2': localStorage.mydata2
//  }, function(){
//
//  })
//}

//Maually Set the Time Zone
function setZone() {
  formatTime = "UTC" + document.getElementById("timezone-offset").value;
  systemTime();
  HTMLTime.innerHTML = formatTime;
}

//var checkbox = document.querySelector('input[name=slidingToggle');

//checkbox.addEventListener('change', function(){
//  if(this.checked == false){
//    chrome.tabs.executeScript(null, {file: "testExecution.js"});
//  }
//});

$('#slidingToggle').click(function(){
  console.log($('#slidingToggle'));
  if($('#slidingToggle')[0].checked === false){
    //chrome.tabs.executeScript(null, {file: "testExecution.js"});
    changeWebpage();
  }
})

var sliderBoolean = false;

$(document).ready(function(){
  $("#slidingToggle").click(function(){ //block of code for slidingToggle saving procedure
    sliderBoolean = $(this).is(':checked');
  });
  if (localStorage.getItem('mydata')){
    if (localStorage.mydata == 'n'){
      $('#slidingToggle').attr('checked', true);
    }else{
      $('#slidingToggle').attr('checked', false);
    }
  }else{
    if ($('#slidingToggle').is(':checked')){
      localStorage.setItem('mydata', 'n');
    }else{
      localStorage.setItem('mydata', 'y');
    }
  }
  $('#slidingToggle').click(function() {
    saveChanges();
  });
});

$(document).ready(function(){
  //document.getElementById("manualButton").onclick = setZone();
  $("#manualButton").click(function(){
    setZone();
  });

  $("#settings").click(function(){
      $("#settingsContent").toggle(function () { $(this).animate({height: "75px"}, 300);
      });
  });
});