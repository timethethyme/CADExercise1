const express = require('express');
const ejs = require('ejs')
const path = require('path')

const app = express();

app.set('view engine', 'ejs')

//Set path for frontend views
const view_path = path.join(__dirname, '/..', '/frontend')
app.set('views', view_path)
app.use(express.static(view_path))

const image_path = path.join(__dirname, '/..', '/assets')
app.use('/images',  express.static(image_path))


app.get('/', (req, res) => res.render('index'))
app.get('/upload', (req, res) => res.render('upload'))

const port = 3000;
app.listen(port, () => console.log('Running'))
