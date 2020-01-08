import Koa from "koa";
import categoryService from "../services/category";
import returnBody from "../utils/returnBody";

export default class CategoryController {
  static async show(ctx: Koa.DefaultContext) {
    try {
      const res = await categoryService.getCateList();
      returnBody(ctx, 200, res);
    } catch (error) {
      returnBody(ctx, 404);
    }
  }
}
