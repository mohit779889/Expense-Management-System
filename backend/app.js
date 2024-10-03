// Import statements (using import for Node.js v14+)
import express from 'express';
import cors from 'cors';
import { connectDB } from './DB/Database.js'; // Assuming this is a function for database connection
import bodyParser from 'body-parser'; // Use destructuring for a cleaner approach
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import transactionRoutes from './Routers/Transactions.js'; // Assuming these are your transaction routes
import userRoutes from './Routers/userRouter.js'; // Assuming these are your user routes
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// If your current file's URL is `import.meta.url`
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables (ensure .env file is excluded from version control)
dotenv.config({ path: './config/config.env' });

const { json, urlencoded } = bodyParser;
const app = express();
// Port configuration (consider using a default port if not defined in .env)
const port = process.env.PORT || 5000; // 5000 as a fallback

// Connect to database (assuming connectDB is your function)
connectDB();

// CORS configuration (adjust allowed origins based on your needs)
const allowedOrigins = [
  "http://localhost:3000" // Replace with your production domain(s)
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Security middleware (consider customizing helmet options for production)
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Logging middleware (use a more concise logging format in production)
app.use(morgan('dev')); // Change to 'combined' or 'common' for production

// Body parser middleware (use only the necessary parsers)
app.use(json()); // Parse JSON bodies
app.use(urlencoded({ extended: false })); // Parse URL-encoded bodies (if needed)

// Router usage
app.use('/api/v1', transactionRoutes);
app.use('/api/auth', userRoutes);

// Error handling middleware (consider using a more robust error handler)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).send('Something went wrong!'); // Send a generic error response
});

// --------------------------deployment------------------------------

const NODE_ENV = process.env.NODE_ENV || "production";

// Resolve the directory for static assets
const buildPath = path.resolve(__dirname, "../frontend/build");

if (NODE_ENV === "production") {
  // Serve static files from the React application
  app.use(express.static(buildPath));

  // Serve the React application index.html on all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  // A simple endpoint to check if the API is running
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
  console.log(`Server running in ${NODE_ENV} mode`);
}

// Start the server (consider using a process manager like PM2 in production)
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
