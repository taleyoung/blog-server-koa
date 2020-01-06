import Koa from "koa";
import tagService from "../services/tag";
import returnBody from "../utils/returnBody";

export default class TagController {
  static async show(ctx) {
    const res = await tagService.getTagNameList();
    returnBody(ctx, 200, res);
  }
}
