import express from "express";
import { writeFile, readFile, readdir } from "fs/promises";
const app = express();
const port = 3000;

// 템플릿 엔진 세팅
app.locals.pretty = true;
app.set("views", "./views");
app.set("view engine", "pug");

// body 파싱 - JSON 요청 / HTML form 데이터
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 등록 페이지
app.get("/topic/new", async (req, res) => {
  const files = await readdir("data");
  res.render("new", { topics: files });
});
// 조회 페이지 (상세, 목록)
app.get(["/topic", "/topic/:id"], async (req, res) => {
  try {
    const files = await readdir("data");

    var id = req.params.id;

    if (id) {
      // 상세 페이지
      const data = await readFile("data/" + id, "utf8");
      res.render("view", { topics: files, title: id, description: data });
    } else {
      // 목록 페이지
      res.render("view", { topics: files });
    }
  } catch (err) {
    console.error("err: ", err);
    res.status(500).send("Internal Server Error");
  }
});
// 등록 api
app.post("/topic", async (req, res) => {
  var title = req.body.title;
  var description = req.body.description;

  try {
    await writeFile("data/" + title, description);
    res.redirect("/topic/" + title);
  } catch (err) {
    console.error("err: ", err);
    res.status(500).send("Internal Server Error");
  }
});

// 서버 연결
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/topic/new`);
});
