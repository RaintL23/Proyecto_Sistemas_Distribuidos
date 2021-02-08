require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const Pusher = require('pusher');

const app = express()

app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const pusher = new Pusher({
//     appId: process.env.PUSHER_APP_ID,
//     key: process.env.PUSHER_APP_KEY,
//     secret: process.env.PUSHER_APP_SECRET,
//     cluster: process.env.PUSHER_APP_CLUSTER,
    
// });

const pusher = new Pusher({
    appId: "1149328",
    key: "065c603084ee91b0ad37",
    secret: "b171e63f1563ab977748",
    cluster: "us2",
    useTLS: true
});
  
app.post('/pusher/trigger', (req, res) => {
    const channel_name = req.body.channel_name;
    const event_name = req.body.event_name;
    const data = req.body.data;

    console.log(channel_name);
    console.log(event_name);
    console.log(data);

    pusher.trigger(channel_name, event_name, data);

    res.status(200).send(data)
})

pusher.trigger('my-channel', 'myevent', {
    "message": "hello world from server 1"
});

pusher.trigger('clients-channel', 'myevent', {
    "message": "hello world from server 2"
});

app.use(require('./routes/clients.routes'));

module.exports = app;