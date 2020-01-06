import * as tagModel from "../models/tag";

const getTagNameList = async () => {
  try {
    const res = await tagModel.show();
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export default { getTagNameList };
