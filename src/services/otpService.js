const accountSid = 'AC7cec05cb6bbe5498d3b10e558bc2cb48';
const authToken = 'ea22453c3619cd78babf7e43a225df3d';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body:"This is from thin pandam Your otp is",
                from: '+12295972843',
        to: '+919087397440'
    })
    .then(message => console.log(message.sid))
    .done();