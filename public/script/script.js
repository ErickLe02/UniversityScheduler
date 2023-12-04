// Select the calendar element
document.addEventListener('DOMContentLoaded', (event) => {
    const calendar = document.querySelector('.calendar');
    const draggableEvent = document.getElementById('draggable-event');

    draggableEvent.addEventListener('dragstart', dragStart);
    
    // Generate the calendar slots with time slots
    generateCalendarSlots(calendar);

    // Highlight drop slots when dragging
    highlightDropSlots(true);

    // Remove highlight from drop slots when not dragging
    draggableEvent.addEventListener('dragend', () => highlightDropSlots(false));
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => e.target.classList.add('hide'), 0);
}

function generateCalendarSlots(calendar) {
    const timeSlots = ['8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm','6 pm','7 pm']; // example time slots
    timeSlots.forEach((time, index) => {
        // Create a time slot label
        const timeLabel = document.createElement('div');
        timeLabel.className = 'time-slot';
        timeLabel.textContent = time;
        calendar.appendChild(timeLabel);

        for (let j = 0; j < 7; j++) { // 7 days of the week
            const slot = document.createElement('div');
            slot.className = 'day-slot';
            slot.dataset.time = `${time}-${index}`; // Assign a time to each slot for identification
            slot.addEventListener('dragover', dragOver);
            slot.addEventListener('dragleave', dragLeave);
            slot.addEventListener('drop', drop);
            calendar.appendChild(slot);
        }
    });
}

function highlightDropSlots(highlight) {
    const slots = document.querySelectorAll('.day-slot');
    slots.forEach(slot => {
        if (highlight) {
            slot.addEventListener('dragover', () => slot.classList.add('highlight'));
        } else {
            slot.classList.remove('highlight');
            slot.removeEventListener('dragover', () => slot.classList.add('highlight'));
        }
    });
}

function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('highlight');
}

function dragLeave(e) {
    e.currentTarget.classList.remove('highlight');
}

function drop(e) {
    e.preventDefault();
    const draggableElementId = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(draggableElementId);
    draggableElement.classList.remove('hide');


    this.appendChild(draggableElement);

    // Remove highlight from all slots
    highlightDropSlots(false);
}