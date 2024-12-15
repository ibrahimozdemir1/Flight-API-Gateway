const express = require('express');
const app = express();
const port = 4001;

app.use(express.json());

let flights = [];

app.post('/api/admin/flight', (req, res) => {
    const { flightNumber, from, to, date, availableSeats } = req.body;

    if (!flightNumber || !from || !to || !date || !availableSeats) {
        return res.status(400).send('Missing required flight information');
    }

    const newFlight = {
        flightNumber,
        from,
        to,
        date,
        availableSeats,
    };

    flights.push(newFlight);
    console.log('Flight added:', newFlight);
    res.status(201).send(`Flight ${flightNumber} created successfully`);
});

app.listen(port, () => {
    console.log(`Admin Service is listening on port ${port}`);
});