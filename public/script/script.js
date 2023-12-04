document.addEventListener('DOMContentLoaded', function() {
    const startTime = 7; // Start time for the schedule in 24-hour format
    const endTime = 17; // End time for the schedule in 24-hour format
    const tableBody = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];

    for (let hour = startTime; hour <= endTime; hour++) {
        let row = tableBody.insertRow();
        let timeCell = row.insertCell(0);
        timeCell.innerText = (hour <= 12 ? hour : hour - 12) + ' ' + (hour < 12 ? 'am' : 'pm');

        for (let day = 0; day < 5; day++) {
            let dropZone = row.insertCell(day + 1);
            dropZone.classList.add('drop-zone');
            dropZone.addEventListener('dragover', function(event) {
                event.preventDefault();
                event.target.classList.add('highlight');
            });

            dropZone.addEventListener('dragleave', function(event) {
                event.target.classList.remove('highlight');
            });

            dropZone.addEventListener('drop', function(event) {
                event.preventDefault();
                event.target.classList.remove('highlight');
                const id = event.dataTransfer.getData('text');
                const draggableElement = document.getElementById(id);
                event.target.appendChild(draggableElement);
            });
        }
    }

    // Fetch and create draggable classes
    fetchData();
});

// Function to fetch data and create draggable elements
async function fetchData() {
    try {
        const response = await fetch('/getData');
        const data = await response.json();
        const container = document.getElementById('data-container');

        data.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'draggable';
            element.setAttribute('draggable', 'true');
            element.setAttribute('id', 'draggable-' + index);
            element.textContent = `${item['courseName']}: ${item['weekDays']} ${item['startTime']} - ${item['endTime']}`;
            container.appendChild(element);

            element.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text', event.target.id);
            });
        });
    } catch (error) {
        console.error('There was an error fetching the data: ', error);
    }
}