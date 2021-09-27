var add = document.getElementById("bAdd");
var sub = document.getElementById("bSub");
var mul = document.getElementById("bMul");
var div = document.getElementById("bDiv");
var del = document.getElementById("bDel");
var back = document.getElementById("bBack");

var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");
var b5 = document.getElementById("b5");
var b6 = document.getElementById("b6");
var b7 = document.getElementById("b7");
var b8 = document.getElementById("b8");
var b9 = document.getElementById("b9");
var b0 = document.getElementById("b0");

var input = document.getElementById("question");
var str = $("#question").text();
var eql = document.getElementById("bEql");
var res = document.getElementById("res");

var hasDot = false;
var hasSelector = false;
var hasNumAfterSelector = false;
var dot = document.getElementById("bDot");

var windowHeight = document.documentElement.scrollHeight;
var page = document.getElementById("conteiner");

$(function() {
  page.style['height'] = windowHeight - 20 + "px";
});

$(window).resize(function() {
  windowHeight = document.documentElement.scrollHeight;
  page.style['height'] = windowHeight - 20 + "px";
});

document.addEventListener("keydown", function(e) {
  if (e.keyCode == 97 || e.keyCode == 49) {
    pressNumber("1");
  } else if (e.keyCode == 98 || e.keyCode == 50) {
    pressNumber("2");
  } else if (e.keyCode == 99 || e.keyCode == 51) {
    pressNumber("3");
  } else if (e.keyCode == 100 || e.keyCode == 52) {
    pressNumber("4");
  } else if (e.keyCode == 101 || e.keyCode == 53) {
    pressNumber("5");
  } else if (e.keyCode == 102 || e.keyCode == 54) {
    pressNumber("6");
  } else if (e.keyCode == 103 || e.keyCode == 55) {
    pressNumber("7");
  } else if (e.keyCode == 104 || e.keyCode == 56) {
    pressNumber("8");
  } else if (e.keyCode == 105 || e.keyCode == 57) {
    pressNumber("9");
  } else if (e.keyCode == 96 || e.keyCode == 48) {
    pressNumber("0");
  } else if (e.keyCode == 109 || e.keyCode == 189) {
    pressSelector("-")
  } else if (e.keyCode == 107 || e.shiftKey && ['=','+'].includes(event.key)) {
    pressSelector("+")
  } else if (e.keyCode == 111 || e.keyCode == 191) {
    pressSelector("÷")
  } else if (e.keyCode == 106 || e.shiftKey && ['8','*'].includes(event.key)) {
    pressSelector("×")
  } else if (e.keyCode == 13 || e.keyCode == 187) {
    eql.click();
  } else if (e.keyCode == 8) {
    back.click();
  } else if (e.keyCode == 190 || e.keyCode == 110) {
    dot.click();
  }
});

function pressNumber(num) {
  if (hasSelector) {
    hasNumAfterSelector = true;
  }
  if (str == "0") {
    str = num;
    input.innerHTML = num;
  } else if (str == "=") {
    str = num;
    input.innerHTML = num;
    resCustom(false);
  } else {
    str += num;
    input.innerHTML += num;
  }
  equal();
  hasSelector = false;
}

function pressSelector(selector) {
  if (str == "=") {
    str = $("#res").text();
    str = str.substr(1, str.length);
    input.innerHTML = str;
    resCustom(false);
  }
  //let ends = str.substr(str.length - 2, str.length - 1);
  //if (ends != "+" && ends != "-" && ends != "*" && ends != "/") {
  if (!hasSelector) {
    input.innerHTML += selector;
    if (selector == "×") selector = "*";
    else if (selector == "÷") selector = "/";
    str += selector;
  }
  hasSelector = true;
  hasNumAfterSelector = false;
  hasDot = false;
}

function equal() {
  try {
    res.innerHTML = "= " + eval(str);
  } catch (e) {
    console.log("Wrong");
  }
}

eql.addEventListener("click", function(event) {
  equal();
  resCustom(true);
  str = "=";
});

eql.addEventListener("mousemove", function(event) {
  eql.firstChild.style.background = "#006060"
});

eql.addEventListener("mouseout", function(event) {
  eql.firstChild.style.background = "#008080"
});

function resCustom(isEql) {
  if (isEql) {
    res.style.color = "#000000";
    input.style.color = "#696969"
    res.style.fontSize = "30px";
    input.style.fontSize = "20px";
  } else {
    res.style.color = "#696969";
    input.style.color = "#000000";
    res.style.fontSize = "20px";
    input.style.fontSize = "30px";
  }
}

back.addEventListener("click", function(event) {
  if (str.length > 1) {
    str = str.substr(0, str.length - 1);
    var t = input.innerHTML;
    t = t.substr(0, t.length - 1);
    input.innerHTML = t;
    equal();
  } else if (str.length == 1) {
    str = "0";
    input.innerHTML = "0";
    equal();
  }
});

del.addEventListener("click" , function(event){
  str = "0";
  input.innerHTML = "0";
  equal();
})

add.addEventListener("click", function(event) {
  pressSelector("+");
});

sub.addEventListener("click", function(event) {
  pressSelector("-");
});

div.addEventListener("click", function(event) {
  pressSelector("÷");
});

mul.addEventListener("click", function(event) {
  pressSelector("×");
});

dot.addEventListener("click", function(event) {
  if (hasNumAfterSelector) {
    if (!hasDot) {
      hasDot = false;
    }
  }
  if (!hasDot) {
    str += ".";
    input.innerHTML += ".";
    hasDot = true;
  }
})

for(let i = 0; i <= 9; i++) {
  let numclick = eval("b" + i + ".addEventListener(\"click\", function(event) {" +
    "pressNumber(\"" + i + "\");" +
  "});");
}
