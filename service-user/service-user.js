const express = require('express');
const axios = require('axios');
const app = express();
const port = 4002;

app.use(express.json());

const flights = [
    { flightNumber: 'AB123', availableSeats: 100 },
    { flightNumber: 'CD456', availableSeats: 100 },
    { flightNumber: 'EF789', availableSeats: 100 }
];

app.post('/api/user/reserv/:flightNumber', async (req, res) => {
    const { flightNumber } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    try {
        const flight = flights.find(flight => flight.flightNumber === flightNumber);

        if (!flight) {
            return res.status(404).send('Flight not found');
        }

        if (flight.availableSeats <= 0) {
            return res.status(400).send('Flight is unavailable');
        }

        const paymentResponse = await axios.post('http://service-payment:4003/api/payment', {
            flightNumber,
            userId,
            amount: 150
        });

        res.status(200).send('Flight reserved, ready for payment');
    } catch (error) {
        console.error('Error during flight purchase:', error);
        res.status(500).send('Something went wrong');
    }
});

app.listen(port, () => {
    console.log(`User Service is listening on port ${port}`);
});
