import Router from "koa-router";
const router = new Router({ prefix: "/blog" });
import articleRouter from "./article";
import tagRouter from "./tag";
import cateRouter from "./category";

router.use(articleRouter.routes()).use(articleRouter.allowedMethods());
router.use(tagRouter.routes()).use(tagRouter.allowedMethods());
router.use(cateRouter.routes()).use(cateRouter.allowedMethods());

export default router;
