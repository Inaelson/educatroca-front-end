var body = document.querySelector('body')
var defaultFont = 17

function increaseFont() {
    body.style.fontSize = (defaultFont + 'px')
     return defaultFont++
}

function decreaseFont() {
    body.style.fontSize = (defaultFont + 'px')
     if (defaultFont >= 13){
        return defaultFont--
     }
}

function applyContrast() {
    if (body.className == ''){
        body.className = 'contrast'
    } else {
        body.className = ''
    }
}