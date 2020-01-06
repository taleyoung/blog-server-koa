import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import cors from "koa2-cors";
import router from "./routers/index";

const dev = process.env.NODE_ENV !== "production";

const server = new Koa();

server
  .use(cors())
  .use(bodyParser())
  .use(logger());

server.use(router.routes()).use(router.allowedMethods());

server.listen(8080, () => {
  console.log("server-koa server listening on 8080");
});
