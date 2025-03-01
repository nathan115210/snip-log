export enum TagsBgColor {
  REACT = "bg-blue-700",
  REACT_HOOK = "bg-blue-500",
  NEXT_JS = "bg-blue-300",
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
