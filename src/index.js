"use strict";
// src/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let correctDigits = 0;
let currentDigit = 0;
let digitString = "";
let lastReqPosition = -10;
//let lastElement: Element = null
const digitDiv = document.getElementById("digits");
function requestDigits(s, Nd) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.pi.delivery/v1/pi?start=${s}&numberOfDigits=${Nd}`);
        const data = yield response.json();
        return data.content;
    });
}
document.addEventListener("keydown", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const key = event.key;
    console.log(key);
    console.log(digitString[0]);
    if (digitString.length < 10) {
        lastReqPosition += 10;
        digitString += yield requestDigits(lastReqPosition, 10);
    }
    if (key == digitString[0]) {
        const newDigit = document.createElement("digit");
        newDigit.textContent = digitString[0];
        if (((_a = digitDiv === null || digitDiv === void 0 ? void 0 : digitDiv.lastElementChild) === null || _a === void 0 ? void 0 : _a.className) == "incorrect")
            newDigit.className = "incorrect";
        else {
            newDigit.className = "correct";
            digitString = digitString.slice(1);
        }
        digitDiv === null || digitDiv === void 0 ? void 0 : digitDiv.appendChild(newDigit);
    }
    else {
        if (!isNaN(Number(key))) {
            const newDigit = document.createElement("digit");
            newDigit.textContent = key;
            newDigit.className = "incorrect";
            digitDiv === null || digitDiv === void 0 ? void 0 : digitDiv.appendChild(newDigit);
        }
    }
    if (key == "Backspace") {
        const lastDigit = digitDiv === null || digitDiv === void 0 ? void 0 : digitDiv.lastElementChild;
        console.log(lastDigit);
        if (lastDigit && lastDigit.className == "incorrect") {
            digitDiv.removeChild(lastDigit);
        }
    }
}));