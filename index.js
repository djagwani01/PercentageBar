const mainBar = document.querySelector('.mainBar');
const loadingBtn = document.getElementById('btnContainer').children[0];

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
    loadingBtn.style.backgroundColor = 'rgba(0, 120, 0, 1)'
    setTimeout(() => {
        loadingBtn.style.backgroundColor = 'rgba(0, 150, 0, 1)'
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


    const loadingInterval = setInterval(() => {
        if(percentageBarWidth < targetWidth){
            percentageBarWidth += 50
            percentageBar.style.width = `${percentageBarWidth}px`
            percentageElement.innerHTML = `${String(getPercentage(percentageBarWidth, targetWidth))}%`
        } else{
            clearInterval(loadingInterval)
        }
    }, 500)
}

loadingBtn.addEventListener('click', startLoading)