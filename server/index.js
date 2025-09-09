require("dotenv").config();
const cors = require("cors");
const app = require("./app");
const PORT = process.env.PORT || 4000;
app.use(cors());

app.listen(4000, () =>
  console.log("🚀 Server running on http://localhost:4000")
);


