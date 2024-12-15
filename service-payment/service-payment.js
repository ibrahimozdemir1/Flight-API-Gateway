const express = require('express');
const app = express();
const port = 4003;

app.use(express.json());

let paymentStatus = {};

app.post('/api/payment', (req, res) => {
    const { flightNumber, userId, amount } = req.body;

    if (!flightNumber || !userId || !amount) {
        return res.status(400).send('Missing required payment information');
    }

    console.log(`Payment processed for user ${userId} for flight ${flightNumber} with amount ${amount}`);

    paymentStatus[userId] = {
        flightNumber,
        status: 'Enjoy your flight!'
    };

    res.status(200).send('Payment successful. Check-in complete.');
});

app.get('/api/payment/:userId', (req, res) => {
    const { userId } = req.params;

    if (paymentStatus[userId]) {
        return res.status(200).send(paymentStatus[userId].status);
    } else {
        return res.status(404).send('No payment found for this user');
    }
});

app.listen(port, () => {
    console.log(`Payment Service is listening on port ${port}`);
});