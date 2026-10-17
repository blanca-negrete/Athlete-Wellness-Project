let mentalRating = 0;
let physicalRating = 0;
let academicRating = 0;
let stressRating = 0;


function selectRating(category, rating, button) {
    if (category === "mental") {
        mentalRating = rating;
    } else if (category === "physical") {
        physicalRating = rating;
    } else if (category === "academic") {
        academicRating = rating;
    } else if (category === "stress") {
        stressRating = rating;
    }

    // Update the selected button in this category.
    const ratingButtons = button.parentElement.querySelectorAll("button");

    ratingButtons.forEach(function (ratingButton) {
        ratingButton.classList.remove("selected");
        ratingButton.setAttribute("aria-pressed", "false");
    });

    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
}


function calculateWellnessScore() {
    const result = document.getElementById("checkinResult");

    if (!result) {
        return;
    }

    if (
        mentalRating === 0 ||
        physicalRating === 0 ||
        academicRating === 0 ||
        stressRating === 0
    ) {
        result.innerHTML =
            "<p>Please answer all four questions before submitting.</p>";
        return;
    }

    const ratings = [
        { name: "Mental Wellness", score: mentalRating },
        { name: "Physical Recovery", score: physicalRating },
        { name: "Academic Balance", score: academicRating },
        { name: "Stress Management", score: stressRating }
    ];

    const total =
        mentalRating +
        physicalRating +
        academicRating +
        stressRating;

    const score = total / 4;

    const lowestRating = Math.min(
        mentalRating,
        physicalRating,
        academicRating,
        stressRating
    );

    // Include every category tied for the lowest rating.
    const focusAreas = ratings.filter(function (rating) {
        return rating.score === lowestRating;
    });

    const focusNames = focusAreas.map(function (area) {
        return area.name;
    });

    let scoreMessage = "";

    if (score >= 4) {
        scoreMessage =
            "Your ratings suggest that you feel positive about your wellness right now. Keep building habits that support you.";
    } else if (score >= 3) {
        scoreMessage =
            "Your ratings suggest a mixed wellness experience. Consider which habits could help you feel more balanced.";
    } else {
        scoreMessage =
            "Your ratings suggest that you may benefit from extra support and time for your well-being. Consider reaching out to someone you trust if you need help.";
    }

    const recommendations = {
        "Mental Wellness": {
            resource: "Mental Wellness",
            goal: "Mental Wellness",
            product: "Athlete Wellness Journal",
            productDescription:
                "A journal can help you reflect on your thoughts, feelings, and daily experiences."
        },

        "Physical Recovery": {
            resource: "Physical Recovery",
            goal: "Physical Recovery",
            product: "Recovery Roller",
            productDescription:
                "Explore recovery tools alongside appropriate recovery guidance from your athletic training staff."
        },

        "Academic Balance": {
            resource: "Academic Balance",
            goal: "Academic Balance",
            product: "Student-Athlete Planner",
            productDescription:
                "A planner can help organize assignments, practices, and other responsibilities."
        },

        "Stress Management": {
            resource: "Stress Management",
            goal: "Stress Management",
            product: "Weekly Wellness Calendar",
            productDescription:
                "A weekly calendar can help you plan time for classes, training, recovery, and personal activities."
        }
    };

    // Use the first lowest-rated category for the initial recommendation.
    const primaryFocus = focusNames[0];
    const recommendation = recommendations[primaryFocus];

    result.innerHTML =
        "<h2>Your Wellness Score: " + score.toFixed(1) + " / 5</h2>" +

        "<p>This score is the average of your four self-reported ratings. " +
        "A higher score means you rated your current wellness more positively. " +
        "It is a reflection tool, not a medical assessment.</p>" +

        "<p>" + scoreMessage + "</p>" +

        "<h3>Area to Focus On</h3>" +

        "<p><strong>" + focusNames.join(", ") + "</strong> " +
        "received your lowest rating of " + lowestRating + " out of 5.</p>" +

        "<h3>Your Suggested Next Steps</h3>" +

        "<p><strong>Resource:</strong> Explore our " +
        recommendation.resource + " resources.</p>" +

        "<p><strong>Product:</strong> " +
        recommendation.product + ". " +
        recommendation.productDescription + "</p>" +

        "<p><strong>Goal:</strong> Consider setting a " +
        recommendation.goal + " goal to work on this area.</p>" +

        "<p><a href='resources.html'>Explore Resources</a></p>" +
        "<p><a href='goals.html?category=" +
        encodeURIComponent(recommendation.goal) +
        "'>Set a Wellness Goal</a></p>" +
        "<p><a href='shop.html'>Explore the Shop</a></p>";
}


// REVIEWS AND FEEDBACK


