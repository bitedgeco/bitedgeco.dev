"use strict";
(function() {
    // Check if user did not enter numbers in the left or right field resulting in an output of NaN
    function checkNum() {
        if (solutionField.value == "NaN"){
            solutionField.value ="";
            alert("Please enter a number in the left and right fields");
        } 
    };

    // Assign each field to a var
    var leftField = document.getElementById('leftField');
    var centerField = document.getElementById('centerField');
    var rightField = document.getElementById('rightField');

    var focusedInput = leftField;

    function onFocus() {
        focusedInput = this;
    }

    rightField.addEventListener('focus', onFocus);
    leftField.addEventListener('focus', onFocus);
    centerField.addEventListener('focus', onFocus);

    // Keyboard shortcuts, fire listeners by releasing key
    window.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            listenerBtnEquals();
        }
    }, false);
    //p for pi
    window.addEventListener('keyup', function (event) {
        if (event.keyCode === 80) {
            listenerBtnPi();
        }
    }, false);
    // e for exponential/ power of
    window.addEventListener('keyup', function (event) {
        if (event.keyCode === 69) {
            listenerBtnPow();
        }
    }, false);
    // s for square root
    window.addEventListener('keyup', function (event) {
        if (event.keyCode === 83) {
            listenerBtnSqrt();
        }
    }, false);
    //c for clear
    window.addEventListener('keyup', function (event) {
        if (event.keyCode === 67) {
            listenerBtnClear();
        }
    }, false);

    // Listening for number button presses and inputing numbers into fields
    var listenerNumBut = function (event) {
        focusedInput.value = focusedInput.value + this.innerText;
    }

    // creats an var of all html items with class numBut
    var numBut = document.getElementsByClassName('numBut');

    // lops through them and adds event listener
    for (var i = numBut.length - 1; i >= 0; i--) {
        numBut[i].addEventListener('click', listenerNumBut, false);
     };

    var listenerBtnDecimal = function (event) {
        if (focusedInput.value.indexOf(".") == -1) {
             focusedInput.value = focusedInput.value + ".";
        }
    }
    document.getElementById('btnDecimal').addEventListener('click', listenerBtnDecimal, false);

    var listenerBtnPi = function (event) {
        focusedInput.value = "3.14159";
    }

    document.getElementById('btnPi').addEventListener('click', listenerBtnPi, false);

    var listenerBtnPlus = function (event) {
        centerField.value ="+";
        if (!leftField.value) {
            document.getElementById("leftField").focus();
        } else {
            document.getElementById("rightField").focus();
        }
    }
    document.getElementById('btnPlus').addEventListener('click', listenerBtnPlus, false);
    // added extra logic to "-" minus click to suppot negtive numbers is calculations
    var listenerBtnMinus = function (event) {
        if (!leftField.value) {
            leftField.value = "-";
        } else if (centerField.value){
            rightField.value = "-";
        } else {
            centerField.value = "-";
            document.getElementById("rightField").focus();
        }
    }
    document.getElementById('btnMinus').addEventListener('click', listenerBtnMinus, false);

    var listenerBtnTimes = function (event) {
        centerField.value ="*";
        if (!leftField.value) {
            document.getElementById("leftField").focus();
        } else {
            document.getElementById("rightField").focus();
        }
    }
    document.getElementById('btnTimes').addEventListener('click', listenerBtnTimes, false);

    var listenerBtnDivide = function (event) {
        centerField.value ="/";
        if (!leftField.value) {
            document.getElementById("leftField").focus();
        } else {
            document.getElementById("rightField").focus();
        }
    }
    document.getElementById('btnDivide').addEventListener('click', listenerBtnDivide, false);

    var listenerBtnPercent = function (event) {
        centerField.value ="%";
        if (!leftField.value) {
            document.getElementById("leftField").focus();
        } else {
            document.getElementById("rightField").focus();
        }
    }
    document.getElementById('btnPercent').addEventListener('click', listenerBtnPercent, false);

    var listenerBtnSqrt = function (event) {
        centerField.value ="√";
        if (!leftField.value) {
            document.getElementById("leftField").focus();
        } else {
            document.getElementById("rightField").focus();
        }
    }
    document.getElementById('btnSqrt').addEventListener('click', listenerBtnSqrt, false);

    var listenerBtnPow = function (event) {
        centerField.value ="pow";
        if (!leftField.value) {
            document.getElementById("leftField").focus();
        } else {
            document.getElementById("rightField").focus();
        }
    }
    document.getElementById('btnPow').addEventListener('click', listenerBtnPow, false);
    // clears all values if c butto  is pressed
    var listenerBtnClear = function (event) {
        leftField.value = "";
        centerField.value ="";
        rightField.value ="";
        solutionField.value="";
        document.getElementById("leftField").focus();
    }
    document.getElementById('btnClear').addEventListener('click', listenerBtnClear, false);

    // equals button functions runs calculations switching in the operator
    var listenerBtnEquals = function (event) {
        switch (centerField.value) {
            case "+":
                solutionField.value = parseFloat(leftField.value) + parseFloat(rightField.value);
                break;
            case "-":
                solutionField.value = leftField.value - rightField.value;
                break;
            case "*":
                solutionField.value = leftField.value * rightField.value;
                break;
            case "/":
                solutionField.value = leftField.value / rightField.value;
                break;
            case "%":
                solutionField.value = leftField.value / rightField.value * 100 + "%";
                break;
            case "pow":
                solutionField.value = Math.pow(parseFloat(leftField.value), parseFloat(rightField.value));
                break;
            case "√":
                solutionField.value = Math.sqrt(parseFloat(leftField.value));
                break;
            default:
                alert("Please enter one of the following in the center field \n+ \n- \n* \n/ \n% \n√ \npow");
                leftField.value ="";
        }
        // Then runs the checkNum funtion at the top of the page to check if output was NaN 
        checkNum();
        centerField.value ="";
        rightField.value ="";
        leftField.value ="";
        // returns the focus to the left field
        document.getElementById("leftField").focus();

    }
    document.getElementById('btnEquals').addEventListener('click', listenerBtnEquals, false);
    // enable tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({container: 'body'});
    })
})();
