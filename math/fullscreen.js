const BUTTON = document.querySelector('button')
const IFRAME = document.querySelector('.game')

const toggleFullscreen = () => {
    IFRAME.requestFullscreen()
}

BUTTON.addEventListener('click', toggleFullscreen)