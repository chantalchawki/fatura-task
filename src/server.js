import express from "express";
import router from "./controller.js";
import pagination from "./pagination-middleware.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(pagination);
app.use(router);

app.listen(3000, () => {
  console.log("Application started on port 3000");
});
