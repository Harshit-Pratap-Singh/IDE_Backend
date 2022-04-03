const express = require("express");
const { executeCpp, executePy, executeJava } = require("./execute");
const app = express();
const PORT = 3000;
const { generateFile } = require("./generateFile");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //middleware to parse the json body part

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.post("/run", async (req, res) => {
  try {
    const { language = "cpp", code, input } = req.body;
    console.log("input==>", input);
    if (code === undefined) {
      res.status(400).json({
        status: "failed",
        error: "empty code body!!!",
      });
    }
    //need to create a code file and run it
    const filePath = await generateFile(language, code);
    //send the output
    let output;
    if (language === "cpp") output = await executeCpp(filePath, input);
    else if (language === "py") output = await executePy(filePath, input);
    else output = await executeJava(filePath, input);
    //
    //
    return res.json({ filePath, output });
  } catch (err) {
    console.log("Error==>", err);
    return res.status(500).json(err);
  }
});

app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log(err);
  else console.log("Server running at port==>", PORT);
});
