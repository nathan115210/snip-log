"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArticleMeta } from "@/lib/md-parser";
import { useEffect, useState } from "react";
import Image from "next/image";

const LogCard = ({ meta }: { meta: ArticleMeta }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/random-image")
      .then((res) => res.json())
      .then((data) => setImageUrl(data.imageUrl))
      .catch((error) => console.error("Error fetching image:", error));
  }, []);

  return (
    <Card
      className="w-full max-w-[400px] rounded-lg bg-black/70 px-6 py-4 text-white shadow-lg transition hover:bg-black/60 dark:bg-white/80 dark:text-black dark:hover:bg-white/60">
      <CardHeader>
        {imageUrl &&
          <Image
            src={imageUrl}
            alt="Random"
            width={600}
            height={400}
            className="w-full h-[300px] object-contain max-w-lg rounded-lg shadow-lg"
          />}
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
  );
};
export default LogCard;
