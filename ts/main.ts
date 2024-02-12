interface ArrayConstructor {
  from(
    arrayLike: any,
    mapFn?: (value: any, index: number) => any,
    thisArg?: any
  ): any[];
}

const inpField = document.querySelector("input") as HTMLInputElement;
const body = document.querySelector("body") as HTMLBodyElement;

function deepSearchAndBlur(
  elem: HTMLElement,
  isDigging: boolean,
  prevOpacity: string
): void {
  elem.hasChildNodes() && elem.tagName !== "BUTTON" && elem.tagName !== "P"
    ? Array.from(elem.children).forEach((item) => {
        deepSearchAndBlur(item as HTMLElement, isDigging, elem.style.opacity);
      })
    : isDigging
    ? elem.parentElement?.classList.contains("input__wrapper")
      ? ""
      : (elem.style.opacity = ".6")
    : (elem.style.opacity = prevOpacity);
}

function fieldLostFocus(this: HTMLInputElement): void {
  deepSearchAndBlur(body, false, this.style.opacity);

  this.removeEventListener("blur", fieldLostFocus);
  this.addEventListener("focus", fieldHasFocus);
}

function fieldHasFocus(this: HTMLInputElement): void {
  deepSearchAndBlur(body, true, this.style.opacity);

  this.removeEventListener("focus", fieldHasFocus);
  this.addEventListener("blur", fieldLostFocus);
}

inpField.addEventListener("focus", fieldHasFocus);

// проверка на непустой input и очистка ввода

const clearInput = document.querySelector(".x__icon") as HTMLImageElement;

inpField.addEventListener("input", (): void => {
  clearInput.style.display = "block";

  clearInput.addEventListener("click", clearInputHandler);
});

function clearInputHandler() {
  inpField.value = "";
  clearInput.style.display = "none";

  clearInput.removeEventListener("click", clearInputHandler);
}
