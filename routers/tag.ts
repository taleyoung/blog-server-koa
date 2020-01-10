import Router from "koa-router";
const tag = new Router({ prefix: "/tag" });
import TagController from "../controllers/tag";

tag.get("/", TagController.show);
tag.post("/", TagController.add);

export default tag;
