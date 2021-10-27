const express = require('express')
const mongoose = require('mongoose')
const Journal = require('./models/journal')
const methodOverride = require('method-override')
const journalSeed =  require('./models/seed.js')
require('dotenv').config()

const PORT = process.env.PORT
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.redirect('/journal')

})

app.get('/journal/new', (req, res) => {
    res.render('new.ejs')
});


app.post('/journal', (req, res) => {
    Journal.create(req.body, (error, adedJournal) => {
        console.log(error);
        res.redirect('/journal')
    });

});

app.get('/seed', (req, res) => {
    Journal.deleteMany({}, ()=> {});
    Journal.create(journalSeed, (error, data) => {

        error ? res.status(400).json(error) : res.status(200).json(data);
    });
})

app.get('/journal', (req, res) => {
    Journal.find({}, (err, allJournals) => {
        res.render('index.ejs', {journals: allJournals})
    })

})

app.get('/journal/:id', (req, res) => {
    Journal.findOne({_id: req.params.id}, (err, journal) => {
        res.render('show.ejs', {journal: journal})
    })
})

app.get('/journal/:id/edit', (req, res) => {
    Journal.findById({_id: req.params.id}, (err, journal) => {
        res.render('edit.ejs', {journal: journal})
    })
})

app.put('/journal/:id', (req, res) => {
    console.log(req.body);
    Journal.findOneAndUpdate({_id: req.params.id}, req.body, (err, journal) => {
        res.redirect('/journal/' + req.params.id)
    })
})

app.delete('/journal/:id', (req, res) => {
    Journal.remove({_id: req.params.id}, (err, journal) => {
        console.log(err);
        res.redirect('/journal');
    })
})








app.listen(PORT, () =>  {
    console.log(`I'm listening`);
})

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('connected to mongod');
});
