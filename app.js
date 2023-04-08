import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import profile from './routes/profile.js';
import auth from './routes/auth.js';
import event from './routes/event.js';
import admin from './routes/admin.js';
import cookieParser from "cookie-parser";
import path from "path";
const __dirname = path.resolve();
dotenv.config();


//app

const app = express();

app.use(cors({origin:true,credentials:true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

//db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {return "db connected successfully"})
.catch((err)=>{return err.message})
// .then(() => console.log('db connected'))
// .catch((err)=>console.log('err',err))

// static files
app.use(express.static(path.join(__dirname,"./client/dist")))
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,"./client/dist/index.html"));
})


//midleware
app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'));

//routes
// app.use('/',user);
app.use('/',profile);
app.use('/',auth);
app.use('/',event);
app.use("/",admin);

//port
const port = process.env.PORT || 8080;
//listener

const server = app.listen(port,()=>{ return port});

