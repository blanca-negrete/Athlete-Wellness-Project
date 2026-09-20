let mentalRating = 0;
let physicalRating = 0;
let academicRating = 0;
let stressRating = 0;


function selectRating(category, rating) {

    if (category === "mental") {
        mentalRating = rating;
    }

    if (category === "physical") {
        physicalRating = rating;
    }

    if (category === "academic") {
        academicRating = rating;
    }

    if (category === "stress") {
        stressRating = rating;
    }

    let buttons = document.querySelectorAll(
        "[onclick^=\"selectRating('" + category + "'\"]"
    );

    buttons.forEach(function(button) {
        button.classList.remove("selected");
    });

    event.target.classList.add("selected");
}


function calculateWellnessScore() {

    if (mentalRating === 0 || physicalRating === 0 ||
        academicRating === 0 || stressRating === 0) {

        document.getElementById("checkinResult").innerHTML =
            "<p>Please answer all four questions before submitting.</p>";

        return;
    }

    let total = mentalRating + physicalRating + academicRating + stressRating;
    let score = total / 4;

    document.getElementById("checkinResult").innerHTML =
        "<h2>Your Wellness Score: " + score.toFixed(1) + " / 5</h2>";
}

function submitFeedback() {

    let name = document.getElementById("name").value;
    let rating = document.getElementById("rating").value;
    let feedback = document.getElementById("feedback").value;

    if (name === "" || feedback === "") {

        document.getElementById("feedbackResult").innerHTML =
            "<p>Please enter your name and feedback.</p>";

        return;
    }

    document.getElementById("feedbackResult").innerHTML =
        "<h3>Thank you, " + name + "!</h3>" +
        "<p>Your Rating: " + rating + " stars</p>" +
        "<p>Your Feedback: " + feedback + "</p>";
}