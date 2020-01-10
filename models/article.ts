import * as db from "../utils/db-util";

const getArticleList = async (
  limit: number,
  offset: number,
  desc?: boolean,
  cate?: string
) => {
  if (cate) {
    const _sql = `SELECT article.id, title, content, group_concat(tag.name) tags, category, article.created_at createdAt
            FROM tag, article, tag_article
            WHERE tag_article.article_id = article.id
              AND tag_article.tag_id = tag.id
              AND article.category=?
            GROUP BY article.id
            ORDER BY article.created_at DESC
            LIMIT ? OFFSET ?;`;
    return db.query(_sql, [cate, limit, offset]);
  } else {
    const _sql = `SELECT article.id, title, content, group_concat(tag.name) tags, category, article.created_at createdAt
              FROM tag, article,tag_article
              WHERE tag_article.article_id = article.id
                    AND tag_article.tag_id = tag.id
              GROUP BY article.id
              ORDER BY article.created_at DESC
              LIMIT ? OFFSET ?;`;
    return db.query(_sql, [limit, offset]);
  }
};

const getArticleById = async (id: number) => {
  let _sql = `SELECT article.id, title, content, group_concat(tag.name) tags, category, article.created_at createdAt
              FROM tag, article,tag_article
              WHERE tag_article.article_id = article.id
                  AND tag_article.tag_id = tag.id
                  AND article.id=?
              GROUP BY article.id`;

  return db.query(_sql, [id]);
};

const getArticleCount = async (cate?: string) => {
  let _sql = cate
    ? ` SELECT COUNT(*) num
        FROM article WHERE category=?`
    : `SELECT COUNT(*) num FROM article`;
  return db.query(_sql, [cate]);
};

const getBrief = async (limit: number, offset: number) => {
  let _sql = `SELECT id, title, created_at createAt
              FROM article
              ORDER BY created_at DESC
              LIMIT ? OFFSET ?`;
  return db.query(_sql, [limit, offset]);
};

const insert = async (title: string, content: string, category: string) => {
  const _sql = `INSERT INTO article(title, content, category) VALUES(?, ?,?)`;
  return db.query(_sql, [title, content, category]);
};

const update = async (
  id: number,
  title: string,
  content: string,
  cate: string
) => {
  const _sql = `UPDATE article SET title=?, content=?, category=? WHERE id=?`;
  return db.query(_sql, [title, content, cate, id]);
};

const _delete = async (id: number) => {
  try {
    const _sql = `DELETE FROM article WHERE id = ?`;
    const res = await db.query(_sql, [id, id]);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export {
  getArticleList,
  getArticleCount,
  insert,
  update,
  _delete,
  getArticleById,
  getBrief
};
