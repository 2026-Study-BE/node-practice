import express from "express";
const app = express();
const port = 3000;

// 템플릿 엔진 세팅
app.locals.pretty = true;
app.set("views", "./views");
app.set("view engine", "pug");

// body 파싱 - JSON 요청 / HTML form 데이터
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/topic/new", (req, res) => {
  res.render("new");
});
app.post("/topic", (req, res) => {
  res.send("Hipost");
});

// 서버 연결
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/topic/new`);
});
