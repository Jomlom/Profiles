function openEditScreen(index) {
    editIndex = index;
    const profile = profiles[index];
    editProfileScreen.classList.add('open');
    editUsernameInput.value = profile.username;
    profileNameText.textContent = profile.name;
    
    // Pre-fill the new fields
    document.getElementById('editDisplayName').value = profile.displayName || ''; // New field
    document.getElementById('editProfileColour').value = profile.profileColour || '#FFFFFF'; // New field
    document.getElementById('editBio').value = profile.bio || ''; // New field
    profilePicturePreview.src = profile.profilePicture || ''; // Renamed field (from 'picture' to 'profilePicture')
    document.getElementById('editProfilePicture').value = ''; // Reset file input for each profile edit
}


function closeEditScreen() {
    editProfileScreen.classList.remove('open');
    resetRenameButton();
}

function enableEdit() {
    isEditingName = true;
    profileNameText.innerHTML = `<input type="text" value="${profiles[editIndex].name}" class="form-control">`;
    saveButton.style.display = 'inline-block';
    renameButton.style.display = 'none';
}

function saveNameChanges() {
    const newName = profileNameText.querySelector('input').value;
    profiles[editIndex].name = newName;
    saveProfilesToLocalStorage();
    resetRenameButton();
    renderProfiles();
}

function resetRenameButton() {
    isEditingName = false;
    profileNameText.innerHTML = profiles[editIndex].name;
    renameButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
}

function saveProfileChanges() {
    const username = editUsernameInput.value;
    const displayName = document.getElementById('editDisplayName').value;
    const profileColour = document.getElementById('editProfileColour').value;
    const bio = document.getElementById('editBio').value;
    const picture = document.getElementById('editProfilePicture').files[0];

    profiles[editIndex].username = username;
    profiles[editIndex].displayName = displayName;
    profiles[editIndex].profileColour = profileColour;
    profiles[editIndex].bio = bio;

    // Only update profile picture if a new one is selected
    if (picture) {
        const reader = new FileReader();
        reader.onload = function () {
            profiles[editIndex].profilePicture = reader.result; // Renamed field (from 'picture' to 'profilePicture')
            saveProfilesToLocalStorage();
            renderProfiles();
            closeEditScreen();
        };
        reader.readAsDataURL(picture);
    } else {
        saveProfilesToLocalStorage();
        renderProfiles();
        closeEditScreen();
    }
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            profilePicturePreview.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
}
