import { useState } from "react";
import "./EMICalculator.css";
import generateEMIPDF from "../utils/generateEMIPDF";

function EMICalculator({ propertyTitle, propertyPrice }) {

    const [downPayment, setDownPayment] = useState(0);
    const [interestRate, setInterestRate] = useState(8);
    const [loanYears, setLoanYears] = useState(20);




    const loanAmount = Number(propertyPrice) - Number(downPayment);

    const monthlyRate = Number(interestRate) / 12 / 100;

    const months = Number(loanYears) * 12;

    let monthlyEMI = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (loanAmount > 0 && monthlyRate > 0 && months > 0) {

        monthlyEMI =
            (
                loanAmount *
                monthlyRate *
                Math.pow(1 + monthlyRate, months)
            ) /
            (
                Math.pow(1 + monthlyRate, months) - 1
            );

        totalPayment = monthlyEMI * months;

        totalInterest = totalPayment - loanAmount;
    }



    const formatPrice = (value) =>
        Number(value).toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        });

    return (

        <div className="emi-card">

            <h3 className="emi-title">
                <i className="bi bi-calculator me-2"></i>
                Mortgage Calculator
            </h3>



            <div className="mb-3">

                <label>Property Price</label>

                <input
                    type="text"
                    className="form-control"
                    value={`₹${formatPrice(propertyPrice)}`}
                    disabled
                />

            </div>



            <div className="mb-4">

                <div className="d-flex justify-content-between">

                    <label>Down Payment</label>

                    <strong>
                        ₹{formatPrice(downPayment)}
                    </strong>

                </div>

                <input
                    type="range"
                    min="0"
                    max={propertyPrice}
                    step="50000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="form-range"
                />

            </div>



            <div className="mb-4">

                <div className="d-flex justify-content-between">

                    <label>Interest Rate</label>

                    <strong>{interestRate}%</strong>

                </div>

                <input
                    type="range"
                    min="5"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="form-range"
                />

            </div>



            <div className="mb-4">

                <div className="d-flex justify-content-between">

                    <label>Loan Period</label>

                    <strong>{loanYears} Years</strong>

                </div>

                <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={loanYears}
                    onChange={(e) => setLoanYears(e.target.value)}
                    className="form-range"
                />

            </div>



            {loanAmount > 0 && (

                <div className="emi-result mt-4">

                    <div className="result-box">

                        <h6>Loan Amount</h6>

                        <h4>
                            ₹{formatPrice(loanAmount)}
                        </h4>

                    </div>

                    <div className="result-box">

                        <h6>Monthly EMI</h6>

                        <h4>
                            ₹{formatPrice(monthlyEMI)}
                        </h4>

                    </div>

                    <div className="result-box">

                        <h6>Total Interest</h6>

                        <h4>
                            ₹{formatPrice(totalInterest)}
                        </h4>

                    </div>

                    <div className="result-box">

                        <h6>Total Payment</h6>

                        <h4>
                            ₹{formatPrice(totalPayment)}
                        </h4>

                    </div>

                </div>

            )}

            <button
                className="btn btn-success w-100 mt-4"
                onClick={() =>
                    generateEMIPDF({
                        propertyTitle,
                        propertyPrice,
                        downPayment,
                        interestRate,
                        loanYears,
                        loanAmount,
                        monthlyEMI,
                        totalInterest,
                        totalPayment,
                    })
                }
            >
                <i className="bi bi-download me-2"></i>

                Download EMI Report
            </button>

        </div>

    );
}

export default EMICalculator;