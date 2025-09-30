CREATE DATABASE comments;

CREATE TABLE `comments` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `libro_id` INTEGER NOT NULL,
  `usuario_id` INTEGER NOT NULL,
  `texto` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `comments` ADD CONSTRAINT `comment_libro` FOREIGN KEY (`libro_id`) REFERENCES `libros`(`id`);
ALTER TABLE `comments` ADD CONSTRAINT `comment_user` FOREIGN KEY (`usuario_id`) REFERENCES `users`(`id`);
