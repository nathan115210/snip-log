import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllArticles } from "@/lib/md-parser";

export default async function Home() {
  const allArticles = getAllArticles();
  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-6">
      <ul className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 list-none">
        {allArticles.map(({ slug, meta }) => (
          <li
            key={slug}
            className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1"
          >
            <Link href={`/logs/${slug}`}>
              <Card
                className="w-full max-w-[400px] rounded-lg bg-black/70 px-6 py-4 text-white shadow-lg transition hover:bg-black/60 dark:bg-white/80 dark:text-black dark:hover:bg-white/60">
                <CardHeader>
                  <CardTitle>{meta.title}</CardTitle>
                  <div className={"flex gap-2"}>
                    {meta.tags.map((tag, index) => {
                      return (
                        <Badge

                          variant={"default"}
                          key={index}
                          tagLabel={tag}
                        />


                      );
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{meta.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <p>
                    <small>{meta.date}</small>
                  </p>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
