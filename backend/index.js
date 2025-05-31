// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";

// dotenv.config({});

// const app = express();



// const allowedOrigins = [
//     'http://localhost:5173',
//     'https://techhire-portal-frontend.onrender.com',
// ];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
// }));




// // const corsOptions = {
//     //     origin:'http://localhost:5173',
//     //     credentials:true
//     // }
    
//     // app.use(cors(corsOptions));
    
//     // middleware
//     app.use(express.json());
//     app.use(express.urlencoded({extended:true}));
//     app.use(cookieParser());

// const PORT = process.env.PORT || 8000;

// // api's
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);


// app.listen(PORT,()=>{
//     connectDB();
//     console.log(`Server running at port ${PORT}`);
// })





import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://techhire-portal-frontend.onrender.com',
];

// 1. Enable CORS for all OPTIONS requests (preflight)
app.options('*', cors({
    origin: function (origin, callback) {
        console.log('Preflight request from origin:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// 2. Enable CORS for all other requests
app.use(cors({
    origin: function (origin, callback) {
        console.log('CORS request from origin:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// 3. Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4. API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// 5. Error handling middleware for CORS errors
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: 'CORS Error: This origin is not allowed' });
    }
    next(err);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
