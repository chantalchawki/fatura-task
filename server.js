import express from "express";
import router from "./controller.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(3000);
