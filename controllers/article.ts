import Koa from "koa";
import articleService from "../services/article";
import returnBody from "../utils/returnBody";

export default class ArticleController {
  static async show(ctx: Koa.DefaultContext) {
    try {
      const { id } = ctx.params;
      const { page, page_size, order, cate } = ctx.request.query;
      console.log("TTTobject", ctx.request.query);
      console.log("TTTcate", cate);
      const res = id
        ? await articleService.getArticleDetail(parseInt(id))
        : await articleService.getArticleList(
            parseInt(page),
            parseInt(page_size),
            order,
            cate
          );
      returnBody(ctx, 200, res);
    } catch (error) {
      returnBody(ctx, 404);
    }
  }

  static async add(ctx: Koa.DefaultContext) {
    try {
      const { title, content, category, tags } = ctx.request.body;
      const res = await articleService.insertArticle(
        title,
        content,
        tags,
        category
      );
      returnBody(ctx, 200, res);
    } catch (error) {
      returnBody(ctx, 404);
    }
  }

  static async delete(ctx: Koa.DefaultContext) {
    try {
      const { id } = ctx.params;
      const res = await articleService.deleteArticle(id);
      returnBody(ctx, 200, res);
    } catch (error) {
      returnBody(ctx, 404);
    }
  }

  static async update(ctx: Koa.DefaultContext) {
    try {
      const { id } = ctx.params;
      const { title, content, tags } = ctx.request.body;
      const res = await articleService.updateArticle(id, title, content, tags);
      returnBody(ctx, 200, res);
    } catch (error) {
      console.log("error :", error);
      returnBody(ctx, 404);
    }
  }
}
