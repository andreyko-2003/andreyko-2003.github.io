$(function() {
  $("body").width(document.documentElement.clientWidth + "px");
  $(window).resize(function() {
    $("body").width(document.documentElement.clientWidth + "px");
  });
  if ($("#complatedTasks").children().length === 0) {
    $("#completedTitle").hide();
    $("#completedTasks").hide();
  }
  $(".addTask").hide();
  $("#addT").on("click", function() {
    $(".addTask").show();
    $("#addT").hide();
    $(".taskLists").hide();
  });
  $("#cancel").on("click", function() {
    $(".addTask").hide();
    $("#addT").show();
    $(".taskLists").show();
  });

  var today = getDate();
  haveTask();
  $(".day").text(today);
  var day = dateForInput();
  var dates = [day];
  timeForInput();
  var hasTime = false;
  $(".start").hide();
  $(".end").hide();
  $("#add-timing").height(($("#add-new-task").outerHeight() * 1.5) + "px");
  $("#add-timing").on("click", function() {
    $(".start").toggle();
    $(".end").toggle();
    hasTime = !hasTime;
  });
  $("#add").on("click", function() {
    var task = $("#add-new-task").val();
    var category = $("#add-category").val();
    var color = getColor();
    var date = $("#day").val();
    var list;
    if (task !== "") {
      for (var i = 0; i < dates.length; i++) {
        if (date === day) {
          list = "#listForToday";
        } else if (date === dates[i] && date !== day) {
          list = "#listFor" + dates[i];
        } else {
          dates.push(date);
          if ($("#title" + date).text() === "") {
            var newDay = $("<h1 id='title" + date + "'>Task for " + date + "</h1>");
            $(".taskLists").append(newDay);
          }
          var newList = $("<ul id='listFor" + date + "'</ul>");
          $(".taskLists").append(newList);
          list = "#listFor" + date;
        }
        $(".taskLists").show();
        $(".addTask").hide();
        $("#addT").show();
      }
      var newTask = $("<div class='task'></div>").html("<h4 class='taskTitle'>" + task + "</h4>");
      $(newTask).append("<em class='category'>" + category + "</em><br>");
      $(newTask).append("<h6 class='dayy'><em>" + date + "</em><h6>");
      if (hasTime) {
        var timeStart = $("#time-start").val();
        var timeEnd = $("#time-end").val();
        $(newTask).append("<h6 class='taskTiming'>" + timeStart + " - " + timeEnd + "</h6>");
        $("#add-timing").click();
      }
      $(newTask).css("background-color", color);
      $(newTask).append("<button class='set'>✎</button>");
      $(newTask).append("<button class='done'>✔</button>");
      $(newTask).append("<button class='del'>✖</button>");
      $(list).append(newTask);
      $("#add-new-task").val("");
      $("#add-category").val("");
      let temp = dateForInput();
      timeForInput();
      haveTask();
    }

    $(".set").hide();
    $(".del").hide();
    $(".done").hide();

    $(".task").on("mousemove", function() {
      $(this).find(".set").show();
      $(this).find(".del").show();
      $(this).find(".done").show();
    });
    $(".task").on("mouseout", function() {
      $(this).find(".set").hide();
      $(this).find(".del").hide();
      $(this).find(".done").hide();
    });
    $(".done").on("click", function() {
      $(this).parent().appendTo("#completedTasks");
      $("#completedTasks").find(".set").remove();
      $("#completedTasks").find(".del").hide();
      $("#completedTasks").find(".done").remove();
      $(this).parent().remove();
      $("#completedTitle").show();
      $("#completedTasks").show();
      haveTask();
      $(".task").on("mousemove", function() {$(this).find(".del").show();});
      $(".task").on("mouseout", function() {$(this).find(".del").hide();});
      $(".del").on("click", function() {
        $(this).parent().remove();
        if ($("#completedTasks").children().length === 0) {
          $("#completedTitle").hide();
          $("#completedTasks").hide();
        }
      });
    });
    $(".del").on("click", function() {
      $(this).parent().remove();
      haveTask();
    });
    $(".set").on("click", function() {
      $("#addT").click();
      var editTitle = $(this).parent().find(".taskTitle").text();
      $("#add-new-task").val(editTitle);
      var editCategory = $(this).parent().find(".category").text();
      $("#add-category").val(editCategory);
      var editDay = $(this).parent().find(".dayy").text();
      $("#day").val(editDay);
      var editTiming = $(this).parent().find(".taskTiming").text();
      if (editTiming !== "") {
        $("#add-timing").click();
        var editStart = editTiming.substr(0, 5);
        $("#time-start").val(editStart);
        var editEnd = editTiming.substr(8, 13);
        $("#time-end").val(editEnd);
      }
      //Добавить замену цвета ------------------------------------------------------
      var oldTask = $(this);
      if ($("#save").length === 0) {
        var save = $("<button id='save'>Save</button>");
        $(".buttons").append(save);
      } else {
        $("#save").show();
      }
      $("#add").hide();
      $("#cancel").on("click", function(){
        $("#add").show();
        $("#save").hide();
      });
      $("#save").on("click", function(){
        $("#add").show();
        $("#save").hide();
        $(oldTask).parent().remove();
        $("#add").click();
      });
    });
  });
});

function dateForInput() {
  var date = new Date();
  var dateValue;
  if (date.getMonth() <= 9) dateValue = "0" + (date.getMonth() + 1);
  else dateValue = date.getMonth() + 1;
  dateValue = date.getFullYear() + "-" + dateValue + "-" + date.getDate()
  $("#day").val(dateValue);
  $("#day").prop("min", dateValue);
  return dateValue;
}

function timeForInput() {
  var time = new Date();
  var hour; var min;
  if (time.getHours() <= 9) hour = "0" + time.getHours();
  else hour = time.getHours();
  if (time.getMinutes() <= 9) min = "0" + time.getMinutes();
  else min = time.getMinutes();
  $("#time-start").val(hour + ":" + min);
  $("#time-end").val((hour + 1) + ":" + min);
}

function getDate() {
  var date = new Date();
  let weekday = new Intl.DateTimeFormat('en', {
    weekday: 'long'
  }).format(date);
  let year = new Intl.DateTimeFormat('en', {
    year: 'numeric'
  }).format(date);
  let month = new Intl.DateTimeFormat('en', {
    month: 'long'
  }).format(date);
  let day = new Intl.DateTimeFormat('en', {
    day: '2-digit'
  }).format(date);
  return weekday + ", " + day + " " + month + " " + year;
}

function getColor() {
  if ($("#color-red").prop("checked")) {
    $("#color-red").prop("checked", false);
    return "#ff0000";
  } else if ($("#color-orange").prop("checked")) {
    $("#color-orange").prop("checked", false);
    return "#ff6600";
  } else if ($("#color-yellow").prop("checked")) {
    $("#color-yellow").prop("checked", false);
    return "#ffdd00";
  } else if ($("#color-green").prop("checked")) {
    $("#color-green").prop("checked", false);
    return "#20cc00";
  } else if ($("#color-blue").prop("checked")) {
    $("#color-blue").prop("checked", false);
    return "#0055ff";
  } else if ($("#color-violet").prop("checked")) {
    $("#color-violet").prop("checked", false);
    return "#9900ff";
  } else return "ffffff"
}

function haveTask() {
  if ($("#listForToday").children().length === 0) {
    $(".dayTitle").hide();
    $(".noTask").show();
  } else {
    $(".dayTitle").show();
    $(".noTask").hide();
  }
}
