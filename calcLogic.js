const outputBox = document.querySelector("input")

function evaluate(s) {
    
}

function calc(e) {
    if (!["A","D"].includes(e.target.id)) {
        console.log(e.target.id)
        outputBox.value = outputBox.value + e.target.id
    } else if (e.target.id==="D") {
        outputBox.value = ""
    } else {
        console.log(outputBox.value)
        outputBox.value = ""
    }
};


const buttons = document.querySelectorAll("button");

buttons.forEach(function (btn) {
    btn.addEventListener("click", calc);
});