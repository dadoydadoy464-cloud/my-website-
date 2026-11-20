import { useCallback, useRef, useState } from "react";

export function useCopy(timeout = 1600) {
  const [copied, setCopied] = useState<string | null>(null);
  const t = useRef<number | null>(null);

  const copy = useCallback(
    async (text: string, id = "default") => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(id);
      if (t.current) window.clearTimeout(t.current);
      t.current = window.setTimeout(() => setCopied(null), timeout);
    },
    [timeout],
  );

  return { copied, copy };
}

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
