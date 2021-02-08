const moongose = require('mongoose')

moongose.connect('mongodb://Localhost/mean-clients', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(db => console.log('Db is connected'))
    .catch(err => console.error(err))
