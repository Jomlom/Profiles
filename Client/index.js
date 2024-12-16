const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const aboutMe = document.getElementById('aboutMe').value;
    const profilePicture = document.getElementById('profilePicture').files[0];

    const formData = {
        username,
        aboutMe,
        profilePicture: profilePicture ? profilePicture.name : null // Just saving the file name for now
    };

    try {
        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert('Data saved successfully');
    } catch (e) {
        alert(e);
    }
});