import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import corsOptions from "./config/cors/corsOptions";
import { engine } from "express-handlebars";
import path from "path";

const app: Express = express();

// View Engine Setup (Templates)
// View engine setup
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "templates/layouts"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates"));

// Basic Middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Main Page Route
app.get("/", (_req, res) => {
  res.render("landing", {
    title: "API Documentation",
    description: "Modern Authentication System API",
  });
});

// API Routes

// Error Handler

export default app;
