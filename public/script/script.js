document.addEventListener('DOMContentLoaded', function() {
    var startTime = 7; // Start time for the schedule in 24-hour format
    var endTime = 17; // End time for the schedule in 24-hour format
    var tableBody = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];

    for (var hour = startTime; hour <= endTime; hour++) {
        var row = tableBody.insertRow();
        var timeCell = row.insertCell(0);
        timeCell.innerText = (hour <= 12 ? hour : hour - 12) + ' ' + (hour < 12 ? 'am' : 'pm');

        // Create an empty cell for each day of the week
        for (var day = 0; day < 5; day++) {
            row.insertCell(day + 1);
        }
    }
});

async function fetchData() {
    const response = await fetch('/getData');
    const data = await response.json();
    const container = document.getElementById('data-container');

    data.forEach((item, index) => {
        // Create a div element for each item
        const element = document.createElement('div');

        // Format and append each property of the item
        const p = document.createElement('p');
        p.innerHTML = `${item['courseName']}: ${item['weekDays']} <br>
                         ${item['startTime']} - ${item['endTime']}`;
        element.appendChild(p);

        // Set attributes for draggable functionality
        element.setAttribute("id", "draggable-" + index);
        element.setAttribute("draggable", "true");
        element.style.cursor = 'move'; // Change cursor on hover

        // Add the element to the container
        container.appendChild(element);

        // Add event listeners for drag events
        element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
        });
    });

    // Add event listeners to the container for dragover and drop events
    container.addEventListener('dragover', (event) => {
        event.preventDefault(); // Necessary to allow drop
    });

    container.addEventListener('drop', (event) => {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = event.target;

        // Move the draggable element to the dropzone
        if (dropzone.id !== draggableElement.id) {
            dropzone.appendChild(draggableElement);
        }
    });
}



fetchData();
