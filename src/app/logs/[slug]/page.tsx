import { getArticleBySlug, markdownToHtml } from "@/lib/md-parser";
import { notFound } from "next/navigation";
import "@/styles/highlight.css"; // Import syntax highlighting styles

type ArticlePageProps = { params: { slug: string } };

export default async function Page({ params }: ArticlePageProps) {
  const pageParams = await params;

  const article = getArticleBySlug(pageParams.slug);
  if (!article) return notFound();

  const contentHtml = await markdownToHtml(article.content);

  return (
    <div
      className="mx-auto m-8 flex flex-col gap-6 max-w-full md:max-w-5xl text-2xl p-[2rem] bg-amber-200 dark:bg-amber-800 rounded-lg">
      <h1 className="text-5xl">{article.meta.title}</h1>
      <div className="flex flex-col gap-6" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
