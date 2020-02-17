const upperScreen = document.querySelector('.upperScreen');
const lowerScreen = document.querySelector('.screen')
const input = document.querySelector('.buttons').addEventListener("click", function(event) {
    clickBtn(event.target.innerText);
});

const clickBtn = (value) => {
    //value.length <= 2 because if the user manages to click between two buttons
    if (value.length <= 2) {
        
        //check to see if the value is a number or a symbol
        if(isNaN(parseInt(value))) {
            symbolHandler(value);
        } else {
            numberHandler(value);
        }
    }
}

const symbolHandler = (value) => {
    switch (value) {
        //if =, then do evaluation()
        case '=':
            try {
                let total = math.evaluate(lowerScreen.innerText);
                if (total === Infinity) {
                    lowerScreen.innerText = "ERROR";
                    displayUpperScreen(lowerScreen.innerText + '=')
                } else {
                    displayUpperScreen(lowerScreen.innerText + '=');
                    lowerScreen.innerText = total;
                }
            } catch (e) {
                upperScreen.innerText = lowerScreen.innerText + '=';
                lowerScreen.innerText = "ERROR";
            }
            break;
        //if C, then clear lowerScreen
        case 'C':
            clearLowerscreen();
            break;
        //If CE, then backspace the lowerScreen if valid
        case 'CE':
            let upperLength = upperScreen.innerText.length;
            let lastChar = upperScreen.innerText.charAt(upperLength - 1);
            if (lowerScreen.innerText != '0' && lowerScreen.innerText.length > 1 && lastChar != '=') {
                let length = lowerScreen.innerText.length - 1;
                lowerScreen.innerText = lowerScreen.innerText.substring(0, length);
             } else {
                 clearLowerscreen();
             }
            break;
        case '(':
            if (lowerScreen.innerText === '0' || lowerScreen.innerText === "ERROR")
                lowerScreen.innerText = value;
            else
                lowerScreen.innerText += value;
            break;
        case ')':
            if (lowerScreen.innerText === '0' || lowerScreen.innerText === "ERROR")
                lowerScreen.innerText = value;
              else
                lowerScreen.innerText += value;
        break;
        //if anything else do some math
        default:
            operatorHandler(value);
            break;
    }
}

const displayUpperScreen = (value) => {
    upperScreen.innerText = value;
}

const operatorHandler = (value) => {
    let length = lowerScreen.innerText.length;
    let lastChar = lowerScreen.innerText.charAt(length -1);
    //Checks to see if there was an operator right before: if operator return, else append
    if(isNaN(lastChar) && lastChar != '(' && lastChar != ')')
        return;
    else {
        (value === 'x') ? value = '*' : value = value
        lowerScreen.innerText += value;
    }  
}

const numberHandler = (value) => {
    let length = lowerScreen.innerText.length;
    let upperLength = upperScreen.innerText . length;
    if (lowerScreen.innerText === '0' || lowerScreen.innerText == "ERROR")
     {
        clearLowerscreen();
        lowerScreen.innerText = value;
    } else {
        lowerScreen.innerText += value;
    }
}

const clearLowerscreen = () => {
    let length = upperScreen.innerText.length;

    if (upperScreen.innerText.charAt(length - 1) === '=') {
        displayUpperScreen("Ans = " + lowerScreen.innerText)
    } 
    lowerScreen.innerText = "0";

}
