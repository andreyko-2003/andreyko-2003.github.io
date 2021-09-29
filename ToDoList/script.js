$(function() {
  var today = getDate();
  haveTask();
  $(".day").text(today);
  var day = dateForInput();
  var dates = [day];
  timeForInput();

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
      }
      var newTask = $("<div class='task'></div>").html("<h4 class='taskTitle'>" + task + "</h4>");
      $(newTask).append("<em class='category'>" + category + "</em><br>");
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
      $(this).parent().css("text-decoration", "line-through");
    });
    $(".del").on("click", function() {
      $(this).parent().remove();
      haveTask();
    });
  });
});

function dateForInput() {
  var date = new Date();
  var dateValue;
  if (date.getMonth() <= 9) dateValue = "0" + (date.getMonth() + 1);
  dateValue = date.getFullYear() + "-" + dateValue + "-" + date.getDate()
  $("#day").val(dateValue);
  $("#day").prop("min", dateValue);
  return dateValue;
}

function timeForInput() {
  var time = new Date();

  $("#time-start").val(time.getHours() + ":" + time.getMinutes());
  $("#time-end").val((time.getHours() + 1) + ":" + time.getMinutes());
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
