import React, {ChangeEventHandler} from 'react';
import {Amortization, getAmortization} from "./utils/amort";

export const App: React.FunctionComponent<{}> = (props) => {
    const [loanAmount, setLoanAmount] = React.useState<string | undefined>(undefined)
    const [interestRate, setInterestRate] = React.useState<string | undefined>(undefined)
    const [periodCount, setPeriodCount] = React.useState<string | undefined>(undefined)
    const [amortization, setAmortization] = React.useState<Amortization | undefined>(undefined);

    const handleLoanAmount = React.useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        if (/^[1-9][0-9]*$/.test(e.target.value)) {
            setLoanAmount(e.target.value)
        }
    }, [])

    const handleInterestRate = React.useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        if (/^[0-9]{1,2}((\.)+[0-9]{0,2})?$/.test(e.target.value)) {
            setInterestRate(e.target.value)
        }
    }, [])

    const handlePeriodCount = React.useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        if (/^[0-9]*$/.test(e.target.value)) {
            setPeriodCount(e.target.value)
        }
    }, [])

    React.useEffect(() => {
        if (loanAmount && interestRate && periodCount) {
            setAmortization(getAmortization(parseFloat(loanAmount), parseFloat(interestRate) / 100, parseInt(periodCount)))
        }
    }, [loanAmount, interestRate, periodCount])

    return (
        <div style={{
            padding: 8
        }}>

            <fieldset>
                <legend>Loan Parameters</legend>
                <label htmlFor={"loan_amount"}>Principal Amount</label><br/>
                <input type={"text"} name={"loan_amount"} id={"loan_amount"} value={loanAmount}
                       onChange={handleLoanAmount}/>
                <br/><br/>
                <label htmlFor={"interest_rate"}>Interest Rate (%)</label><br/>
                <input type={"text"} name={"interest_rate"} id={"interest_rate"} value={interestRate}
                       onChange={handleInterestRate}/>
                <br/><br/>
                <label htmlFor={"period_count"}>Terms (Months)</label><br/>
                <input type={"text"} name={"period_count"} id={"period_count"} value={periodCount}
                       onChange={handlePeriodCount}/>
            </fieldset>

            {amortization &&
                <>
                    <div style={{
                        padding: 8
                    }}>
                        <div className={"monthlyPaymentBar"}>
                            Estimated Monthly Payment Amount : {amortization.termPayment.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                        </div>
                    </div>

                    <div style={{
                        padding: 8
                    }}>
                        <table>
                            <thead>
                            <tr>
                                <th>Period Count</th>
                                <th className={"beginningBalanceHeader"}>Beginning Balance</th>
                                <th className={"principalInterestHeader"}>Principal</th>
                                <th className={"principalInterestHeader"}>Interest</th>
                                <th className={"endingBalanceHeader"}>Ending Balance</th>
                            </tr>
                            </thead>
                            <tbody>
                            {amortization.schedule.map((value, index) => (
                                <tr key={index}>
                                    <td>{value.period}</td>
                                    <td>{value.beginningBalance.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</td>
                                    <td>{value.periodPrincipal.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</td>
                                    <td>{value.interest.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</td>
                                    <td>{value.endingBalance.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }

        </div>
    );
}

export default App;
