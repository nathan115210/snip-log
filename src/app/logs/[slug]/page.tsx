import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { getArticleBySlug, markdownToHtml } from "@/lib/md-parser";
import "@/styles/highlight.css";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export default async function Page({ params }: ArticlePageProps) {
  const pageParams = await params;

  const article = getArticleBySlug(pageParams.slug);
  if (!article) return notFound();

  const contentHtml = await markdownToHtml(article.content);
  const { title, demoName } = article.meta;

  // Dynamically import the demo component
  const DemoComponent = demoName
    ? dynamic(() => import(`@/app/demos/${demoName}/${demoName}`))
    : null;

  return (
    <div
      className="m-8 mx-auto flex max-w-full flex-col gap-6 rounded-lg bg-amber-200 p-[2rem] text-2xl dark:bg-amber-800 md:max-w-5xl">
      <h1 className="text-5xl">{title}</h1>

      {DemoComponent && (
        <div className="flex max-w-full flex-col gap-6 rounded-lg bg-white bg-opacity-30 p-6 text-black">
          <h3 className={"text-center font-bold"}>Demo</h3>
          <DemoComponent />
        </div>
      )}
      <section></section>
      <div
        className="flex flex-col gap-6"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
