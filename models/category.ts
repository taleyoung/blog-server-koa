import * as db from "../utils/db-util";

const getCateList = async () => {
  const _sql = `SELECT DISTINCT category
                FROM article`;
  return db.query(_sql);
};
export { getCateList };
