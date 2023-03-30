let passwordLength = 16
const inputEl = document.querySelector('#password')
const upperChaseCheckEl = document.querySelector('#uppercase-check'),
    numberCheck = document.querySelector('#number-check'),
    symbolsCheck = document.querySelector('#symbols-check'),
    passLengthT = document.querySelector('#password-length-text'),
    passwordLengthEl = document.querySelector('#password-lenght'),
    securityIndicator = document.querySelector('#security-indicator-bar');
function generatePassword() {
    let chars = 'abcdefghjklmnpqrstuvwxyz'
    const upperChaseChars = 'ABCDEFGHKLMNPQRSTUVWXYZ'
    const numberChars = '123456789'
    const symbolsChars = '?!@&"*()[]'
    let password = ''

    if (upperChaseCheckEl.checked) {
        chars += upperChaseChars
    }

    if (numberCheck.checked) {
        chars += numberChars
    }

    if (symbolsCheck.checked) {
        chars += symbolsChars
    }


    for (i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }


    inputEl.value = password
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round((passwordLength / 64) * 25 +
        (upperChaseCheckEl.checked ? 15 : 0) +
        (numberCheck.checked ? 25 : 0) +
        (symbolsCheck.checked ? 35 : 0))
    securityIndicator.style.width = `${percent}%`
    if(percent > 69) {
        securityIndicator.classList.add('safe')
        securityIndicator.classList.remove('warning')
        securityIndicator.classList.remove('critical')
    } else if (percent > 50) {
        securityIndicator.classList.add('warning')
        securityIndicator.classList.remove('safe')
        securityIndicator.classList.remove('critical')
    } else { 
        securityIndicator.classList.add('critical')
        securityIndicator.classList.remove('warning')
        securityIndicator.classList.remove('safe')
    }
    if(percent >=100) {
        securityIndicator.classList.add('completed')
    } else {
        securityIndicator.classList.remove('completed')
    }
}

function calculateFontSize() {
    if(passwordLength > 45) {
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-sm')
        inputEl.classList.add('font-xxs')
    } else if (passwordLength > 32) {
        inputEl.classList.remove('font-xxs')
        inputEl.classList.remove('font-sm')
        inputEl.classList.add('font-xs')
    } else if (passwordLength > 22) {
        inputEl.classList.remove('font-xxs')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-sm')
    } else {

    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

passwordLengthEl.addEventListener('input', () => {
    passwordLength = passwordLengthEl.value
    passLengthT.innerText = passwordLength
    generatePassword()

})
generatePassword()