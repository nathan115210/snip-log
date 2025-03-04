import * as React from "react";

import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:hover:outline-2 outline-offset-2 outline-solid",
  {
    variants: {
      variant: {
        default: "border-transparent ",
        secondary: "border-transparent",
        destructive: "border-transparent",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  tagLabel: string;
}

function Badge({ className, variant, tagLabel, ...props }: BadgeProps) {
  const { bgColor, textColor } = tagColor(tagLabel);
  //className={`${bgColor} ${textColor}`}
  return (
    <div className={cn(badgeVariants({ variant }), className, bgColor, textColor)} {...props} >{tagLabel}</div>
  );
}

export { Badge, badgeVariants };


// Helpers

export enum TagsBgColor {
  REACT = "bg-blue-700",
  REACT_HOOK = "bg-blue-500",
  NEXT_JS = "bg-blue-300",
  CSS = "bg-rose-700",

  FALLBACK = "bg-stone-500",
}

export enum TagsTextColor {
  BLACK = "text-black",
  WHITE = "text-white",
}

const convertTagName = (tag: string): string =>
  tag.toUpperCase().split(".").join("_");

const isValidTag = (tag: string): boolean => {
  return tag in TagsBgColor;
};

export interface TagColor {
  bgColor: TagsBgColor;
  textColor: TagsTextColor;
}

export const tagColor = (tagName: string): TagColor => {
  const tag = convertTagName(tagName);
  if (isValidTag(tag)) {
    const bgColor = TagsBgColor[tag as keyof typeof TagsBgColor];
    const colorNumber = parseInt(bgColor.split("-")[2]);
    return {
      bgColor,
      textColor: colorNumber > 400 ? TagsTextColor.WHITE : TagsTextColor.BLACK,
    };
  } else {
    return {
      bgColor: TagsBgColor.FALLBACK,
      textColor: TagsTextColor.BLACK,
    };
  }
};
