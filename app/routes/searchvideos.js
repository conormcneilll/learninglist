document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const browseVideosContainer = document.getElementById('browseVideosContainer');
    const videoItems = browseVideosContainer.getElementsByClassName('video-item');
    const noResultsMessage = document.getElementById('noResultsMessage');

    searchInput.addEventListener('input', function () {
        const searchValue = searchInput.value.trim().toLowerCase();

        let foundMatch = false;

        Array.from(videoItems).forEach(function (item) {
            const title = item.querySelector('h2').textContent.toLowerCase();

            if (title.includes(searchValue)) {
                item.style.display = 'block';
                foundMatch = true;
            } else {
                item.style.display = 'none';
            }
        });

        if (!foundMatch) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    });
});
