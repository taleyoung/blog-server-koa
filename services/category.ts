import * as categoryModel from "../models/category";

const getCateList = async () => {
  try {
    const res: Array<string> = await categoryModel.getCateList();
    return { data: res };
  } catch (error) {
    console.log("error", error);
  }
};

export default {
  getCateList
};
