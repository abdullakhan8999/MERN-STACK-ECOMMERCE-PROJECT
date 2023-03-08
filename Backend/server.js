const app = require("./app");
const dotenv = require("dotenv");
const { connectDB } = require("./Config/ConfigDB");

//config
dotenv.config({ path: "Backend/Config/.env" });

//uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Message: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});

//Db
connectDB();

//Server running
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is up and running! Access it at http://localhost:${process.env.PORT}`
  );
});

//Checking uncaught exceptions
// console.log(abdul)

//unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Message: ${err.message}`);
  console.log("Shutting down server due to unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
