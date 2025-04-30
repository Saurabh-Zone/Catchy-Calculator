const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const calculator = document.querySelector(".calculator");
const themeToggler = document.querySelector(".theme-toggler");
let expression = "";
function updateDisplay() {
    display.textContent = expression || "0";
}
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.id;

        switch (value) {
            case "clear":
                expression = "";
                break;
            case "backspace":
                expression = expression.slice(0, -1);
                break;
            case "equal":
                try {
                    expression = Function(`'use strict'; return (${expression})`)().toString();
                } catch {
                    expression = "Error";
                }
                break;
            default:
                if (expression === "Error") expression = "";
                expression += value;
                break;
        }

        updateDisplay();
    });
});
themeToggler.addEventListener("click", () => {
    calculator.classList.toggle("dark");
    themeToggler.classList.toggle("active");

    if (calculator.classList.contains("dark")) {
        document.body.style.background = "radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)";
    } else {
        document.body.style.background = "linear-gradient(to top right, #fceabb, #f8b500)";
    }
});
updateDisplay();
