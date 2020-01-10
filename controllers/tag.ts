import Koa from "koa";
import tagService from "../services/tag";
import returnBody from "../utils/returnBody";

export default class TagController {
  static async show(ctx: Koa.DefaultContext) {
    const res = await tagService.getTagNameList();
    returnBody(ctx, 200, res);
  }

  static async add(ctx: Koa.DefaultContext) {
    try {
      const { tagName, articleId } = ctx.request.body;
      const res = await tagService.addTagArticle(tagName, articleId);
      returnBody(ctx, 200, res);
    } catch (error) {
      returnBody(ctx, 404, {});
    }
  }
}
