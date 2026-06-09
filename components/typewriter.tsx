"use client";

import { useEffect, useState } from "react";

export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setSub((s) => s + (deleting ? -1 : 1)), deleting ? 50 : 90);
    return () => clearTimeout(t);
  }, [sub, deleting, index, words]);

  return (
    <span className={className}>
      {words[index].slice(0, sub)}
      <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-current align-middle" style={{ height: "0.9em" }} />
    </span>
  );
}
