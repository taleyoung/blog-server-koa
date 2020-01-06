import Router from "koa-router";
const router = new Router({ prefix: "/api/v1" });
import articleRouter from "./article";
import tagRouter from "./tag";

router.use(articleRouter.routes()).use(articleRouter.allowedMethods());
router.use(tagRouter.routes()).use(tagRouter.allowedMethods());

export default router;
