document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const password1 = document.querySelector("input[name='passwordraw1']");
    const password2 = document.querySelector("input[name='passwordraw2']");
    const messageDiv = document.createElement("div");
    messageDiv.style.color = "red";

    form.addEventListener("submit", function(event) {
        if (password1.value !== password2.value) {
            console.log("GOT HERE 1");
            event.preventDefault();
            messageDiv.textContent = "Passwords don't match!";
            if (!form.contains(messageDiv)) {
                form.appendChild(messageDiv);
            }
        } else if (password1.value.length < 8) {
            console.log("GOT HERE 2");
            event.preventDefault();
            messageDiv.textContent = "Password must be more than 8 characters!";
            if (!form.contains(messageDiv)) {
                form.appendChild(messageDiv);
            }
        } else {
            console.log("GOT HERE 3");
            console.log("PASSWORD LENGTH: " + password1.value.length);
            messageDiv.textContent = "";
        }
    });
});
