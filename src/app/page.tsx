import Link from "next/link";

import LogCard from "@/components/log-card";
import { getAllArticles } from "@/lib/md-parser";

export default async function Home() {
  const allArticles = getAllArticles();
  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-6">
      <ul className="grid list-none grid-cols-1 gap-8 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allArticles.map(({ slug, meta }) => (
          <li
            key={slug}
            className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1"
          >
            <Link href={`/logs/${slug}`}>
              <LogCard meta={meta} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
