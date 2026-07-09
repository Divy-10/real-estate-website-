import jsPDF from "jspdf";

const formatPrice = (value) =>
    Number(value).toLocaleString("en-IN");

const generateEMIPDF = ({
    propertyTitle,
    propertyPrice,
    downPayment,
    interestRate,
    loanYears,
    loanAmount,
    monthlyEMI,
    totalInterest,
    totalPayment,
}) => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("EMI REPORT", 75, 20);

    doc.setFontSize(12);

    let y = 40;

    doc.text(`Property : ${propertyTitle}`, 20, y);

    y += 10;

    doc.text(
        `Property Price : ₹${formatPrice(propertyPrice)}`,
        20,
        y
    );

    y += 10;

    doc.text(
        `Down Payment : ₹${formatPrice(downPayment)}`,
        20,
        y
    );

    y += 10;

    doc.text(
        `Loan Amount : ₹${formatPrice(loanAmount)}`,
        20,
        y
    );

    y += 10;

    doc.text(
        `Interest Rate : ${interestRate}%`,
        20,
        y
    );

    y += 10;

    doc.text(
        `Loan Period : ${loanYears} Years`,
        20,
        y
    );

    y += 10;

    doc.text(
        `Monthly EMI : ₹${formatPrice(monthlyEMI)}`,
        20,
        y
    );

    y += 10;

    doc.text(
        `Total Interest : ₹${formatPrice(totalInterest)}`,
        20,
        y
    );

    y += 10;

    doc.text(
        `Total Payment : ₹${formatPrice(totalPayment)}`,
        20,
        y
    );

    y += 20;

    doc.text(
        `Generated On : ${new Date().toLocaleDateString()}`,
        20,
        y
    );

    doc.save("EMI_Report.pdf");
};

export default generateEMIPDF;