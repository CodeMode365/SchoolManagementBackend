import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/SchoolDb";

mongoose.connect(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err: Error) => {
  console.error("Error connecting to MongoDB:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

export { db };
