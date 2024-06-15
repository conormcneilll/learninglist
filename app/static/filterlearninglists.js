document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const learningListsContainer = document.getElementById('learningListsContainer');
    const learningListItems = learningListsContainer.getElementsByClassName('learning-list-item');
    const noResultsMessage = document.getElementById('noResultsMessage');

    searchInput.addEventListener('input', function () {
        const searchValue = searchInput.value.trim().toLowerCase();

        let foundMatch = false;

        Array.from(learningListItems).forEach(function (item) {
            const subjectElement = item.querySelector('.subject');
            const subject = subjectElement ? subjectElement.textContent.trim().toLowerCase() : '';
        
            const usernameElement = item.querySelector('.username');
            const username = usernameElement ? usernameElement.textContent.trim().toLowerCase() : '';
        
            if (subject.includes(searchValue) || username.includes(searchValue)) {
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

console.log("Search value:", searchValue);
console.log("Found match:", foundMatch);
