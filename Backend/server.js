const app = require("./app");
const dotenv = require("dotenv");
const { connectDB } = require("./Config/Config.DB");

//config
dotenv.config({ path: "Backend/Config/.env" });

//Db
connectDB();

//Server running
app.listen(process.env.PORT, () => {
  console.log(
    `Server is up and running! Access it at http://localhost:${process.env.PORT}`
  );
});
