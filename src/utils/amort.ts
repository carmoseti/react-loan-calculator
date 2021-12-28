interface AmortizationSchedule {
    period: number
    beginningBalance: number
    periodPrincipal: number
    interest: number
    endingBalance: number
}

export interface Amortization {
    termPayment :number
    schedule: AmortizationSchedule[]
}

export const getAmortization = (principal: number, interestRate: number, terms: number) :Amortization => {
    let termPayment: number = principal * (interestRate / (1 - Math.pow(
        1 + interestRate, -terms)))

    const schedule: Array<AmortizationSchedule> = []

    for (let count = 0; count < terms; count++) {
        let interest, periodPrincipal: number = 0

        interest = principal * interestRate
        periodPrincipal = termPayment - interest

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
        termPayment,
        schedule
    }
}