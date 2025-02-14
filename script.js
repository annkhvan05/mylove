let clickCount = 0;
let isDragging = false;
let offsetX, offsetY;

function openEnvelope() {
    clickCount++;

    if (clickCount === 1) {
        document.getElementById("envelope").src = "images/withletter.png";
        document.getElementById("instruction").textContent = "Вытяни письмо";
    } 
    else if (clickCount === 2) {
        document.getElementById("letter").style.display = "block";
        document.getElementById("instruction").classList.add("hidden");
    } 
    else if (clickCount === 3) {
        closeLetter(); // Закрываем письмо и сбрасываем всё
    }
}

function closeLetter() {
    document.getElementById("letter").style.display = "none";
    document.getElementById("envelope").src = "images/convert.png";
    document.getElementById("instruction").classList.remove("hidden");
    document.getElementById("instruction").textContent = "Нажми на конверт";
    clickCount = 0; // Сброс кликов
    document.getElementById("next-page").classList.add("hidden"); // Скрыть кнопку "Дальше"
}

document.getElementById("envelope").addEventListener("click", openEnvelope);

const letter = document.getElementById("letter");

letter.addEventListener("mousedown", (event) => {
    if (clickCount < 2) return; // Перетаскивание возможно только после второго клика
    isDragging = true;
    offsetX = event.clientX - letter.getBoundingClientRect().left;
    offsetY = event.clientY - letter.getBoundingClientRect().top;
    letter.style.position = "absolute";
    letter.classList.remove("expanded");
});

document.addEventListener("mousemove", (event) => {
    if (isDragging) {
        letter.style.left = event.clientX - offsetX + "px";
        letter.style.top = event.clientY - offsetY + "px";
    }
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        letter.style.left = "50%";
        letter.style.top = "50%";
        letter.style.transform = "translate(-50%, -50%)";
        letter.classList.add("expanded"); // Письмо увеличивается после отпускания
        document.getElementById("next-page").classList.remove("hidden"); // Показываем кнопку "Дальше"
    }
});
