import express from "express";
import reconcilationRoute from "./routes/reconcile.routes";
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
//my routes

app.use("/api/v1", reconcilationRoute);

export { app };
