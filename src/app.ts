import express from 'express'

import { routes } from './routes'

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(routes)


app.listen(3333, () => console.log('Running on port 3333'))