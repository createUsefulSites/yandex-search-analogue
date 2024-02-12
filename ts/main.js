var inpField = document.querySelector("input");
var body = document.querySelector("body");
function deepSearchAndBlur(elem, isDigging, prevOpacity) {
    var _a;
    elem.hasChildNodes() && elem.tagName !== "BUTTON" && elem.tagName !== "P"
        ? Array.from(elem.children).forEach(function (item) {
            deepSearchAndBlur(item, isDigging, elem.style.opacity);
        })
        : isDigging
            ? ((_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("input__wrapper"))
                ? ""
                : (elem.style.opacity = ".6")
            : (elem.style.opacity = prevOpacity);
}
function fieldLostFocus() {
    deepSearchAndBlur(body, false, this.style.opacity);
    this.removeEventListener("blur", fieldLostFocus);
    this.addEventListener("focus", fieldHasFocus);
}
function fieldHasFocus() {
    deepSearchAndBlur(body, true, this.style.opacity);
    this.removeEventListener("focus", fieldHasFocus);
    this.addEventListener("blur", fieldLostFocus);
}
inpField.addEventListener("focus", fieldHasFocus);
// проверка на непустой input и очистка ввода
var clearInput = document.querySelector(".x__icon");
inpField.addEventListener("input", function () {
    clearInput.style.display = "block";
    clearInput.addEventListener("click", clearInputHandler);
});
function clearInputHandler() {
    inpField.value = "";
    clearInput.style.display = "none";
    clearInput.removeEventListener("click", clearInputHandler);
}
