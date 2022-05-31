import GeneratedFraction from "./js/GeneratedFraction.js";
import UserFraction from "./js/UserFraction.js";
import { enableDisableAllButton, enableControlButtons, disableCheckButton, displayGeneratedFraction, printCanvas, toggleFadeInClass } from "./js/domFunctions.js";

import style from "./css/style.css";
import errorWav from "./assets/audio/error.mp3";
import successMp3 from "./assets/audio/success.mp3";

const generatedFraction = new GeneratedFraction();
const userFraction = new UserFraction();

const buttonFractionGeneratorClass = '.fraction__button',
    buttonIncreaseNumeratorClass = '.btn-increaseNumerator',
    buttonDecreaseNumeratorClass = '.btn-decreaseNumerator',
    buttonIncreaseDenominatorClass = '.btn-increaseDenominator',
    buttonDecreaseDenominatorClass = '.btn-decreaseDenominator',
    buttonCheckClass = '.verify__button',
    canvasUserId = '#canvas-user',
    canvasSuccessId = '#canvas-success',
    canvasErrorId = '#canvas-error';

let numerator = 0,
    denominator = 1;

const initApp = () => {
    generateFractionGraph();
    document.addEventListener('click', (e) => buttonsAction(e));
};

const buttonsAction = (e) => {
    if (e.target.matches(buttonFractionGeneratorClass)) {
        toggleFadeInClass();
        toggleGeneratorAndControlButton();
        setTimeout(() => {
            generateFraction();
            generateFractionGraph();
        }, 1000);
    };
    if (e.target.matches(buttonIncreaseNumeratorClass)) {
        setUserNumeratorAndDisplayGraph(++numerator);
    };
    if (e.target.matches(buttonDecreaseNumeratorClass)) {
        setUserNumeratorAndDisplayGraph(--numerator);
    };
    if (e.target.matches(buttonIncreaseDenominatorClass)) {
        setUserDenominatorAndDisplayGraph(++denominator);
    };
    if (e.target.matches(buttonDecreaseDenominatorClass)) {
        setUserDenominatorAndDisplayGraph(--denominator);
    };
    if (e.target.matches(buttonCheckClass)) {
        enableDisableAllButton('disable');
        checkFractionsAreEqualsAndDisplay();
    };
};


const toggleGeneratorAndControlButton = () => {
    const btn = document.querySelector(buttonFractionGeneratorClass);
    enableDisableAllButton('disable');
    setTimeout(() => {
        checkGeneratedFractionAvailable();
        btn.disabled = false;
    }, 2000);
}

const checkGeneratedFractionAvailable = () => {
    const fraction = {
        numerator: generatedFraction.getNumerator(),
        denominator: generatedFraction.getDenominator()
    };
    enableControlButtons(fraction);
};

const setUserNumeratorAndDisplayGraph = (num) => {
    let fraction = getUserFraction();
    disableCheckButton(fraction);

    if (num >= 10) numerator--;
    if (num < 0) numerator++;
    userFraction.setNumerator(numerator);
    generateFractionGraph();

    fraction = getUserFraction();
    disableCheckButton(fraction);
};

const setUserDenominatorAndDisplayGraph = (num) => {
    let fraction = getUserFraction();
    disableCheckButton(fraction);

    if (num >= 11) denominator--;
    if (num < 1) denominator++;
    userFraction.setDenominator(denominator);
    generateFractionGraph();

    fraction = getUserFraction();
    disableCheckButton(fraction);
};

const initUserFractionAndDisplayGraph = () => {
    numerator = 0;
    denominator = 1;
    userFraction.setNumerator(numerator);
    userFraction.setDenominator(denominator);
    const fraction = {
        numerator: userFraction.getNumerator(),
        denominator: userFraction.getDenominator()
    };
    disableCheckButton(fraction);
};


const generateFraction = () => {
    initUserFractionAndDisplayGraph();
    generateRandomFraction();
};

const generateRandomFraction = () => {
    const numerator = Math.floor(Math.random() * (10 - 2)) + 1,
        denominator = Math.floor(Math.random() * (11 - 2)) + 2;

    if (numerator > denominator) setFraction(denominator, numerator);
    if (numerator < denominator) setFraction(numerator, denominator);
    if (numerator === denominator) setFraction((numerator - 1), denominator);
};

const setFraction = (numerator, denominator) => {
    generatedFraction.setNumerator(numerator);
    generatedFraction.setDenominator(denominator);

    const fraction = {
        numerator: generatedFraction.simplifyFraction().getNumerator(),
        denominator: generatedFraction.simplifyFraction().getDenominator()
    };
    displayGeneratedFraction(fraction);
};


const checkFractionsAreEqualsAndDisplay = () => {
    const checkFraction = {
        genNumerator: generatedFraction.simplifyFraction().getNumerator(),
        genDenominator: generatedFraction.simplifyFraction().getDenominator(),
        userNumerator: userFraction.simplifyFraction().getNumerator(),
        userDenominator: userFraction.simplifyFraction().getDenominator()
    };
    displayResult(checkFraction);
};

const displayResult = (fractions) => {
    const { genNumerator, userNumerator, genDenominator, userDenominator } = fractions;
    if (genNumerator === userNumerator && genDenominator === userDenominator) {
        successResult();
    } else {
        errorResult();
    }
};

const generateFractionGraph = () => {
    const fraction = getUserFraction();
    const colors = setColorsCanvas('#006699', '#40b2fc', '#40b2fc40');
    printCanvas(canvasUserId, fraction, colors);
};

const errorResult = () => {
    const fraction = getUserFraction();
    const colors = setColorsCanvas('#a23133', '#ff5a5f', '#e15a5f40');
    printCanvas(canvasErrorId, fraction, colors);
};

const successResult = () => {
    const fraction = getUserFraction();
    const colors = setColorsCanvas('#38a319', '#7ac43d', '#7ac43d40');
    printCanvas(canvasSuccessId, fraction, colors);
};

const getUserFraction = () => {
    return {
        numerator: userFraction.getNumerator() || 0,
        denominator: userFraction.getDenominator() || 1
    }
};

const setColorsCanvas = (line, fill, empty) => {
    return { line, fill, empty };
}

document.addEventListener('DOMContentLoaded', initApp);