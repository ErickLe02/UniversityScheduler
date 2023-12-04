
document.addEventListener('DOMContentLoaded', function() {
    const startTime = 7; // Start time for the schedule in 24-hour format
    const endTime = 17; // End time for the schedule in 24-hour format
    const tableBody = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];

    for (let hour = startTime; hour <= endTime; hour++) {
        let row = tableBody.insertRow();
        let timeCell = row.insertCell(0);
        timeCell.innerText = (hour <= 12 ? hour : hour - 12) + ' ' + (hour < 12 ? 'am' : 'pm');

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Add more days if needed
        for (let day = 0; day < 5; day++) {
            let dropZone = row.insertCell(day + 1);
            dropZone.classList.add('drop-zone');
            dropZone.setAttribute('data-time', timeCell.innerText);
            dropZone.setAttribute('data-day', days[day]); // Set the day attribute
            dropZone.addEventListener('dragover', function(event) {
                event.preventDefault();
                event.target.classList.add('highlight');
            });

            dropZone.addEventListener('dragleave', function(event) {
                event.target.classList.remove('highlight');
            });

            dropZone.addEventListener('drop', function(event) {
                event.preventDefault();
                const dropZoneCell = event.target.closest('.drop-zone'); // Ensure we have the drop-zone cell
                dropZoneCell.classList.remove('highlight');
            
                const id = event.dataTransfer.getData('text');
                const originalDraggableElement = document.getElementById(id);
                const compactWeekDays = originalDraggableElement.getAttribute('data-week-days');
                const weekDays = parseDays(compactWeekDays);
            
                weekDays.forEach(day => {
                    const dayCells = document.querySelectorAll(`.drop-zone[data-day="${day}"]`);
                    dayCells.forEach(cell => {
                        const timeSlot = cell.getAttribute('data-time');
                        if (timeSlot === dropZoneCell.getAttribute('data-time')) {
                            cell.innerHTML = ''; // Clear the cell
                            const classInfo = originalDraggableElement.cloneNode(true);
                            classInfo.classList.remove('draggable');
                            classInfo.classList.add('class-info');
                            cell.appendChild(classInfo);
                        }
                    });
                });
            });            
        }
    }

    // Fetch and create draggable classes
    fetchData();
});


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
            element.setAttribute('data-course-name', item['courseName']);
            element.setAttribute('data-week-days', item['weekDays']);
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



function parseDays(dayString) {
    const dayMap = {
      'M': 'Monday',
      'Tu': 'Tuesday',
      'W': 'Wednesday',
      'Th': 'Thursday',
      'F': 'Friday'
    };
  
    let days = [];
    let dayBuffer = "";
  
    for (const char of dayString) {
      dayBuffer += char;
      if (dayMap[dayBuffer]) {
        days.push(dayMap[dayBuffer]);
        dayBuffer = ""; // Reset buffer
      }
    }
    return days;
}