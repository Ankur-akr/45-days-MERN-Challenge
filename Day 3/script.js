function calculateGrade() {
    const marks = document.getElementById("marks").value;
    const resultDiv = document.getElementById("result");

    if (marks === "" || marks < 0 || marks > 100) {
    resultDiv.innerHTML = "Please enter valid marks between 0 and 100.";
    resultDiv.style.color = "red";
    return;
    }

    let grade = "";
    if (marks >= 90 && marks <= 100) {
    grade = "A";
    } else if (marks >= 80 && marks <= 89) {
    grade = "B";
    } else if (marks >= 70 && marks <= 79) {
    grade = "C";
    } else if (marks >= 60 && marks <= 69) {
    grade = "D";
    } else {
    grade = "F";
    }

    resultDiv.innerHTML = `You scored <b>${marks}</b>. Your grade is <b>${grade}</b>.`;
    resultDiv.style.color = "#33d76fff";
}