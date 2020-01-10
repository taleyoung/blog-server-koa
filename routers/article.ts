// const Router = require("koa-router");
import Router from "koa-router";
const article = new Router({ prefix: "/article" });
import ArticleController from "../controllers/article";

article.get("/current", ArticleController.showCurrent);
article.get("/briefList", ArticleController.showBriefList);
article.get("/:id?", ArticleController.show);
article.post("/", ArticleController.add);
article.delete("/:id", ArticleController.delete);
article.put("/:id", ArticleController.update);

export default article;
