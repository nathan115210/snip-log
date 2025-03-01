import Link from "next/link";
import { getAllArticles } from "@/lib/md-parser";
import { tagColor } from "@/lib/tags-color";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const allArticles = getAllArticles();
  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-6 text-center">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
        {allArticles.map(({ slug, meta }) => (
          <li key={slug} className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <Link href={`/logs/${slug}`}>
              <Card
                className="w-full max-w-[400px] bg-black/70 hover:bg-black/60 text-white px-6 py-4 rounded-lg dark:bg-white/80 dark:hover:bg-white/60 dark:text-black transition shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{slug}</CardTitle>
                  <div className={"flex gap-2"}>

                    {meta.tags.map((tag, index) => {
                      const { bgColor, textColor } = tagColor(tag);
                      return (
                        <Badge className={`${bgColor} ${textColor}`} key={index}>
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{meta.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <p><small>{meta.date}</small></p>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>


    </div>
  );
}
