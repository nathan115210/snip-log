import { notFound } from "next/navigation";

import { getArticleBySlug, markdownToHtml } from "@/lib/md-parser";
import "@/styles/highlight.css";

// Import syntax highlighting styles

type ArticlePageProps = { params: { slug: string } };

export default async function Page({ params }: ArticlePageProps) {
  const pageParams = await params;

  const article = getArticleBySlug(pageParams.slug);
  if (!article) return notFound();

  const contentHtml = await markdownToHtml(article.content);

  return (
    <div className="m-8 mx-auto flex max-w-full flex-col gap-6 rounded-lg bg-amber-200 p-[2rem] text-2xl dark:bg-amber-800 md:max-w-5xl">
      <h1 className="text-5xl">{article.meta.title}</h1>
      <div
        className="flex flex-col gap-6"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
