const generatedNumeratorClass = '.fraction__response-numerator',
    generatedDenominatorClass = '.fraction__response-denominator',
    toggleFadeInCssClass = 'toggle-fade-in',
    isHiddenCssClass = 'is-hidden',
    isVisibleCssClass = 'is-visible',
    checkButtonClass = '.verify__button',
    buttonsClass = '.btn',
    canvasSuccessId = '#canvas-success',
    canvasErrorId = '#canvas-error',
    canvasUserId = '#canvas-user',
    fractionResponseClass = '.fraction__response',
    canvasContainerClass = '.canvas__container';

const checkButton = document.querySelector(checkButtonClass),
    generatedNumerator = document.querySelector(generatedNumeratorClass),
    generatedDenominator = document.querySelector(generatedDenominatorClass),
    buttons = document.querySelectorAll(buttonsClass),
    canvasUser = document.querySelector(canvasUserId),
    fractionResponse = document.querySelector(fractionResponseClass),
    canvasContainer = document.querySelector(canvasContainerClass),
    allButtons = document.querySelectorAll('button');

const audioSuccess = new Audio('./assets/audio/success.mp3'),
    audioError = new Audio('./assets/audio/error.mp3');

export const toggleFadeInClass = () => {
    fractionResponse.classList.add(toggleFadeInCssClass);
    canvasContainer.classList.add(toggleFadeInCssClass);
    setTimeout(() => {
        fractionResponse.classList.remove(toggleFadeInCssClass);
        canvasContainer.classList.remove(toggleFadeInCssClass);
    }, 2000);
};

export const displayGeneratedFraction = (fraction) => {
    const { numerator, denominator } = fraction;
    generatedNumerator.textContent = numerator;
    generatedDenominator.textContent = denominator;
};

export const enableControlButtons = (fraction) => {
    const { numerator, denominator } = fraction;
    if (numerator !== undefined && denominator !== undefined) return buttons.forEach(button => button.disabled = false);

};

export const disableCheckButton = (fraction) => {
    const { numerator, denominator } = fraction;
    if (numerator === 0 || denominator === 1) return checkButton.disabled = true;
    if (numerator > 0 && denominator > 1) return checkButton.disabled = false;
};

export const enableDisableAllButton = (flag) => {
    if (flag === 'disable') {
        return allButtons.forEach(button => button.disabled = true);
    }
    if (flag === 'enable') {
        return allButtons.forEach(button => button.disabled = false);
    }
};

export const printCanvas = (elementId, fraction, colors) => {
    if (elementId !== canvasUserId) canvasUser.classList.toggle(isHiddenCssClass);
    const canvasObj = {
        canvas: document.querySelector(elementId),
        ctx: document.querySelector(elementId).getContext('2d'),
        ...colors
    };
    drawCompleteRectangleGraph(canvasObj, fraction);
    drawDivisionsRectangleGraph(canvasObj, fraction);
    if (elementId !== canvasUserId) {
        playAudio(elementId);
        showHideCanvasGraph(canvasObj);
    };
};

const drawCompleteRectangleGraph = (canvasObj, fraction) => {
    const { canvas, ctx, line, fill, empty } = canvasObj
    const { numerator, denominator } = fraction;
    const { width, height } = getWidthAndHeight();
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = empty;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, width * numerator / denominator, height);
    ctx.lineWidth = 4;
    ctx.strokeStyle = line;
    ctx.rect(0, 0, width, height);
    ctx.stroke();
};

const drawDivisionsRectangleGraph = (canvasObj, fraction) => {
    const { ctx, line } = canvasObj
    const { denominator } = fraction;
    const { width, height } = getWidthAndHeight();
    for (let i = 1; i <= denominator; i++) {
        ctx.beginPath();
        ctx.moveTo(0 + (width * (i - 1) / denominator), 0);
        ctx.lineTo(0 + (width * (i - 1) / denominator), height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = line;
        ctx.stroke();
    };
};

const showHideCanvasGraph = (canvasObj) => {
    const { canvas, ctx } = canvasObj;
    const { width, height } = getWidthAndHeight();
    canvas.classList.add(isVisibleCssClass);
    setTimeout(() => {
        canvas.classList.remove(isVisibleCssClass);
        canvasUser.classList.toggle(isHiddenCssClass);
    }, 2000);
    setTimeout(() => {
        enableDisableAllButton('enable');
        ctx.clearRect(0, 0, width, height);
    }, 4000);
};

const playAudio = (elementClass) => {
    if (elementClass === canvasSuccessId) {
        audioSuccess.play();
        setTimeout(() => {
            audioSuccess.pause();
            audioSuccess.currentTime = 0;
        }, 4000);
    }

    if (elementClass === canvasErrorId) {
        audioError.play();
        setTimeout(() => {
            audioError.pause();
            audioError.currentTime = 0;
        }, 4000);
    }
};

const getWidthAndHeight = () => {
    let width = 500,
        height = 100;
    if (screen.width < 540) {
        width = screen.width * 0.9;
        height = 100;
    };
    return { width, height };
};