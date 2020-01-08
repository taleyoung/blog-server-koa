import Router from "koa-router";
const category = new Router({ prefix: "/category" });
import CategoryController from "../controllers/category";

category.get("/", CategoryController.show);

export default category;
