const express=require('express')
const path=require('path')
const app=express()
const port=80;
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DanceWebsite2',{useNewUrlParser:true})

var contactschema=new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    address:String,
    
})
var contact=mongoose.model('DanceWebsite1',contactschema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.pug', params);
})
app.post('/',(req,res)=>{    //npm install body-parser
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send('The data has been successfully saved');
    }).catch(()=>{
        res.status(404).send("Item can't be shared to the database")
    })
console.log(req.body)
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});