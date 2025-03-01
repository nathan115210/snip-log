import { IconError404 } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <IconError404 />

      <p className="text-2xl">This page can not be found!</p>
    </div>
  );
}
