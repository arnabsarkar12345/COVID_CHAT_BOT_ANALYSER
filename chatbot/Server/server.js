
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://blueberry:noodle@cluster0.x9rbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology:true

})

mongoose.connection.on('connected',() => {
    console.log("DB connected!");
})

const schema = mongoose.Schema;
const Chatschema = new schema({
    name : String,
    write: String
});

const Chat = mongoose.model("Chat", Chatschema);

app.get('/' ,(req,res) => {
    
    Chat.find({  })
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

});


app.get('/posts' ,(req,res) => {
    
    Chat.find({  })
    .then((posts) => {
        res.json(posts);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

});

app.post('/nugget',(req,res)=>{
    console.log(typeof(req.body.name));
    const createdentry = {
        name: req.body.name.toString(),
        write: req.body.write.toString(),
        created : new Date()
    };
    console.log(createdentry);
    const newChat = new Chat(createdentry);

    newChat.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // Chat
        return res.json({
            createdentry
        });
    });
});

app.listen(5000, () => {
    console.log("listening");
});