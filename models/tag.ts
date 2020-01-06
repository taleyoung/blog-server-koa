import * as db from "../utils/db-util";

const show = async () => {
  const _sql = `SELECT id,name FROM tag`;
  return db.query(_sql);
};
export { show };
