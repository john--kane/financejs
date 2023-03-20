import Finance from '../finance';

const cal = new Finance();

describe('FinanceJS', () => {
    it('should compute PV', () => {
        // 1st argument is rate; the 2nd argument is the cash flow
        expect(cal.PV(5, 100)).toBeCloseTo(95.24, 2);
    });

    it('should compute PV with num of periods', () => {
        // 1st argument is rate; the 2nd argument is the cash flow
        expect(cal.PV(5, 100, 5)).toBeCloseTo(78.35, 2);
    });

    it('should compute FV', () => {
        expect(cal.FV(0.5, 1000, 12)).toBeCloseTo(1061.68, 2);
    });

    it('should compute NPV', () => {
        expect(cal.NPV(10, -500000, 200000, 300000, 200000)).toBeCloseTo(80015.03, 2);
    });

    it('should compute IRR', () => {
        const data = {
            depth: 10000,
            cashFlow: [-6, 297, 307]
        };
        const irr = cal.IRR(data);
        // should be ~4951.29
        expect(irr).toBeGreaterThan(4951);
        expect(irr).toBeLessThan(4952);
    });

    it('should compute PP for even cash flows', () => {
        expect(cal.PP(0, -105, 25)).toBeCloseTo(4.2, 2);
    });

    it('should compute PP for uneven cash flows', () => {
        const pp = cal.PP(5, -50, 10, 13, 16, 19, 22);
        expect(pp).toBeGreaterThan(3.3);
        expect(pp).toBeLessThan(3.6);
    });

    it('should compute ROI', () => {
        expect(cal.ROI(-55000, 60000)).toBeCloseTo(9.09, 2);
    });

    it('should compute AM (Amortization) for inputs in years', () => {
        // 0 if inputs are in years
        expect(cal.AM(20000, 7.5, 5, 0)).toBeCloseTo(400.76, 2);
    });

    it('should compute AM (Amortization) for inputs in months', () => {
        // 1 if inputs are in months
        expect(cal.AM(20000, 7.5, 60, 1)).toBeCloseTo(400.76, 2);
    });

    it('should compute AM (Amortization) for inputs in years when payment is at the beginning of the month', () => {
        // 1 if inputs are in months
        expect(cal.AM(20000, 7.5, 5, 0, true)).toBeCloseTo(398.27, 2);
    });

    it('should compute AM (Amortization) for inputs in months when payment is at the beginning of the month', () => {
        // 1 if inputs are in months
        expect(cal.AM(20000, 7.5, 60, 1, true)).toBeCloseTo(398.27, 2);
    });

    it('should compute PI', function () {
        // rate, initial investment, and cash flows
        expect(cal.PI(10, [-40000, 18000, 12000, 10000, 9000, 6000])).toEqual(1.09);
    });

    it('should compute DF', function () {
        // rate and number of periods
        expect(cal.DF(10, 6)).toEqual([1, 0.91, 0.827, 0.752, 0.684]);
    });

    it('should compute CI', function () {
        // rate, compoundings per period, principal , and number of periods
        expect(cal.CI(4.3, 4, 1500, 6)).toEqual(1938.83);
    });

    it('should compute CAGR', function () {
        // begining value, Ending value, and number of periods
        expect(cal.CAGR(10000, 19500, 3)).toEqual(24.93);
    });

    it('should compute LR', function () {
        // total liabilities, total debts, and total income. Result is a ratio
        expect(cal.LR(25, 10, 20)).toEqual(1.75);
    });

    it('should compute R72', function () {
        // interest rate
        expect(cal.R72(10)).toEqual(7.2);
    });

    it('should compute WACC', function () {
        // market value of equity, market value of debt, cost of equity, cost of debt, tax rate
        expect(cal.WACC(600000, 400000, 6, 5, 35)).toEqual(4.9);
    });

    // it('should compute PMT', function () {
    //     // rate, number of payments, loan principal
    //     Number(expect(cal.PMT(2, 36, -1000000).toFixed(2)).should.equal(39232.85)
    // });

    it('should compute IAR', function () {
        //investment return, inflation rate
        expect(cal.IAR(0.08, 0.03)).toEqual(4.854368932038833);
    });


});