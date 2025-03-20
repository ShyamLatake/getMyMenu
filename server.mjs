import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import expressLayouts from "express-ejs-layouts";
import ejsLayouts from "express-ejs-layouts";

import authRoutes from "./routes/authRoutes.mjs";
import restaurantRoutes from "./routes/restaurantRoutes.mjs";
import menuRoutes from "./routes/menuRoutes.mjs";
import dotenv from 'dotenv'

dotenv.config()

const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(expressLayouts);
app.use(ejsLayouts);

// Connect to Database
connectDB();

// For ejs
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", "views"); 

app.use(express.static("public"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
