export default class UserFraction {
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
        return new UserFraction(this.getNumerator() / gcd, this.getDenominator() / gcd);
    }
}