import React, {ChangeEventHandler, FunctionComponent} from 'react'
import {Link} from "react-router-dom"
import {getLoanPrincipal, getTotalLoanInterest, getTotalLoanPayment} from "../utils/amort";

export const LoanPrincipal: FunctionComponent<{}> = (props) => {
    const [termAmount, setTermAmount] = React.useState<string | undefined>(undefined)
    const [interestRate, setInterestRate] = React.useState<string | undefined>(undefined)
    const [periodCount, setPeriodCount] = React.useState<string | undefined>(undefined)
    const [loanPrincipal, setLoanPrincipal] = React.useState<number | undefined>(undefined);
    const [totalPayment, setTotalPayment] = React.useState<number | undefined>(undefined);
    const [totalInterest, setTotalInterest] = React.useState<number | undefined>(undefined);

    const handleTermAmount = React.useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        if (/^[0-9]*$/.test(e.target.value) && e.target.value !== "0") {
            setTermAmount(e.target.value)
        }
    }, [])

    const handleInterestRate = React.useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        if (/^[0-9]{1,2}((\.)+[0-9]{0,2})?$/.test(e.target.value)) {
            setInterestRate(e.target.value)
        }
    }, [])

    const handlePeriodCount = React.useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        if (/^[0-9]*$/.test(e.target.value) && e.target.value !== "0") {
            setPeriodCount(e.target.value)
        }
    }, [])

    React.useEffect(() => {
        if (termAmount && interestRate && periodCount) {
            setLoanPrincipal(getLoanPrincipal(Number(termAmount), Number(interestRate) / 100, Number(periodCount)))
            setTotalPayment(getTotalLoanPayment(Number(termAmount), Number(periodCount)))
        } else {
            setLoanPrincipal(undefined)
            setTotalPayment(undefined)
        }
    }, [termAmount, interestRate, periodCount])

    React.useEffect(() => {
        if (loanPrincipal && totalPayment) {
            setTotalInterest(getTotalLoanInterest(Number(totalPayment), Number(loanPrincipal)))
        } else {
            setTotalInterest(undefined)
        }
    }, [loanPrincipal, totalPayment]);

    return (
        <div style={{
            padding: 8
        }}>
            <div style={{marginBottom: 16}}>
                <Link to={"/"}>Loan Amortization Calculator</Link>
            </div>

            <fieldset>
                <legend>Loan Principal Parameters</legend>
                <label htmlFor={"term_amount"}>Termly Payment Amount</label><br/>
                <input type={"text"} name={"term_amount"} id={"term_amount"} value={termAmount}
                       onChange={handleTermAmount}/>
                <br/><br/>
                <label htmlFor={"interest_rate"}>Interest Rate (%)</label><br/>
                <input type={"text"} name={"interest_rate"} id={"interest_rate"} value={interestRate}
                       onChange={handleInterestRate}/>
                <br/><br/>
                <label htmlFor={"period_count"}>Terms (Months)</label><br/>
                <input type={"text"} name={"period_count"} id={"period_count"} value={periodCount}
                       onChange={handlePeriodCount}/>
            </fieldset>

            {loanPrincipal && totalPayment && totalInterest &&
                <>
                    <div style={{
                        padding: 8
                    }}>
                        <div className={"primaryInfoBar"}>
                            Estimated Maximum Loan Amount : {loanPrincipal.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        </div>
                    </div>
                    <div style={{
                        padding: 8
                    }}>
                        <div className={"secondaryInfoBar"}>
                            Total Payment Amount after {periodCount} Terms : {totalPayment.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        </div>
                        <div className={"secondaryInfoBar"}>
                            Total Interest after {periodCount} Terms : {totalInterest.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        </div>
                    </div>
                </>
            }

        </div>
    )
}
