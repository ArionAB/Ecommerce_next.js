import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogType } from "../src/Store/Enums/BlogType";

const recipeDirectory = path.join(process.cwd(), "recipes");
const articoleDirectory = path.join(process.cwd(), "articole");

export function getSortedRecipesData(type: BlogType) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(
    type === BlogType.RECIPES ? recipeDirectory : articoleDirectory
  );
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(
      type === BlogType.RECIPES ? recipeDirectory : articoleDirectory,
      fileName
    );
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllRecipesIds(type: BlogType) {
  const fileNames = fs.readdirSync(
    type === BlogType.RECIPES ? recipeDirectory : articoleDirectory
  );

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getRecipeData(id: any, type: BlogType) {
  const fullPath = path.join(
    type === BlogType.RECIPES ? recipeDirectory : articoleDirectory,
    `${id}.md`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
