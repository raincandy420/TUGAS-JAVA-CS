document.addEventListener("DOMContentLoaded", function () {
    const preIntro = document.querySelector(".pre_intro");
    const showContentButton = document.getElementById("showcontent");

    showContentButton.addEventListener("click", function () {
        preIntro.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "ipas1.html";
        }, 1000);
    });
});