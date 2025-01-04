// src/index.ts

let correctDigits: number = 0
let currentDigit: number = 0
let digitString: string = ""
let lastReqPosition: number = -10
//let lastElement: Element = null

const digitDiv = document.getElementById("digits");

async function requestDigits(s: number, Nd: number): Promise<string> {
    const response = await fetch(`https://api.pi.delivery/v1/pi?start=${s}&numberOfDigits=${Nd}`);
    const data = await response.json();
    return data.content;
}

document.addEventListener("keydown", async (event: KeyboardEvent) => {
    const key = event.key;
    console.log(key);
    console.log(digitString[0]);
    if (digitString.length < 10) {
        lastReqPosition += 10;
        digitString += await requestDigits(lastReqPosition, 10);
    }
    if (key == digitString[0]) {
        const newDigit = document.createElement("digit");
        newDigit.textContent = digitString[0];
        if (digitDiv?.lastElementChild?.className == "incorrect")
            newDigit.className = "incorrect";
        else {
            newDigit.className = "correct";
            digitString = digitString.slice(1);
        }
        digitDiv?.appendChild(newDigit);
    } else {
        if (!isNaN(Number(key))) {
            const newDigit = document.createElement("digit");
            newDigit.textContent = key;
            newDigit.className = "incorrect"
            digitDiv?.appendChild(newDigit);
        }
    }
    if (key == "Backspace") {
        const lastDigit = digitDiv?.lastElementChild;
        console.log(lastDigit);
        if (lastDigit && lastDigit.className == "incorrect") {
            digitDiv.removeChild(lastDigit);
        }
    }
});

