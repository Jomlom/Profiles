const profileList = document.getElementById('profileList');
const editProfileScreen = document.getElementById('editProfileScreen');
const profileNameText = document.getElementById('profileNameText');
const profilePicturePreview = document.getElementById('profilePicturePreview');
const renameButton = document.getElementById('renameButton');
const saveButton = document.getElementById('saveButton');
const editUsernameInput = document.getElementById('editUsername');
const editProfilePictureInput = document.getElementById('editProfilePicture');
const deletePopup = document.getElementById('deletePopup');
let profiles = [];
let editIndex = null;
let deleteIndex = null;
let isEditingName = false;

function loadProfilesFromLocalStorage() {
    const storedProfiles = localStorage.getItem('profiles');
    if (storedProfiles) {
        profiles = JSON.parse(storedProfiles);

        // Ensure backward compatibility: add default values for new fields in old profiles
        profiles.forEach(profile => {
            if (!profile.displayName) {
                profile.displayName = ''; // default display name
            }
            if (!profile.profileColour) {
                profile.profileColour = '#FFFFFF'; // default profile color
            }
            if (!profile.bio) {
                profile.bio = ''; // default bio
            }
            if (!profile.profilePicture) {
                profile.profilePicture = ''; // renamed from 'picture'
            }
        });
    } else {
        profiles = [];
    }
}

// Load profiles when the script runs
loadProfilesFromLocalStorage();
