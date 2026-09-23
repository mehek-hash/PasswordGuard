// ================================
// SHOW / HIDE PASSWORD
// ================================

document
    .getElementById("togglePassword")
    .addEventListener("click", function () {

        let password =
            document.getElementById("password");

        if (password.type === "password") {

            password.type = "text";

            this.innerText = "🙈";

        } else {

            password.type = "password";

            this.innerText = "👁";
        }

    });


// ================================
// PASSWORD ANALYZER
// ================================

function checkPassword() {

    let password =
        document.getElementById("password").value;

    let score = 0;

    let warnings = [];

    let recommendations = [];


    // EMPTY PASSWORD

    if (password.length === 0) {

        alert("Please enter a password.");

        return;
    }


    // ================================
    // PASSWORD LENGTH
    // ================================

    if (password.length >= 16) {

        score += 30;

    }
    else if (password.length >= 12) {

        score += 25;

    }
    else if (password.length >= 8) {

        score += 15;

        recommendations.push(
            "Use at least 12 characters."
        );

    }
    else {

        warnings.push(
            "Password is too short."
        );

        recommendations.push(
            "Use at least 12 characters."
        );
    }


    // ================================
    // LOWERCASE
    // ================================

    if (/[a-z]/.test(password)) {

        score += 7;

    }
    else {

        recommendations.push(
            "Add lowercase letters."
        );
    }


    // ================================
    // UPPERCASE
    // ================================

    if (/[A-Z]/.test(password)) {

        score += 7;

    }
    else {

        recommendations.push(
            "Add uppercase letters."
        );
    }


    // ================================
    // NUMBERS
    // ================================

    if (/[0-9]/.test(password)) {

        score += 7;

    }
    else {

        recommendations.push(
            "Add numbers."
        );
    }


    // ================================
    // SPECIAL CHARACTERS
    // ================================

    if (/[^A-Za-z0-9]/.test(password)) {

        score += 6;

    }
    else {

        recommendations.push(
            "Add special characters."
        );
    }


    // ================================
    // REPEATED CHARACTERS
    // ================================

    if (/(.)\1\1/.test(password)) {

        score -= 10;

        warnings.push(
            "Repeated characters detected."
        );

        recommendations.push(
            "Avoid repeating the same character."
        );
    }


    // ================================
    // SEQUENTIAL CHARACTERS
    // ================================

    let lowerPassword =
        password.toLowerCase();

    let sequences = [

        "123",
        "234",
        "345",
        "456",
        "567",
        "678",
        "789",

        "abc",
        "bcd",
        "cde",
        "def",

        "qwe",
        "wer",
        "ert",
        "rty"

    ];


    for (let sequence of sequences) {

        if (lowerPassword.includes(sequence)) {

            score -= 15;

            warnings.push(
                "Predictable sequence detected."
            );

            recommendations.push(
                "Avoid sequences such as 123 or abc."
            );

            break;
        }
    }


    // ================================
    // COMMON PASSWORDS
    // ================================

    let commonPasswords = [

        "password",
        "password123",
        "123456",
        "12345678",
        "123456789",
        "qwerty",
        "qwerty123",
        "admin",
        "admin123",
        "welcome",
        "welcome123",
        "letmein",
        "iloveyou",
        "abc123"

    ];


    if (
        commonPasswords.includes(lowerPassword)
    ) {

        score -= 25;

        warnings.push(
            "Common password detected."
        );

        recommendations.push(
            "Do not use commonly used passwords."
        );
    }


    // ================================
    // WORD + NUMBER
    // ================================

    if (
        /^[A-Za-z]+[0-9]+$/.test(password)
    ) {

        score -= 15;

        warnings.push(
            "Predictable word + number pattern detected."
        );

        recommendations.push(
            "Avoid patterns such as Password123."
        );
    }


    // ================================
    // YEAR
    // ================================

    if (
        /(19|20)\d{2}/.test(password)
    ) {

        score -= 10;

        warnings.push(
            "Year-like pattern detected."
        );

        recommendations.push(
            "Avoid obvious years in passwords."
        );
    }


    // ================================
    // SCORE LIMIT
    // ================================

    if (score < 0) {

        score = 0;
    }

    if (score > 100) {

        score = 100;
    }


    // ================================
    // DISPLAY SCORE
    // ================================

    document.getElementById("score").innerText =
        score + "/100";


    // ================================
    // PROGRESS BAR
    // ================================

    document
        .getElementById("progressBar")
        .style.width = score + "%";


    // ================================
    // STRENGTH
    // ================================

    let strength =
        document.getElementById("strength");


    if (score < 30) {

        strength.innerText =
            "🔴 VERY WEAK";

    }
    else if (score < 50) {

        strength.innerText =
            "🔴 WEAK";

    }
    else if (score < 70) {

        strength.innerText =
            "🟠 MODERATE";

    }
    else if (score < 85) {

        strength.innerText =
            "🟢 STRONG";

    }
    else {

        strength.innerText =
            "🟢 VERY STRONG";
    }


    // ================================
    // DISPLAY ANALYSIS
    // ================================

    let analysis =
        document.getElementById("analysis");

    analysis.innerHTML = "";


    if (warnings.length === 0) {

        analysis.innerHTML =
            "<li>✓ No major security problems detected.</li>";

    }
    else {

        for (let warning of warnings) {

            let li =
                document.createElement("li");

            li.innerText =
                "⚠️ " + warning;

            analysis.appendChild(li);
        }
    }


    // ================================
    // DISPLAY RECOMMENDATIONS
    // ================================

    let recommendationList =
        document.getElementById("recommendations");

    recommendationList.innerHTML = "";


    if (recommendations.length === 0) {

        recommendationList.innerHTML =
            "<li>✓ Excellent! Your password has strong characteristics.</li>";

    }
    else {

        for (
            let recommendation of recommendations
        ) {

            let li =
                document.createElement("li");

            li.innerText =
                "💡 " + recommendation;

            recommendationList.appendChild(li);
        }
    }

}