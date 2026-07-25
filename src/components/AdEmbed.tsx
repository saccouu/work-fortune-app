"use client";

import { useEffect, useRef } from "react";

// A8.netなど、計測用の<img>や<script>タグを含む広告コードを
// 「そのまま貼るコード」として正しく実行させるためのコンポーネントです。
// dangerouslySetInnerHTMLだけだと<script>タグは実行されないため、
// scriptタグを作り直して差し替えています。
export function AdEmbed({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = html;

    const oldScripts = Array.from(container.querySelectorAll("script"));
    oldScripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.async = false;
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return <div ref={containerRef} />;
}
