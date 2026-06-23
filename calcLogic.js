const outputBox = document.querySelector("input");

function evalMulDiv(s) {
    let sign = 1;
    let num1 = null;
    let num2 = null;
    let marker = false;
    let num1Started = false;
    let num2Started = false;
    let interval = [0,0];

    for (let i=0; i<s.length; i++) {
        if (marker===false) {
            if (!("+-/*".includes(s[i]))) {
                if (num1===null) {
                    num1 = 0;
                }
                if (num1Started===false) {
                    interval[0] = i;
                    num1Started = true;
                }
                num1 = Number(s[i]) + num1 * 10;
            } else if ("+-".includes(s[i])) {
                num1 = null;
                num1Started = true;
                interval[0] = i;
                sign = (s[i]==="+") ? 1 : -1;
            } else if ("*/".includes(s[i])) {
                if (num1===null) {
                    return "ERROR"
                }
                marker = true;
                num1 = sign*num1;
                sign = 1;
                op = (s[i]==="*") ? (x,y) => x*y : (x,y) => Math.floor(x/y);
            } else {
                return "ERROR"
            }
        } else {
            if (!("+-*/".includes(s[i]))) {
                if (num2===null) {
                    num2 = 0;
                }
                num2 = Number(s[i]) + num2 * 10;
                num2Started = true;
            } else if (("+-".includes(s[i])) && (num2Started===false)) {
                sign = (s[i]==="+") ? 1 : -1;
            } else if (("+-*/".includes(s[i])) && (num2Started===true)) {
                interval[1] = i;
                break
            } else {
                return "ERROR"
            }
        }
    }

    if ((num1===null) || (num2===null)) {
        return "ERROR"
    }
    console.log(s.slice(0,interval[0]) + "+" + String(op(num1,num2)) + s.slice(interval[1]))

    console.log(num1,num2)

    if ((num2Started===true) && (interval[1]===0)) {
        return s.slice(0,interval[0]) + "+" + String(op(num1,num2))
    } else {
        return s.slice(0,interval[0]) + "+" + String(op(num1,num2)) + s.slice(interval[1])
    }
}

function evaluate(s) {
    let sign = 1;
    let numStarted = false;
    let num = 0;
    let total = 0;
    let prevSign = false;

    while ((s.includes("*")) || (s.includes("/"))) {
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