console.log("EventHub JavaScript Connected!");

// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:5000";


// =====================================================
// SIGNUP
// =====================================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check password match

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        // Password length

        if (password.length < 6) {

            alert("Password must be at least 6 characters long!");

            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                alert(
                    "Account created successfully! Please login."
                );

                window.location.href = "login.html";

            } else {

                alert(
                    data.message ||
                    "Registration failed."
                );

            }

        } catch (error) {

            console.error("Signup error:", error);

            alert(
                "Cannot connect to server. Make sure the backend is running."
            );

        }

    });

}


// =====================================================
// LOGIN
// =====================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        try {

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                // Save login information

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                alert(data.message);


                // Admin → Admin Dashboard

                if (data.user.role === "admin") {

                    window.location.href =
                        "admin.html";

                }

                // Student → Student Dashboard

                else {

                    window.location.href =
                        "dashboard.html";

                }

            } else {

                alert(
                    data.message ||
                    "Invalid email or password."
                );

            }

        } catch (error) {

            console.error("Login error:", error);

            alert(
                "Cannot connect to server. Make sure the backend is running."
            );

        }

    });

}


// =====================================================
// EVENT REGISTRATION
// =====================================================

const registerButtons =
    document.querySelectorAll(".register-btn");


registerButtons.forEach(function (button) {

    button.addEventListener("click", async function () {

        const token =
            localStorage.getItem("token");


        // User must login

        if (!token) {

            alert(
                "Please login first to register for an event!"
            );

            window.location.href =
                "login.html";

            return;
        }


        const eventId =
            button.dataset.eventId;


        if (!eventId) {

            alert("Event ID is missing!");

            return;
        }


        // Prevent multiple clicks

        button.disabled = true;

        button.textContent = "Registering...";


        try {

            const response = await fetch(
                `${API_URL}/api/registrations/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        eventId: eventId
                    })
                }
            );


            const data =
                await response.json();


            if (response.ok) {

                alert(data.message);

                button.textContent =
                    "✓ Registered";

                button.disabled = true;

            } else {

                alert(
                    data.message ||
                    "Registration failed."
                );

                button.disabled = false;

                button.textContent =
                    "Register Now";
            }

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            alert(
                "Cannot connect to server."
            );

            button.disabled = false;

            button.textContent =
                "Register Now";
        }

    });

});


// =====================================================
// LOGOUT
// =====================================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            localStorage.removeItem("token");

            localStorage.removeItem("user");


            alert(
                "Logged out successfully!"
            );


            window.location.href =
                "login.html";

        }
    );

}


// =====================================================
// SHOW LOGGED-IN USER IN NAVIGATION
// =====================================================

const user =
    localStorage.getItem("user");


if (user) {

    try {

        const userData =
            JSON.parse(user);

        console.log(
            `Logged in as: ${userData.name}`
        );

    } catch (error) {

        console.error(
            "Invalid user data in localStorage"
        );

    }

}