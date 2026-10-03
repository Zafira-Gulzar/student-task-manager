// Search functionality for tasks
const searchInput = document.getElementById('searchTask');
const taskList = document.getElementById('taskList');

if (searchInput && taskList) {
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        const tasks = taskList.querySelectorAll('.task-card');

        tasks.forEach(function (task) {
            const title = task.querySelector('h3') ? task.querySelector('h3').textContent.toLowerCase() : '';
            const desc = task.querySelector('p') ? task.querySelector('p').textContent.toLowerCase() : '';

            if (title.includes(query) || desc.includes(query)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });
}