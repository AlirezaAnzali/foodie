import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "us-east-2",
});
const db = sql("meals.db");

export function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  //   throw new Error("loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMealsBySlug(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "alirezaanzali-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals (
      title, summary, instructions, image, slug, creator, creator_email
    )
    VALUES (
      @title, @summary, @instructions, @image, @slug, @creator, @creator_email
    )`
  ).run(meal);
}
