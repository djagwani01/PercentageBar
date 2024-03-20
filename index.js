const constants = {
    START: 'start',
    RESET: 'reset'
}

let reset = false,
    isLoading = false

const mainBar = document.querySelector('.mainBar');
const btnContainer = document.getElementById('btnContainer')

const percentageBar = document.createElement('div');
percentageBar.setAttribute('id', 'percentageBar');

const percentageElement = document.createElement('div');
const percentageComplete = document.createTextNode('0%');

(() => {
    percentageElement.appendChild(percentageComplete);
    const percentageElementStyles = {
        width: 'inherit',
        height: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        position: 'absolute',
        fontWeight: '500',
        zIndex: 10
    }

    Object.assign(percentageElement.style, percentageElementStyles)

    mainBar.appendChild(percentageElement)
})()

const getPercentage = (initialValue, targetValue) => {
    return Math.floor((initialValue/targetValue)*100)
}

const startLoading = () => {
    btnContainer.children[0].style.backgroundColor = 'rgba(0, 120, 0, 1)'
    setTimeout(() => {
        btnContainer.children[0].style.backgroundColor = 'rgba(0, 150, 0, 1)'
    }, 200)

    const mainBarStyles = getComputedStyle(mainBar)
    const percentageBarStyles = {
        height: mainBarStyles.height,
        borderRadius: '19px 19px',
        backgroundColor: 'rgba(0, 150, 0, 1)',
        position: 'absolute'
    }

    Object.assign(percentageBar.style, percentageBarStyles)
    percentageBar.parentNode === null ? mainBar.appendChild(percentageBar) : null

    let percentageBarWidth = 0,
        targetWidth = Number(mainBarStyles.width.split('px')[0])

    const loadingInterval = !isLoading && setInterval(() => {
        isLoading = true
        if(reset){
            clearInterval(loadingInterval)
            reset = false
            isLoading = false
            return
        } else {
            if(percentageBarWidth < targetWidth){
                percentageBarWidth += 50
                percentageBar.style.width = `${percentageBarWidth}px`
                percentageElement.innerHTML = `${String(getPercentage(percentageBarWidth, targetWidth))}%`
            } else{
                clearInterval(loadingInterval)
                isLoading = false
            }
        }
    }, 500)
}

const resetLoading = () => {
    reset = Number(percentageElement.innerHTML.split('%')[0]) !== 100 ? true : false
    btnContainer.children[1].style.backgroundColor = 'rgba(0, 120, 0, 1)'
    setTimeout(() => {
        btnContainer.children[1].style.backgroundColor = 'rgba(0, 150, 0, 1)'
    }, 200)
    percentageBar.style.width = 0
    percentageElement.innerHTML = `0%`
}

const btnAction = (e) => {
    e.target['id'] === constants.START ? startLoading() : resetLoading()
}

btnContainer.addEventListener('click', btnAction)