const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['content-type'],
    }
});
const connectToMongo = require('./db');
const Data = require('./model/Data');



connectToMongo();

const port = 5000

app.use(express.json())


//----------------------------fetching Data----------------------------//


io.on('connection', async (socket) => {
    
    console.log('socket connected');
    const data = await Data.find();
    socket.emit('tempdata', data);

})


//---------------------------Adding Data------------------------------//

app.post('/adddata', async (req, res) => {
    try {

        let data2 = await Data[0];
        const { temp, humidity, pressure, date } = req.body;

        const data = new Data({
            temp, humidity, pressure, date
        })

        const saveData = await data.save()
        const deleted_data = await Data.deleteOne(data2)

        res.json({ saveData,"Deleted": "Data has been deleted successfully", deleted_data: deleted_data});

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
})


server.listen(port, () => {
    console.log(`server is listening at port ${port}`);
});