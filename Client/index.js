// Select form and profiles list container
const profileForm = document.getElementById("profileForm");
const profilesList = document.getElementById("profilesList");

// Load profiles from localStorage
const loadProfiles = () => {
    const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    profilesList.innerHTML = profiles.length
        ? profiles.map(profileToHTML).join("")
        : "<p>No profiles created yet.</p>";
};

// Convert profile object to HTML for display
const profileToHTML = ({ name, username, image }) => `
    <div class="card mb-3">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${image}" class="card-img" alt="${name}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text"><strong>Username:</strong> ${username}</p>
                </div>
            </div>
        </div>
    </div>
`;

// Handle form submission
profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("profileName").value;
    const username = document.getElementById("username").value;
    const profilePicture = document.getElementById("profilePicture").files[0];

    // Convert image file to Base64
    const reader = new FileReader();
    reader.onload = function () {
        const image = reader.result;

        // Create profile object
        const newProfile = { name, username, image };

        // Save to localStorage
        const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
        profiles.push(newProfile);
        localStorage.setItem("profiles", JSON.stringify(profiles));

        // Reset form and reload profiles
        profileForm.reset();
        loadProfiles();
    };

    if (profilePicture) {
        reader.readAsDataURL(profilePicture);
    } else {
        // If no image, use placeholder
        const placeholderImage = "https://via.placeholder.com/150";
        reader.onload({ target: { result: placeholderImage } });
    }
});

// Load profiles on page load
loadProfiles();
