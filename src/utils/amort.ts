interface AmortizationSchedule {
    period: number
    beginningBalance: number
    periodPrincipal: number
    interest: number
    endingBalance: number
}

export interface Amortization {
    schedule: AmortizationSchedule[]
    termPayment: number
    totalPayment: number
    totalInterest: number
}

export const getAmortization = (principal: number, interestRate: number, terms: number): Amortization => {
    let termPayment: number = principal * (interestRate / (1 - Math.pow(1 + interestRate, -terms)))
    let totalPayment: number = termPayment * terms
    let totalInterest: number = 0

    const schedule: Array<AmortizationSchedule> = []

    for (let count = 0; count < terms; count++) {
        let interest, periodPrincipal: number = 0

        interest = principal * interestRate
        periodPrincipal = termPayment - interest
        totalInterest += interest

        schedule.push({
            period: count + 1,
            beginningBalance: principal,
            periodPrincipal,
            interest,
            endingBalance: principal - periodPrincipal
        })

        principal = principal - periodPrincipal
    }

    return {
        schedule,
        termPayment,
        totalPayment,
        totalInterest
    }
}

export const getLoanPrincipal = (termPayment: number, interestRate: number, terms: number) :number => {
    return termPayment / (interestRate / (1 - Math.pow(1 + interestRate, -terms)))
}

export const getTotalLoanPayment = (termPayment: number,terms: number) :number => {
    return termPayment * terms
}

export const getTotalLoanInterest = (totalPayment: number,principal: number) :number => {
    return totalPayment - principal
}