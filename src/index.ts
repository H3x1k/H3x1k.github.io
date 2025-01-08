// src/index.ts

let correctDigits: number = 0
let currentDigit: number = 0
let digitString: string = ""
let lastReqPosition: number = -10

const digitDiv = document.getElementById("digits") as HTMLElement;
const inputField = document.getElementById("input-field") as HTMLElement;
const counterDiv = document.getElementById("counter") as HTMLElement;


async function init() {
    lastReqPosition += 10;
    digitString += await requestDigits(lastReqPosition, 10);
}

inputField.addEventListener("keydown", async (event) => {
    const key = event.key;
    if (key == digitString[0]) {
        const newDigit = document.createElement("digit");
        newDigit.textContent = digitString[0];
        if (digitDiv.lastElementChild?.className == "incorrect") // entered multiple incorrect digits
            newDigit.className = "incorrect";
        else { // entered correct digit
            newDigit.className = "correct";
            digitString = digitString.slice(1);
            correctDigits++;
            counterDiv.innerHTML = correctDigits.toString();
        }
        digitDiv.appendChild(newDigit);
        digitDiv.style.width = digitDiv.scrollWidth + 'px';
        console.log(digitDiv.style.width);
    } else { // entered incorrect digit
        if (!isNaN(Number(key))) {
            const newDigit = document.createElement("digit");
            newDigit.textContent = key;
            newDigit.className = "incorrect"
            digitDiv.appendChild(newDigit);
            digitDiv.style.width = digitDiv.scrollWidth + 'px';
        }
    }
    if (key == "Backspace") {
        const lastDigit = digitDiv?.lastElementChild;
        console.log(lastDigit);
        if (lastDigit && lastDigit.className == "incorrect") {
            digitDiv.removeChild(lastDigit);
            digitDiv.style.width = digitDiv.scrollWidth + 'px';
        }
    }
    if (digitString.length < 10) {
        lastReqPosition += 10;
        digitString += await requestDigits(lastReqPosition, 10);
    }
});

async function requestDigits(s: number, Nd: number): Promise<string> {
    const response = await fetch(`https://api.pi.delivery/v1/pi?start=${s}&numberOfDigits=${Nd}`);
    const data = await response.json();
    return data.content;
}

init()