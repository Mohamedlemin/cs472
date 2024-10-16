import express from "express"
import studentRouter from './route/studentRoute.js'

const app = express();

app.set("port", process.env.PORT || 3000);
const port = app.get("port");


app.use('/api/v1/students', studentRouter)



app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported' });
})

app.use((err, req, res, next) => {
    if (err.message === 'NOT Found')
        res.status(404).json({ error: err.message });
    else
        res.status(500).json({ error: 'Something went wrong. ' + err.message });
})


app.listen(port, () => console.log('The server has started at ' + port))