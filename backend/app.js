import express from "express";
import connectDB from "./src/config/mongodb.js";
import dotenv from "dotenv";
import cors from "cors";
import ApiRoutes from "./src/routes/ApiRoutes.js";
import AuthRoutes from "./src/routes/AuthRoutes.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/rents", ApiRoutes);
app.use("/api/users", AuthRoutes);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port http://localhost:5000");
  });
});

export default app;

// app.get("api/rents", (req, res) => {
//   res.status(200).send("you successfully get rents");
//   req.body(title, description);
// });

// app.getById("api/rents/:id", (req, res) => {
//   res.status(201).json({ message: "You've successfully get a rent" });
// });

// app.post("api/rents", (req, res) => {
//   res.status(200).json({ message: "You've successfully post another rent" });
// });

// app.put("api/rents/:id", (req, res) => {
//   res.status(200).json({ message: "You've successfully edited a rent" });
// });

// app.delete("api/rents/:id", (req, res) => {
//   res.status(200).json({ message: "You've successfully deleted a rent " });
// });
