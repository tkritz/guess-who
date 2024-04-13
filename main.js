const charCardImg = document.querySelector('#char-card');
const charButton = document.querySelector('.char-button');

document.querySelector('.char-button').addEventListener('click', function() {
    const characters = ["Sebastian", "Haley", "Alex", "Elliott", "Sam", "Abigail", "Leah", "Shane", "Emily", "Harvey",
    "Maru", "Penny", "Caroline", "Clint", "Demetrius", "Gus", "Jodi", "Kent", "Lewis", "Marnie", "Linus", "Pam", 
    "Pierre", "Robin", "Evelyn", "George", "Jas", "Vincent"];
    
    // Randomly select a new character
    var newChar = characters[Math.floor(Math.random() * characters.length)];
    var newImageSrc = 'characters/' + newChar + '.png';
    var newName = newChar;

    // Update the character card and name
    document.getElementById('char-card').src = newImageSrc;
    document.querySelector('.side-container .name-tag').textContent = newName;

    // Disable the previously active grid item, if any
    const previouslyActive = document.querySelector('.active-grid-item');
    if (previouslyActive) {
        previouslyActive.classList.remove('active-grid-item');
        previouslyActive.classList.remove('disabled');
    }

    // Disable the new grid item
    const activeGridItem = document.getElementById(newChar);
    activeGridItem.classList.add('active-grid-item');
    activeGridItem.classList.add('disabled');

    // Clear all existing overlays
    document.querySelectorAll('.overlay-image').forEach(overlay => {
        overlay.style.display = 'none';
    });
});

// Prevent click events on disabled grid items
document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', (event) => {
        if (item.classList.contains('disabled')) {
            event.stopPropagation(); // Stop the click from doing anything
        } else {
            // Handle the click event if not disabled
            toggleOverlay(item);
        }
    });
});

function toggleOverlay(item) {
    let overlay = item.querySelector('.overlay-image');
    if (overlay) {
        overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
    } else {
        overlay = document.createElement('div');
        overlay.classList.add('overlay-image');
        item.appendChild(overlay);
        overlay.style.display = 'block';
    }
}

