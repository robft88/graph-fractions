export default class GeneratedFraction {
    constructor(numerator, denominator) {
        this._numerator = numerator;
        this._denominator = denominator;
    }

    getNumerator() {
        return this._numerator;
    }

    setNumerator(numerator) {
        return this._numerator = numerator;
    }

    getDenominator() {
        return this._denominator;
    }

    setDenominator(denominator) {
        if (denominator === 0) {
            throw 'El denominador debe ser distinto de 0';
        }
        return this._denominator = denominator;
    }

    getGreatestCommonDivisor(a, b) {
        let temp;
        while (b != 0) {
            temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    simplifyFraction() {
        const gcd = this.getGreatestCommonDivisor(this.getNumerator(), this.getDenominator());
        return new GeneratedFraction(this.getNumerator() / gcd, this.getDenominator() / gcd);
    }

    toString() {
        return `${this.getNumerator()}/${this.getDenominator()}`
    }
}