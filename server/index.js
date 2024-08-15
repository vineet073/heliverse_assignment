const express=require('express');
const index=express();

const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const classroomRoutes = require("./routes/classroomRoutes");

const {dbConnect}=require("./configurations/database");
dbConnect();
const cloudinary=require("./configurations/cloudinaryUploader");
cloudinary.cloudinaryConnect();

require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

index.use(express.json());
index.use(cookieParser());

index.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

index.use(
	cors({
		origin: '*',
		methods: '*',
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	  })
)

const PORT = process.env.PORT || 6506;

index.use("/api/v1/auth", userRoutes);
index.use("/api/v1/profile", accountRoutes);
index.use("/api/v1/classroom", classroomRoutes);

index.get("/", (req,res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

index.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})


