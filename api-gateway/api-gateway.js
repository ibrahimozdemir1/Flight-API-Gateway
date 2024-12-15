const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer();

const serviceAdminUrl = 'http://service-admin:4001';
const serviceUserUrl = 'http://service-user:4002';
const servicePaymentUrl = 'http://service-payment:4003';

// Middleware for logging
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use('/api/admin', (req, res) => {
    proxy.web(req, res, { target: serviceAdminUrl }, (err) => {
        console.error(`Error forwarding request to service admin: ${err.message}`);
        res.status(500).send('Internal Server Error');
    });
});

app.use('/api/user', (req, res) => {
    proxy.web(req, res, { target: serviceUserUrl }, (err) => {
        console.error(`Error forwarding request to service user: ${err.message}`);
        res.status(500).send('Internal Server Error');
    });
});

app.use('/api/payment', (req, res) => {
    proxy.web(req, res, { target: servicePaymentUrl }, (err) => {
        console.error(`Error forwarding request to service payment: ${err.message}`);
        res.status(500).send('Internal Server Error');
    });
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    console.log(`Forwarding request to ${options.target}: ${req.method} ${req.url}`);
});

const port = 3000;
app.listen(port, () => {
    console.log(`API Gateway listening on port ${port}`);
});

