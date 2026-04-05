import express from "express";

const app = express();
const port = 3000;

// HTML을 보기 좋게 줄바꿈해서 출력
app.locals.pretty = true;

// 템플릿 엔진 - views 폴더 안의 .pug 파일을 렌더링
app.set("view engine", "pug");
app.set("views", "./views");

// body 파싱 - JSON 요청 / HTML form 데이터
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// views/form.pug 파일을 화면에 렌더링
app.get("/form", (req, res) => {
  res.render("form");
});

// 폼에서 보낸 데이터를 body로 받음
app.post("/form_receiver", (req, res) => {
  console.log(req.body);
  var title = req.body.title;
  var description = req.body.description;
  res.send("POST: " + title + ", " + description);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
