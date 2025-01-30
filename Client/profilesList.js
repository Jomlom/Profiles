function saveProfilesToLocalStorage() {
    localStorage.setItem('profiles', JSON.stringify(profiles));
}

function renderProfiles() {
    profileList.innerHTML = '';
    profiles.forEach((profile, index) => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';

        // Apply the profile's background color
        profileCard.style.setProperty('--profile-color', profile.profileColour);

        // Dynamically set text color based on the background color
        setTextColorBasedOnBackground(profileCard, profile.profileColour);

        // Only show profile picture if one exists
        if (profile.profilePicture) {
            const profileImage = document.createElement('img');
            profileImage.className = 'profile-picture';  // Add a class for styling
            profileImage.src = profile.profilePicture;  // Use 'profilePicture' field
            profileImage.alt = profile.name;
            profileCard.appendChild(profileImage);
        }

        // Show the profile name in bold above the profile picture
        const profileName = document.createElement('div');
        profileName.className = 'profile-name';
        profileName.textContent = profile.name;
        profileCard.appendChild(profileName);

        // Show the username below the profile picture (if set)
        if (profile.username) {
            const profileUsername = document.createElement('div');
            profileUsername.className = 'profile-display-name'; // Reusing display name class for username
            profileUsername.textContent = profile.username;
            profileCard.appendChild(profileUsername);
        }

        // Add edit and delete icons
        const editIcon = document.createElement('span');
        editIcon.className = 'edit-icon';
        editIcon.innerHTML = '✏️';
        editIcon.onclick = () => openEditScreen(index);
        profileCard.appendChild(editIcon);

        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'delete-icon';
        deleteIcon.innerHTML = '❌';
        deleteIcon.onclick = () => openDeletePopup(index);
        profileCard.appendChild(deleteIcon);

        profileList.appendChild(profileCard);
    });

    // Add "Add New" profile at the end
    const addNewProfileCard = document.createElement('div');
    addNewProfileCard.className = 'profile-card add-profile-card';
    addNewProfileCard.onclick = addNewProfile;
    addNewProfileCard.innerHTML = `<span>+</span><p>Add New</p>`;
    profileList.appendChild(addNewProfileCard);
}

function openDeletePopup(index) {
    deleteIndex = index;
    deletePopup.classList.add('open');
}

function closePopup() {
    deletePopup.classList.remove('open');
}

function deleteProfile() {
    profiles.splice(deleteIndex, 1);
    saveProfilesToLocalStorage();
    renderProfiles();
    closePopup();
}

function addNewProfile() {
    const newProfile = {
        name: 'New Profile',
        username: '',
        displayName: '',
        profilePicture: '',
        profileColour: '#FFFFFF',
        bio: ''
    };
    profiles.push(newProfile);
    saveProfilesToLocalStorage();
    renderProfiles();
}

// Function to calculate luminance (brightness) of a color
function getLuminance(color) {
    // Remove the hash (#) if present
    color = color.replace('#', '');
    
    // Convert the color to RGB values
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    
    // Apply the luminance formula
    let a = [r, g, b].map(function (v) {
        v /= 255;
        return (v <= 0.03928) ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    
    // Calculate and return luminance
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Function to set the text color based on the background color
function setTextColorBasedOnBackground(profileCard, color) {
    const luminance = getLuminance(color);
    // If the background is dark (luminance < 0.5), set the text color to white
    const textColor = luminance < 0.5 ? 'white' : 'black';
    
    // Set the text color on the profile name and display name
    profileCard.style.setProperty('--text-color', textColor);
}


renderProfiles();
