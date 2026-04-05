import express from "express";

const app = express();
const port = 3000;

app.get("/user/:id", (req, res) => {
  const p = req.params;
  console.log("params >>>", p);
  const q = req.query;
  console.log("query >>>", q);

  res.send("화면에 나오는 글자");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
