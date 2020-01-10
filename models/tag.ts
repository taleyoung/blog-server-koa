import * as db from "../utils/db-util";

const show = async () => {
  const _sql = `SELECT id,name FROM tag`;
  return db.query(_sql);
};
const addTagArticle = async (tagName: string, articleId: number) => {
  const _sql = `INSERT INTO tag_article(tag_id, article_id) 
                VALUES((SELECT tag.id FROM tag WHERE name=?),?)`;
  return db.query(_sql, [tagName, articleId]);
};

const deleteTagArticleByArticleId = async (articleId: number) => {
  const _sql = `DELETE 
                FROM tag_article TA
                WHERE TA.article_id = ?
                `;
  return db.query(_sql, [articleId]);
};
export { show, addTagArticle, deleteTagArticleByArticleId };
