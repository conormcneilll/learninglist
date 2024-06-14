document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const password1 = document.querySelector("input[name='passwordraw1']");
    const password2 = document.querySelector("input[name='passwordraw2']");
    const messageDiv = document.createElement("div");
    messageDiv.style.color = "red";

    form.addEventListener("submit", function(event) {
        if (password1.value !== password2.value) {
            event.preventDefault();
            messageDiv.textContent = "Passwords don't match!";
            if (!form.contains(messageDiv)) {
                form.appendChild(messageDiv);
            }
        } else {
            messageDiv.textContent = "";
        }
    });
});
