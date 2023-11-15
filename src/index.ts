import express from 'express'
import manejoRutas from './routes/indexRoutes'


const app = express()
app.use(express.json()) //middleware

const PORT = 3000

app.get('/test', (req, res) => {    
    console.log("hello world");
    res.send('V 1.1')
})

app.use('/api', manejoRutas);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
