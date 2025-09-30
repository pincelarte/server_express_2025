import { initDB } from "../connectDB.mjs";

class CommentModel {
  constructor() {
    this.connection = null;
    this.initConnection();
  }

  async initConnection() {
    this.connection = await initDB();
  }

  async getAllComments() {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const [results] = await this.connection.execute("SELECT * FROM `comments`");
    return results;
  }

  async getCommentsByBook(libroId) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const [results] = await this.connection.execute(
      "SELECT * FROM `comments` WHERE libro_id = ?",
      [libroId]
    );
    return results;
  }

  async createComment(commentData) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const { libro_id, usuario_id, texto } = commentData;
    const [result] = await this.connection.execute(
      "INSERT INTO `comments` (libro_id, usuario_id, texto) VALUES (?, ?, ?)",
      [libro_id, usuario_id, texto]
    );
    return result;
  }

  async updateComment(id, texto) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const [result] = await this.connection.execute(
      "UPDATE `comments` SET texto = ? WHERE id = ?",
      [texto, id]
    );
    return result;
  }

  async deleteComment(id) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const [result] = await this.connection.execute(
      "DELETE FROM `comments` WHERE id = ?",
      [id]
    );
    return result;
  }

  async getCommentById(id) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const [result] = await this.connection.execute(
      "SELECT * FROM `comments` WHERE id = ?",
      [id]
    );
    return result[0];
  }
}

export default new CommentModel();
