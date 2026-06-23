const outputBox = document.querySelector("input");

function evalMulDiv(s) {

}

function evaluate(s) {
    let sign = 1;
    let numStarted = false;
    let num = 0;
    let total = 0;
    let prevSign = false;

    while ((s.includes("*")) || (s.includes("*"))) {
        s = evalMulDiv(s);
    }

    for (let i=0; i<s.length; i++) {
        if ("0123456789".includes(s[i])) {
            numStarted = true;
            num = Number(s[i]) + num * 10;
            prevSign = false;
        } else if ("+-".includes(s[i])) {
            if (prevSign===true) {
                sign = (s[i]==="+") ? sign : sign*-1;
                continue;
            }
            total += num * sign;
            sign = (s[i]==="+") ? 1 : -1;
            prevSign = true;
            num = 0;
        } else {
            return "ERROR";
        }
    }

    if ((num===0) && (numStarted===false)) {
        return "ERROR";
    }

    total += num * sign;
    return total;

}

function calc(e) {
    if (!["A","D"].includes(e.target.id)) {
        console.log(e.target.id);
        outputBox.value = outputBox.value + e.target.id;
    } else if (e.target.id==="D") {
        outputBox.value = "";
    } else {
        console.log(outputBox.value);
        outputBox.value = evaluate(outputBox.value);
    }
}


const buttons = document.querySelectorAll("button");

buttons.forEach(function (btn) {
    btn.addEventListener("click", calc);
});