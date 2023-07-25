import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from './routes/posts.js';
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is runing on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use('/posts',postRoutes);
