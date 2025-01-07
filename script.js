// Example bus data with departure and arrival times
const buses = [
    { id: 1, number: "120A", source: "Hyderabad", destination: "Secunderabad", availableSeats: 5, departureTime: "22:00", arrivalTime: "23:00", passengers: [] },
    { id: 2, number: "220B", source: "Hyderabad", destination: "Gachibowli", availableSeats: 2, departureTime: "09:30", arrivalTime: "10:00", passengers: [] },
    { id: 3, number: "330C", source: "Hyderabad", destination: "Kukatpally", availableSeats: 10, departureTime: "10:00", arrivalTime: "11:30", passengers: [] },
    { id: 4, number: "440D", source: "Hyderabad", destination: "Gachibowli", availableSeats: 7, departureTime: "13:00", arrivalTime: "13:45", passengers: [] },
    { id: 5, number: "550E", source: "Hyderabad", destination: "Secunderabad", availableSeats: 1, departureTime: "15:00", arrivalTime: "16:00", passengers: [] }
];

// Function to search for available buses based on the input source and destination
function searchBuses() {
    const source = document.getElementById('source').value.trim().toLowerCase();
    const destination = document.getElementById('destination').value.trim().toLowerCase();
    const currentTime = new Date().toISOString().slice(11, 16); // Current time in HH:MM format

    // Validate inputs
    if (!source || !destination) {
        alert('Please fill in both source and destination.');
        return;
    }

    // Filter buses based on source, destination, and departure time after current time
    const filteredBuses = buses.filter(bus =>
        bus.source.toLowerCase().includes(source) &&
        bus.destination.toLowerCase().includes(destination) &&
        bus.departureTime > currentTime // Only show buses departing after current time
    );

    // Sort buses by departure time
    filteredBuses.sort((a, b) => {
        return new Date("1970/01/01 " + a.departureTime) - new Date("1970/01/01 " + b.departureTime);
    });

    const busList = document.getElementById('busList');
    busList.innerHTML = ""; // Clear previous results

    if (filteredBuses.length > 0) {
        filteredBuses.forEach(bus => {
            const busItem = document.createElement('div');
            busItem.className = 'bus-item';
            busItem.innerHTML = `
                <h3>Bus Number: ${bus.number}</h3>
                <p>Source: ${bus.source}</p>
                <p>Destination: ${bus.destination}</p>
                <p>Departure Time: ${bus.departureTime}</p>
                <p>Arrival Time: ${bus.arrivalTime}</p>
                <p>Available Seats: ${bus.availableSeats}</p>
                <p>Waiting Passengers: ${bus.passengers.length}</p>
                <button class="action-button" onclick="bookSeat(${bus.id})">Book Seat</button>
            `;
            busList.appendChild(busItem);
        });
    } else {
        busList.innerHTML = "<p>No buses found for the requested route at this time.</p>";
    }
}

// Function to book a seat on a bus
function bookSeat(busId) {
    const bus = buses.find(b => b.id === busId);

    if (bus && bus.availableSeats > 0) {
        bus.availableSeats -= 1; // Reduce available seats
        bus.passengers.push({ source: bus.source, destination: bus.destination }); // Add passenger to the list
        alert(`Seat booked on Bus ${bus.number}. Remaining Seats: ${bus.availableSeats}`);
        searchBuses(); // Refresh the bus list after booking
    } else {
        alert(`No seats available on Bus ${bus.number}.`);
    }
}

// Function to handle bus request
function requestBus() {
    const source = document.getElementById('passengerSource').value.trim();
    const destination = document.getElementById('passengerDestination').value.trim();

    if (!source || !destination) {
        alert('Please fill in both source and destination.');
        return;
    }

    const currentTime = new Date().toISOString().slice(11, 16); // Get current time in HH:MM format

    // Filter buses based on source, destination, and departure time after current time
    const filteredBuses = buses.filter(bus =>
        bus.source.toLowerCase().includes(source.toLowerCase()) &&
        bus.destination.toLowerCase().includes(destination.toLowerCase()) &&
        bus.departureTime > currentTime // Only show buses departing after current time
    );

    const busList = document.getElementById('busList');
    busList.innerHTML = ""; // Clear previous results

    if (filteredBuses.length > 0) {
        filteredBuses.forEach(bus => {
            const busItem = document.createElement('div');
            busItem.className = 'bus-item';
            busItem.innerHTML = `
                <h3>Bus Number: ${bus.number}</h3>
                <p>Source: ${bus.source}</p>
                <p>Destination: ${bus.destination}</p>
                <p>Departure Time: ${bus.departureTime}</p>
                <p>Arrival Time: ${bus.arrivalTime}</p>
                <p>Available Seats: ${bus.availableSeats}</p>
                <p>Waiting Passengers: ${bus.passengers.length}</p>
            `;
            busList.appendChild(busItem);
        });
    } else {
        busList.innerHTML = "<p>No available buses for the requested journey at this time.</p>";
    }
}
