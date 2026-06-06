require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Initialize Database
connectDB();

// Dynamic CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin 
    if (!origin) return callback(null, true);

    if (
      origin.startsWith("http://localhost:") ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS policy"));
    }
  },
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Origin",
    "Accept",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running perfectly.");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR LOG:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong on the server.",
  });
});

// Only listen on a port if running LOCALLY. Vercel handles the ports in production.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
}

module.exports = app;