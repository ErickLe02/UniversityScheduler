async function displayClasses() {
    try {
        const response = await fetch('/getData');
        const data = await response.json();
        const container = document.getElementById('classList');

        data.forEach((item, index) => {
            document.getElementById("classList").innerHTML += `<tr><td>${item['department']}</td>
                                                                <td>${item['courseName']}</td>
                                                                <td>${item['weekDays']}</td>
                                                                <td>${item['startTime']}</td>
                                                                <td>${item['endTime']}</td>
                                                                <td>${item['courseLocation']}</td>
                                                                <td>${item['maxCapacity'] - item['currentCapacity']}</td>
                                                                <td><button onclick="addClass(${item['courseId']})">Add Class</button></td>
                                                                <td><button onclick="dropClass(${item['courseId']})">Drop Class</button></td></tr>`;

        });
    } catch (error) {
        console.error('There was an error fetching the data: ', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayClasses();
});

async function addClass(id) {
    try {
        const response = await fetch('/copyRow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error copying row:', error);
    }
}

async function dropClass(id) {
    try {
        const response = await fetch('/deleteRow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log(result);
        } else {
            console.error('Error deleting row:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting row:', error);
    }
}

function schedulePage() {
    window.location.href = 'http://localhost:3000';
}