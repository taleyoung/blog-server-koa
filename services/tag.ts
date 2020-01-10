import * as tagModel from "../models/tag";

const getTagNameList = async () => {
  try {
    const res = await tagModel.show();
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

const addTagArticle = async (tagName: string, articleId: number) => {
  try {
    const res = await tagModel.addTagArticle(tagName, articleId);
    if (res.affectedRows === 1) {
      return res;
    }
  } catch (error) {
    console.log("error :", error);
  }
};

export default { getTagNameList, addTagArticle };
