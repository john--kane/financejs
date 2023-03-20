export interface IFinance {
    PV(rate: number, cf1: number, numOfPeriod: number): number;
    FV(rate: number, cf0: number, numOfPeriod: number): number;
    NPV(rate: number, ...cf: number[]): number;
    IRR(cfs: CashFlow): number;
    PP(numOfPeriods: number, ...cfs: number[]): number | undefined;
    ROI(cf0: number, earnings: number): number;
    AM(principal: number, rate: number, period: number, yearOrMonth?: number, payAtBeginning?: boolean): number;
    PI(rate: number, cfs: number[]): number;
    DF(rate: number, numOfPeriods: number): number[];
    CI(rate: number, numOfCompoundings: number, principal: number, numOfPeriods: number): number;
    CAGR(beginningValue: number, endingValue: number, numOfPeriods: number): number;
    LR(totalLiabilities: number, totalDebts: number, totalIncome: number): number;
    R72(rate: number): number;
    WACC(marketValueOfEquity: number, marketValueOfDebt: number, costOfEquity: number, costOfDebt: number, taxRate: number): number;
    PMT(rate: number, numOfPayments: number, principal: number): number;
    IAR(investmentReturn: number, inflationRate: number): number;
    XIRR(cfs: number[], dts: Date[], guess: number): number;
    CAPM(rf: number, beta: number, emr: number, err: number): number;
    stockPV(g: number, ke: number, D0: number): number;
}
export interface CashFlow {
    depth: number;
    cashFlow: number[];
}
export default class Finance implements IFinance {
    /**
     * Present Value (PV) - the value of a cash flow at the beginning of the period ( Calculates the present value of a cash flow)
     * @param rate - interest rate
     * @param cf1 - cash flow at the end of the period
     * @param numOfPeriod - number of periods
     * @returns {number} - present value
     * @example PV(10, 100, 1) // 90.91
     */
    PV(rate: number, cf1: number, numOfPeriod?: number): number;
    /**
     * Future Value (FV) - the value of a cash flow at the end of the period ( Calculates the future value of a cash flow)
     * @param rate - interest rate
     * @param cf0 - cash flow at the beginning of the period
     * @param numOfPeriod - number of periods
     * @returns {number} - future value
     * @example FV(10, 100, 1) // 109.09
     */
    FV(rate: number, cf0: number, numOfPeriod?: number): number;
    /**
     *  Net Present Value (NPV) - the sum of the present values of a series of cash flows
     * @param rate - interest rate
     * @param cf - cash flows
     * @returns {number} - net present value
     * @example NPV(10, 100, 100, 100) // 259.37
     */
    NPV(rate: number, ...cf: number[]): number;
    /**
     * Internal Rate of Return (IRR) - the discount rate that makes the net present value of a series of cash flows equal to zero
     * Calculates the internal rate of return of a cash flow
     * @param cfs - cash flows
     * @returns {number} - internal rate of return
     * @example IRR(100, -100, 100) // 50
     */
    IRR(cfs: CashFlow): number;
    /**
     * Payback Period (PP) - the number of years required to recover the initial investment
     * @param numOfPeriods - number of periods
     * @param cfs - cash flows
     * @returns {number} - payback period
     */
    PP(numOfPeriods: number, ...cfs: number[]): number | undefined;
    /**
     * Return on Investment (ROI) - the percentage return on an investment
     * @param cf0 - cash flow at the beginning of the period
     * @param earnings - earnings
     * @returns {number} - return on investment
     * @example ROI(100, 100) // 0
     */
    ROI(cf0: number, earnings: number): number;
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
    AM(principal: number, rate: number, period: number, yearOrMonth?: number, payAtBeginning?: boolean): number;
    /**
     * Profitability Index (PI) - the ratio of the present value of cash inflows to the present value of cash outflows
     * @param rate - interest rate
     * @param cfs - cash flows
     * @returns {number} - profitability index
     * @example PI(10, 100, -100, 100) // 1.5 (yearly)
     */
    PI(rate: number, cfs: number[]): number;
    /**
     * Discount Factor (DF) - the present value of a future cash flow
     * @param rate - interest rate
     * @param numOfPeriods - number of periods
     * @returns {number[]} - discount factors
     */
    DF(rate: number, numOfPeriods: number): number[];
    /**
     * Compound Interest (CI) - the interest that is calculated on the principal and accumulated interest
     * @param rate - interest rate
     * @param numOfCompoundings - number of compoundings per period
     * @param principal - principal amount
     * @param numOfPeriods - number of periods
     * @returns {number} - compound interest
     * @example CI(10, 1, 100, 1) // 110 (yearly)
     */
    CI(rate: number, numOfCompoundings: number, principal: number, numOfPeriods: number): number;
    /**
     * Compound Annual Growth Rate (CAGR) - the average annual growth rate of an investment over a specified period of time
     * @param beginningValue - beginning value
     * @param endingValue - ending value
     * @param numOfPeriods - number of periods
     * @returns {number} - compound annual growth rate
     * @example CAGR(100, 200, 1) // 100 (yearly)
     */
    CAGR(beginningValue: number, endingValue: number, numOfPeriods: number): number;
    /**
     * Leverage Ratio (LR) - the ratio of total liabilities and total debts to total income
     * @param totalLiabilities - total liabilities
     * @param totalDebts - total debts
     * @param totalIncome - total income
     * @returns {number} - leverage ratio
     * @example LR(100, 100, 100) // 2
     */
    LR(totalLiabilities: number, totalDebts: number, totalIncome: number): number;
    /**
     * Rule of 72 - the number of years it takes for an investment to double at a given interest rate
     * @param rate - interest rate
     * @returns {number} - rule of 72
     */
    R72(rate: number): number;
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
    WACC(marketValueOfEquity: number, marketValueOfDebt: number, costOfEquity: number, costOfDebt: number, taxRate: number): number;
    /**
     * Loan Payment calculation - calculates the monthly payment for a loan
     * @param rate - interest rate
     * @param numOfPayments - number of payments
     * @param principal - principal amount
     * @returns {number} - loan payment
     * @example PMT(10, 12, 100) // 10
     */
    PMT(rate: number, numOfPayments: number, principal: number): number;
    /**
     * IAR calculates the Inflation-adjusted return - the return on an investment after adjusting for inflation
     * @param investmentReturn - investment return
     * @param inflationRate - inflation rate
     * @returns {number} - inflation-adjusted return
     * @example IAR(10, 10) // 0
     */
    IAR(investmentReturn: number, inflationRate: number): number;
    /**
     * XIRR - IRR for irregular intervals
     * @param cfs - cash flows
     * @param dts - dates
     * @param guess - guess for XIRR
     * @returns {number} - The internal rate of return (IRR) for a series of cash flows that occur at irregular intervals.
     */
    XIRR(cfs: number[], dts: Date[], guess?: number): number;
    /**
     * CAPM calculates expected return of an asset.
     * @param rf Risk-free rate of return
     * @param beta Beta of the asset
     * @param emr Expected market return
     * @param err Equity risk premium
     * @returns Expected return of an asset using the Capital Asset Pricing Model (CAPM).
     * @example CAPM(10, 10, 10, 10) // 10
     */
    CAPM(rf: number, beta: number, emr: number, err: number): number;
    /**
     * Returns the Value of stock with dividend growing at a constant growth rate to perpetuity.
     * @param g - growth rate
     * @param ke - cost of equity
     * @param D0 - dividend
     * @returns {number} - value of stock
     * @example stockPV(10, 10, 10) // 10
     */
    stockPV(g: number, ke: number, D0: number): number;
    private durYear;
    private sumEq;
    /**
     * Seek zero of a function
     * @param fn - function to find zero
     * @returns {number} - zero
     */
    private seekZero;
}
