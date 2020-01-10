import * as articleModel from "../models/article";
import * as tagModel from "../models/tag";
import dayjs from "dayjs";
import { ArticleScheme } from "../typings/model";

interface ArticleModel {
  id: string;
  title: string;
  content: string;
  category: string;
  updated_at: dayjs.ConfigType;
  tags: { split: (arg0: string) => string[] };
}

interface Brief {
  id: number;
  title: string;
  createAt: string;
}

const getArticleList = async (
  page: number = 1,
  page_size: number = 10,
  order: "DESC" | "ASC" = "DESC",
  cate?: string
) => {
  try {
    const offset = (page - 1) * page_size;
    const res: Array<ArticleModel> = await articleModel.getArticleList(
      page_size,
      offset,
      true,
      cate
    );
    let list: Array<ArticleScheme> = [];
    res.forEach(item => {
      list.push({
        id: item.id,
        title: item.title,
        content: item.content.slice(0, 60) + "...",
        category: item.category,
        updatedAt: dayjs(item.updated_at).format("YYYY-MM-DD"),
        tags: item.tags.split(",")
      });
    });
    const total = await articleModel.getArticleCount(cate);
    return { data: list, total: total[0].num };
  } catch (error) {
    console.log("error", error);
  }
};

const getBriefList = async (page: number = 1, page_size: number = 10) => {
  try {
    const offset = (page - 1) * page_size;
    const res = await articleModel.getBrief(page_size, offset);
    let list: Array<Brief> = [];
    res.forEach((item: Brief) => {
      list.push({
        ...item,
        createAt: dayjs(item.createAt).format("YYYY-MM-DD")
      });
    });
    const total = await articleModel.getArticleCount();
    return { data: list, total: total[0].num };
  } catch (error) {
    console.log("error :", error);
  }
};

const getCurrent = async () => {
  try {
    const res = await articleModel.getBrief(5, 0);
    let list: Array<Brief> = [];
    res.forEach((item: Brief) => {
      list.push({
        ...item,
        createAt: dayjs(item.createAt).format("YYYY-MM-DD")
      });
    });
    return list;
  } catch (error) {
    console.log("error :", error);
  }
};

const getArticleDetail = async (id: number) => {
  try {
    const res = await articleModel.getArticleById(id);
    let detail: ArticleScheme = {
      id: res[0].id,
      title: res[0].title,
      content: res[0].content,
      category: res[0].category,
      updatedAt: dayjs(res[0].updated_at).format("YYYY-MM-DD HH:MM"),
      tags: res[0].tags.split(",")
    };
    return detail;
  } catch (error) {
    console.log("error", error);
  }
};

const insertArticle = async (
  title: string,
  content: string,
  category: string,
  tag: string
) => {
  try {
    const res = await articleModel.insert(title, content, category);
    if (res.affectedRows === 1) {
      const tagRes = await tagModel.addTagArticle(tag, res.insertId);
      if (tagRes) {
        return await getArticleDetail(res.insertId);
      }
    }
    return {};
  } catch (error) {
    console.log("error :", error);
  }
};

const deleteArticle = async (id: number) => {
  try {
    const res = await articleModel._delete(id);
    await tagModel.deleteTagArticleByArticleId(id);
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

const updateArticle = async (
  id: number,
  title: string,
  content: string,
  cate: string
) => {
  try {
    const res = await articleModel.update(id, title, content, cate);
    if (res.affectedRows === 1) {
      return await getArticleDetail(id);
    }
  } catch (err) {
    console.log("err", err);
  }
};
export default {
  getArticleList,
  getArticleDetail,
  insertArticle,
  deleteArticle,
  updateArticle,
  getBriefList,
  getCurrent
};
