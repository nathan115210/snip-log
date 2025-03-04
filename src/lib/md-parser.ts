import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkRehype from "remark-rehype";

// Define the directory storing markdown files
const contentDirectory = path.join(process.cwd(), "content");

// Interface for article metadata
export interface ArticleMeta {
  title: string;
  date: string;
  description: string;
  tags: string[];
  demoName?: string;
}

// Interface for an article
export interface Article {
  slug: string;
  meta: ArticleMeta;
  content: string;
}

// Fetch all articles
export const getAllArticles = (): Article[] => {
  const fileNames = fs.readdirSync(contentDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    return getArticleBySlug(slug);
  });
};

// Fetch a single article by slug
export const getArticleBySlug = (slug: string): Article => {
  const filePath = path.join(contentDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  
  return { slug, meta: data as ArticleMeta, content };
};

// Convert Markdown to HTML with Syntax Highlighting
export const markdownToHtml = async (markdown: string): Promise<string> => {
  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeHighlight) // Uses highlight.js for syntax highlighting
    .use(rehypeStringify)
    .process(markdown);

  return processedContent.toString();
};
