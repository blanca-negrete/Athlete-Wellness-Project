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

    let lowestRating = Math.min(
        mentalRating,
        physicalRating,
        academicRating,
        stressRating
    );

    let focusArea = "";

    if (lowestRating === mentalRating) {
        focusArea = "Mental Wellness";
    } else if (lowestRating === physicalRating) {
        focusArea = "Physical Recovery";
    } else if (lowestRating === academicRating) {
        focusArea = "Academic Balance";
    } else {
        focusArea = "Stress Management";
    }

    document.getElementById("checkinResult").innerHTML =
        "<h2>Your Wellness Score: " + score.toFixed(1) + " / 5</h2>" +
        "<p>Your area of focus is <strong>" + focusArea + "</strong>.</p>" +
        "<p>Explore our resources and shop for tools that may support this area of your wellness.</p>" +
        "<p><a href='shop.html'>Explore the Shop</a></p>";
}

function submitFeedback() {

    let name = document.getElementById("name").value.trim();
    let rating = document.getElementById("rating").value;
    let feedback = document.getElementById("feedback").value.trim();

    if (name === "" || feedback === "") {

        document.getElementById("feedbackResult").innerHTML =
            "<p>Please enter your name and feedback before submitting.</p>";

        return;
    }

    document.getElementById("feedbackResult").innerHTML =
        "<h3>Thank you, " + name + "!</h3>" +
        "<p>Your Rating: " + rating + " stars</p>" +
        "<p>Your Feedback: " + feedback + "</p>" +
        "<p>Your feedback has been submitted successfully.</p>";
}

function highlightProduct(product) {
    product.style.transform = "scale(1.03)";
}

function removeHighlight(product) {
    product.style.transform = "scale(1)";
}

function addToCart(productName, price) {

    document.getElementById("cartMessage").innerHTML =
        "<p><strong>" + productName + "</strong> has been added to your cart.</p>" +
        "<p>Price: $" + price.toFixed(2) + "</p>";
}