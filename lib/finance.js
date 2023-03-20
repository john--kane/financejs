"use strict";
// convert https://raw.githubusercontent.com/ebradyjobory/finance.js/master/finance.js to typescript
Object.defineProperty(exports, "__esModule", { value: true });
var Finance = /** @class */ (function () {
    function Finance() {
    }
    /**
     * Present Value (PV) - the value of a cash flow at the beginning of the period ( Calculates the present value of a cash flow)
     * @param rate - interest rate
     * @param cf1 - cash flow at the end of the period
     * @param numOfPeriod - number of periods
     * @returns {number} - present value
     * @example PV(10, 100, 1) // 90.91
     */
    Finance.prototype.PV = function (rate, cf1, numOfPeriod) {
        if (numOfPeriod === void 0) { numOfPeriod = 1; }
        var pv = cf1 / Math.pow((1 + rate / 100), numOfPeriod);
        return Math.round(pv * 100) / 100;
    };
    /**
     * Future Value (FV) - the value of a cash flow at the end of the period ( Calculates the future value of a cash flow)
     * @param rate - interest rate
     * @param cf0 - cash flow at the beginning of the period
     * @param numOfPeriod - number of periods
     * @returns {number} - future value
     * @example FV(10, 100, 1) // 109.09
     */
    Finance.prototype.FV = function (rate, cf0, numOfPeriod) {
        if (numOfPeriod === void 0) { numOfPeriod = 1; }
        var fv = cf0 * Math.pow((1 + rate / 100), numOfPeriod);
        return Math.round(fv * 100) / 100;
    };
    /**
     *  Net Present Value (NPV) - the sum of the present values of a series of cash flows
     * @param rate - interest rate
     * @param cf - cash flows
     * @returns {number} - net present value
     * @example NPV(10, 100, 100, 100) // 259.37
     */
    Finance.prototype.NPV = function (rate) {
        var cf = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cf[_i - 1] = arguments[_i];
        }
        var npv = cf[0];
        rate /= 100;
        for (var i = 1; i < cf.length; i++) {
            npv += cf[i] / Math.pow((1 + rate), i);
        }
        return Math.round(npv * 100) / 100;
    };
    /**
     * Internal Rate of Return (IRR) - the discount rate that makes the net present value of a series of cash flows equal to zero
     * Calculates the internal rate of return of a cash flow
     * @param cfs - cash flows
     * @returns {number} - internal rate of return
     * @example IRR(100, -100, 100) // 50
     */
    Finance.prototype.IRR = function (cfs) {
        var depth = cfs.depth, cashFlow = cfs.cashFlow;
        var numberOfTries = 1;
        // Cash flow values must contain at least one positive value and one negative value
        var positive = false;
        var negative = false;
        cashFlow.forEach(function (value) {
            if (value > 0)
                positive = true;
            if (value < 0)
                negative = true;
        });
        if (!positive || !negative) {
            throw new Error('IRR requires at least one positive value and one negative value');
        }
        function npv(rate) {
            numberOfTries++;
            if (numberOfTries > depth) {
                throw new Error("IRR can't find a result");
            }
            var rrate = 1 + rate / 100;
            var npv = cashFlow[0];
            for (var i = 1; i < cashFlow.length; i++) {
                npv += cashFlow[i] / Math.pow(rrate, i);
            }
            return npv;
        }
        return Math.round(this.seekZero(npv) * 100) / 100;
    };
    /**
     * Payback Period (PP) - the number of years required to recover the initial investment
     * @param numOfPeriods - number of periods
     * @param cfs - cash flows
     * @returns {number} - payback period
     */
    Finance.prototype.PP = function (numOfPeriods) {
        var cfs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cfs[_i - 1] = arguments[_i];
        }
        // for even cash flows
        if (numOfPeriods === 0) {
            return Math.abs(cfs[0]) / cfs[1];
        }
        // for uneven cash flows
        var cumulativeCashFlow = cfs[0];
        var yearsCounter = 1;
        for (var i = 1; i < cfs.length; i++) {
            cumulativeCashFlow += cfs[i];
            if (cumulativeCashFlow > 0) {
                yearsCounter += (cumulativeCashFlow - cfs[i]) / cfs[i];
                return yearsCounter;
            }
            else {
                yearsCounter++;
            }
        }
    };
    /**
     * Return on Investment (ROI) - the percentage return on an investment
     * @param cf0 - cash flow at the beginning of the period
     * @param earnings - earnings
     * @returns {number} - return on investment
     * @example ROI(100, 100) // 0
     */
    Finance.prototype.ROI = function (cf0, earnings) {
        var roi = (earnings - Math.abs(cf0)) / Math.abs(cf0) * 100;
        return Math.round(roi * 100) / 100;
    };
    /**
     * Amortization - the process of paying off a debt (loan) over a period of time through regular payments
     * @param principal - principal amount
     * @param rate - interest rate
     * @param period - number of periods
     * @param yearOrMonth - 1 - year, 0 - month
     * @param payAtBeginning - true - pay at the beginning of the period, false - pay at the end of the period
     * @returns {number} - amortization
     * @example AM(100, 10, 1, 1, true) // 8.33 (yearly, pay at the beginning of the period)
     */
    Finance.prototype.AM = function (principal, rate, period, yearOrMonth, payAtBeginning) {
        var ratePerPeriod = rate / 12 / 100;
        var numerator, denominator;
        if (!yearOrMonth) {
            numerator = buildNumerator(period * 12);
            denominator = Math.pow(1 + ratePerPeriod, period * 12) - 1;
        }
        else if (yearOrMonth === 1) {
            numerator = buildNumerator(period);
            denominator = Math.pow(1 + ratePerPeriod, period) - 1;
        }
        else {
            console.log("not defined");
            return 0;
        }
        var am = principal * (numerator / denominator);
        return Math.round(am * 100) / 100;
        function buildNumerator(numInterestAccruals) {
            if (payAtBeginning) {
                numInterestAccruals -= 1;
            }
            return ratePerPeriod * Math.pow(1 + ratePerPeriod, numInterestAccruals);
        }
    };
    ;
    /**
     * Profitability Index (PI) - the ratio of the present value of cash inflows to the present value of cash outflows
     * @param rate - interest rate
     * @param cfs - cash flows
     * @returns {number} - profitability index
     * @example PI(10, 100, -100, 100) // 1.5 (yearly)
     */
    Finance.prototype.PI = function (rate, cfs) {
        var totalOfPVs = 0;
        for (var i = 1; i < cfs.length; i++) {
            var discountFactor = 1 / Math.pow(1 + rate / 100, i);
            totalOfPVs += cfs[i] * discountFactor;
        }
        var PI = totalOfPVs / Math.abs(cfs[0]);
        return Math.round(PI * 100) / 100;
    };
    ;
    /**
     * Discount Factor (DF) - the present value of a future cash flow
     * @param rate - interest rate
     * @param numOfPeriods - number of periods
     * @returns {number[]} - discount factors
     */
    Finance.prototype.DF = function (rate, numOfPeriods) {
        var dfs = new Array(numOfPeriods - 1);
        var onePlusRate = 1 + rate / 100;
        for (var i = 1; i < numOfPeriods; i++) {
            var discountFactor = 1 / Math.pow(onePlusRate, i - 1);
            var roundedDiscountFactor = Math.ceil(discountFactor * 1000) / 1000;
            dfs[i - 1] = roundedDiscountFactor;
        }
        return dfs;
    };
    ;
    /**
     * Compound Interest (CI) - the interest that is calculated on the principal and accumulated interest
     * @param rate - interest rate
     * @param numOfCompoundings - number of compoundings per period
     * @param principal - principal amount
     * @param numOfPeriods - number of periods
     * @returns {number} - compound interest
     * @example CI(10, 1, 100, 1) // 110 (yearly)
     */
    Finance.prototype.CI = function (rate, numOfCompoundings, principal, numOfPeriods) {
        var ratePerCompounding = (rate / 100) / numOfCompoundings;
        var onePlusRatePerCompounding = 1 + ratePerCompounding;
        var compoundings = numOfCompoundings * numOfPeriods;
        var CI = principal * Math.pow(onePlusRatePerCompounding, compoundings);
        return ((CI * 100) | 0) / 100;
    };
    ;
    /**
     * Compound Annual Growth Rate (CAGR) - the average annual growth rate of an investment over a specified period of time
     * @param beginningValue - beginning value
     * @param endingValue - ending value
     * @param numOfPeriods - number of periods
     * @returns {number} - compound annual growth rate
     * @example CAGR(100, 200, 1) // 100 (yearly)
     */
    Finance.prototype.CAGR = function (beginningValue, endingValue, numOfPeriods) {
        var power = 1 / numOfPeriods;
        var CAGR = Math.pow(endingValue / beginningValue, power) - 1;
        return Math.round(CAGR * 10000) / 100;
    };
    ;
    /**
     * Leverage Ratio (LR) - the ratio of total liabilities and total debts to total income
     * @param totalLiabilities - total liabilities
     * @param totalDebts - total debts
     * @param totalIncome - total income
     * @returns {number} - leverage ratio
     * @example LR(100, 100, 100) // 2
     */
    Finance.prototype.LR = function (totalLiabilities, totalDebts, totalIncome) {
        return (totalLiabilities + totalDebts) / totalIncome;
    };
    ;
    /**
     * Rule of 72 - the number of years it takes for an investment to double at a given interest rate
     * @param rate - interest rate
     * @returns {number} - rule of 72
     */
    Finance.prototype.R72 = function (rate) {
        return 72 / rate;
    };
    /**
     * Weighted Average Cost of Capital (WACC) - the weighted average of the cost of all the capital sources of a firm
     * @param marketValueOfEquity  - market value of equity
     * @param marketValueOfDebt - market value of debt
     * @param costOfEquity - cost of equity
     * @param costOfDebt -  cost of debt
     * @param taxRate - tax rate
     * @returns {number} - weighted average cost of capital
     * @example WACC(100, 100, 10, 10, 10) // 10
     */
    Finance.prototype.WACC = function (marketValueOfEquity, marketValueOfDebt, costOfEquity, costOfDebt, taxRate) {
        var E = marketValueOfEquity;
        var D = marketValueOfDebt;
        var V = marketValueOfEquity + marketValueOfDebt;
        var Re = costOfEquity;
        var Rd = costOfDebt;
        var T = taxRate;
        var WACC = (E / V) * (Re / 100) + (D / V) * (Rd / 100) * (1 - T / 100);
        return Math.round(WACC * 1000) / 10;
    };
    /**
     * Loan Payment calculation - calculates the monthly payment for a loan
     * @param rate - interest rate
     * @param numOfPayments - number of payments
     * @param principal - principal amount
     * @returns {number} - loan payment
     * @example PMT(10, 12, 100) // 10
     */
    Finance.prototype.PMT = function (rate, numOfPayments, principal) {
        var monthlyRate = rate / 1200;
        var pmt = -(principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numOfPayments));
        return Math.round(pmt * 100) / 100;
    };
    ;
    /**
     * IAR calculates the Inflation-adjusted return - the return on an investment after adjusting for inflation
     * @param investmentReturn - investment return
     * @param inflationRate - inflation rate
     * @returns {number} - inflation-adjusted return
     * @example IAR(10, 10) // 0
     */
    Finance.prototype.IAR = function (investmentReturn, inflationRate) {
        return 100 * (((1 + investmentReturn) / (1 + inflationRate)) - 1);
    };
    ;
    /**
     * XIRR - IRR for irregular intervals
     * @param cfs - cash flows
     * @param dts - dates
     * @param guess - guess for XIRR
     * @returns {number} - The internal rate of return (IRR) for a series of cash flows that occur at irregular intervals.
     */
    Finance.prototype.XIRR = function (cfs, dts, guess) {
        if (guess === void 0) { guess = 0; }
        if (cfs.length !== dts.length) {
            throw new Error('Number of cash flows and dates should match');
        }
        var positive = false, negative = false;
        for (var _i = 0, cfs_1 = cfs; _i < cfs_1.length; _i++) {
            var value = cfs_1[_i];
            if (value > 0) {
                positive = true;
            }
            if (value < 0) {
                negative = true;
            }
        }
        if (!positive || !negative) {
            throw new Error('XIRR requires at least one positive value and one negative value');
        }
        var limit = 100; // loop limit
        var guessLast;
        var durs = [0];
        // Create Array of durations from First date
        for (var i = 1; i < dts.length; i++) {
            durs.push(this.durYear(dts[0], dts[i]));
        }
        do {
            guessLast = guess;
            guess = guessLast - this.sumEq(cfs, durs, guessLast);
            limit--;
        } while (guessLast.toFixed(5) !== guess.toFixed(5) && limit > 0);
        var xirr = guessLast.toFixed(5) !== guess.toFixed(5) ? null : guess * 100;
        if (xirr === null) {
            throw new Error('XIRR did not converge');
        }
        return Math.round(xirr * 100) / 100;
    };
    /**
     * CAPM calculates expected return of an asset.
     * @param rf Risk-free rate of return
     * @param beta Beta of the asset
     * @param emr Expected market return
     * @param err Equity risk premium
     * @returns Expected return of an asset using the Capital Asset Pricing Model (CAPM).
     * @example CAPM(10, 10, 10, 10) // 10
     */
    Finance.prototype.CAPM = function (rf, beta, emr, err) {
        return rf / 100 + beta * (emr / 100 - rf / 100) + err / 100;
    };
    /**
     * Returns the Value of stock with dividend growing at a constant growth rate to perpetuity.
     * @param g - growth rate
     * @param ke - cost of equity
     * @param D0 - dividend
     * @returns {number} - value of stock
     * @example stockPV(10, 10, 10) // 10
     */
    Finance.prototype.stockPV = function (g, ke, D0) {
        var valueOfStock = (D0 * (1 + g / 100)) / ((ke / 100) - (g / 100));
        return Math.round(valueOfStock);
    };
    Finance.prototype.durYear = function (date1, date2) {
        var day = 24 * 60 * 60 * 1000;
        var diffDays = Math.round(Math.abs((date2.getTime() - date1.getTime()) / day));
        return diffDays / 365;
    };
    Finance.prototype.sumEq = function (cfs, durs, guess) {
        var sum_fx = 0;
        var sum_fdx = 0;
        for (var i = 0; i < cfs.length; i++) {
            sum_fx = sum_fx + (cfs[i] / Math.pow(1 + guess, durs[i]));
        }
        for (i = 0; i < cfs.length; i++) {
            sum_fdx = sum_fdx + (-cfs[i] * durs[i] * Math.pow(1 + guess, -1 - durs[i]));
        }
        return sum_fx / sum_fdx;
    };
    /**
     * Seek zero of a function
     * @param fn - function to find zero
     * @returns {number} - zero
     */
    Finance.prototype.seekZero = function (fn) {
        var x = 1;
        while (fn(x) > 0) {
            x += 1;
        }
        while (fn(x) < 0) {
            x -= 0.01;
        }
        return x + 0.01;
    };
    return Finance;
}());
exports.default = Finance;
