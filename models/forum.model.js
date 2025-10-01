import { initDB } from "../connectDB.mjs";

class ForumModel {
  constructor() {
    this.connection = null;
    this.initConnection();
  }

  async initConnection() {
    this.connection = await initDB();
  }

  async getAllForums() {
    if (!this.connection) throw new Error("Database connection not established");
    const [results] = await this.connection.execute("SELECT * FROM `forums`");
    return results;
  }

  async getForumById(forumId) {
    if (!this.connection) throw new Error("Database connection not established");
    const [results] = await this.connection.execute("SELECT * FROM `forums` WHERE id = ?", [forumId]);
    return results[0];
  }

  async createForum(forumData) {
    if (!this.connection) throw new Error("Database connection not established");
    const { title, description, created_at } = forumData;
    const [result] = await this.connection.execute(
      "INSERT INTO `forums` (title, description, created_at) VALUES (?, ?, ?)",
      [title, description, created_at]
    );
    return result;
  }

  async updateForum(forumId, forumData) {
    if (!this.connection) throw new Error("Database connection not established");
    const { title, description, created_at } = forumData;
    const [result] = await this.connection.execute(
      "UPDATE `forums` SET title = ?, description = ?, created_at = ? WHERE id = ?",
      [title, description, created_at, forumId]
    );
    return result;
  }

  async deleteForum(forumId) {
    if (!this.connection) throw new Error("Database connection not established");
    const [result] = await this.connection.execute(
      "DELETE FROM `forums` WHERE id = ?",
      [forumId]
    );
    return result;
  }
}

export default new ForumModel();
