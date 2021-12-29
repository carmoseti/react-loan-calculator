import React from 'react'
import {Routes, Route} from "react-router-dom"
import {LoanAmortization} from "./pages/LoanAmortization"
import {LoanPrincipal} from "./pages/LoanPrincipal"

export const App: React.FunctionComponent<{}> = (props) => {
    return (
        <Routes>
            <Route path={"/"} element={<LoanAmortization/>}/>
            <Route path={"/loanPrincipal"} element={<LoanPrincipal/>}/>
        </Routes>
    );
}