function submitFeedback() {
    const nameInput = document.getElementById("name");
    const ratingInput = document.getElementById("rating");
    const feedbackInput = document.getElementById("feedback");
    const result = document.getElementById("feedbackResult");

    if (!nameInput || !ratingInput || !feedbackInput || !result) {
        return;
    }

    const name = nameInput.value.trim();
    const rating = ratingInput.value;
    const feedback = feedbackInput.value.trim();

    if (name === "" || rating === "" || feedback === "") {
        result.textContent =
            "Please complete all fields before submitting.";
        return;
    }

    // Clear any previous response.
    result.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "Thank you for your feedback, " + name + "!";

    const ratingText = document.createElement("p");
    ratingText.textContent = "Your Rating: " + rating + " out of 5 stars";

    const feedbackText = document.createElement("p");
    feedbackText.textContent = "Your Feedback: " + feedback;

    const confirmation = document.createElement("p");
    confirmation.textContent =
        "Your feedback is displayed above. It has not been saved to a database.";

    result.append(
        heading,
        ratingText,
        feedbackText,
        confirmation
    );

    // Reset the form after successful submission.
    const feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm) {
        feedbackForm.reset();
    }
}

// SHOP PRODUCT HOVER EFFECTS


function highlightProduct(product) {
    product.style.transform = "scale(1.03)";
}


function removeHighlight(product) {
    product.style.transform = "scale(1)";
}


// SHOPPING CART

let cart = [];

function updateCartDisplay() {
    const cartMessage = document.getElementById("cartMessage");
    const cartCount = document.getElementById("cartCount");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const clearCartButton = document.getElementById("clearCartButton");

    // These elements exist on the Shop page.
    if (!cartMessage || !cartCount || !cartSubtotal || !clearCartButton) {
        return;
    }

    cartCount.textContent = cart.length;

    const subtotal = cart.reduce(function (total, item) {
        return total + item.price;
    }, 0);

    cartSubtotal.textContent = subtotal.toFixed(2);
    clearCartButton.disabled = cart.length === 0;

    cartMessage.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent =
            "Your cart is empty. Add a product to get started.";
        cartMessage.appendChild(emptyMessage);
        return;
    }

    const itemList = document.createElement("ul");

    cart.forEach(function (item, index) {
        const listItem = document.createElement("li");

        const itemText = document.createElement("span");
        itemText.textContent =
            item.name + " - $" + item.price.toFixed(2) + " ";

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            removeFromCart(index);
        });

        listItem.append(itemText, removeButton);
        itemList.appendChild(listItem);
    });

    cartMessage.appendChild(itemList);
}


function addToCart(productName, price) {
    cart.push({
        name: productName,
        price: price
    });

    updateCartDisplay();
}


function removeFromCart(index) {
    if (index < 0 || index >= cart.length) {
        return;
    }

    cart.splice(index, 1);
    updateCartDisplay();
}


function clearCart() {
    cart = [];
    updateCartDisplay();
}


// Initialize the cart when the Shop page loads.
if (document.getElementById("cartCount")) {
    updateCartDisplay();
}


// WELLNESS GOALS

function addGoal() {
    const categoryInput = document.getElementById("goalCategory");
    const goalTextInput = document.getElementById("goalText");
    const goalMessage = document.getElementById("goalMessage");

    if (!categoryInput || !goalTextInput || !goalMessage) {
        return;
    }

    const category = categoryInput.value;
    const goalText = goalTextInput.value.trim();

    if (goalText === "") {
        goalMessage.textContent =
            "Please enter a goal before adding it.";
        return;
    }

    const goals = JSON.parse(
        localStorage.getItem("athleteGoals") || "[]"
    );

    goals.push({
        category: category,
        text: goalText,
        completed: false
    });

    localStorage.setItem("athleteGoals", JSON.stringify(goals));

    goalTextInput.value = "";
    goalMessage.textContent = "Your goal has been added!";

    displayGoals();
}


function displayGoals() {
    const goalList = document.getElementById("goalList");

    if (!goalList) {
        return;
    }

    const goals = JSON.parse(
        localStorage.getItem("athleteGoals") || "[]"
    );

    goalList.replaceChildren();

    if (goals.length === 0) {
        const message = document.createElement("p");
        message.textContent = "You have not added any goals yet.";
        goalList.appendChild(message);
        return;
    }

    goals.forEach(function (goal, index) {
        const card = document.createElement("div");
        card.className = "goal-card";

        const heading = document.createElement("h3");
        heading.textContent = goal.category;

        const description = document.createElement("p");
        description.textContent = goal.text;

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.textContent = goal.completed
            ? "Completed"
            : "Mark Complete";
        completeButton.disabled = goal.completed;
        completeButton.addEventListener("click", function () {
            completeGoal(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteGoal(index);
        });

        card.append(
            heading,
            description,
            completeButton,
            deleteButton
        );

        goalList.appendChild(card);
    });
}


function completeGoal(index) {
    const goals = JSON.parse(
        localStorage.getItem("athleteGoals") || "[]"
    );

    if (!goals[index]) {
        return;
    }

    goals[index].completed = true;

    localStorage.setItem("athleteGoals", JSON.stringify(goals));
    displayGoals();
}


function deleteGoal(index) {
    const goals = JSON.parse(
        localStorage.getItem("athleteGoals") || "[]"
    );

    if (index < 0 || index >= goals.length) {
        return;
    }

    goals.splice(index, 1);

    localStorage.setItem("athleteGoals", JSON.stringify(goals));
    displayGoals();
}


// INITIALIZE THE GOALS PAGE

if (document.getElementById("goalList")) {
    displayGoals();
}