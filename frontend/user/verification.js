const inputs = document.querySelectorAll('.code-input');

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        // Move to the next input if a digit is entered
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
            // Move to the previous input if Backspace is pressed on an empty field
            inputs[index - 1].focus();
        }
    });
});
