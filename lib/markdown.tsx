import React from "react";

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;

  const patterns: {
    regex: RegExp;
    render: (m: RegExpExecArray, key: number) => React.ReactNode;
  }[] = [
    {
      regex: /`([^`]+)`/,
      render: (m, key) => (
        <code
          key={key}
          className="px-1 py-0.5 rounded bg-muted text-muted-foreground"
        >
          {m[1]}
        </code>
      ),
    },
    {
      regex: /\*\*([^*]+)\*\*/,
      render: (m, key) => <strong key={key}>{m[1]}</strong>,
    },
    {
      regex: /\*([^*]+)\*/,
      render: (m, key) => <em key={key}>{m[1]}</em>,
    },
    {
      regex: /\[([^\]]+)\]\(([^)]+)\)/,
      render: (m, key) => (
        <a
          key={key}
          href={m[2]}
          className="underline underline-offset-2"
          target="_blank"
          rel="noreferrer noopener"
        >
          {m[1]}
        </a>
      ),
    },
  ];

  let keyCounter = 0;
  while (remaining.length > 0) {
    let earliest: {
      index: number;
      match: RegExpExecArray;
      patternIndex: number;
    } | null = null;
    for (let i = 0; i < patterns.length; i++) {
      const regex = new RegExp(patterns[i].regex.source);
      const match = regex.exec(remaining);
      if (match && (earliest === null || match.index < earliest.index)) {
        earliest = { index: match.index, match, patternIndex: i };
      }
    }

    if (!earliest) {
      elements.push(remaining);
      break;
    }

    if (earliest.index > 0) {
      elements.push(remaining.slice(0, earliest.index));
    }
    elements.push(
      patterns[earliest.patternIndex].render(earliest.match, keyCounter++)
    );
    remaining = remaining.slice(earliest.index + earliest.match[0].length);
  }

  return elements;
}

export function renderMarkdown(content: string): React.ReactNode {
  const lines = content.replace(/\r\n?/g, "\n").split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith("```")) {
        i++;
      }
      nodes.push(
        <pre
          key={`code-${key++}`}
          className="rounded bg-muted p-4 overflow-auto"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    const headingMatch = /^(#{1,6})\s+(.*)$/.exec(line);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      nodes.push(
        React.createElement(
          Tag,
          { key: `h-${key++}`, className: "mt-8 mb-4 font-bold" },
          renderInlineMarkdown(text)
        )
      );
      i++;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      nodes.push(
        <ul key={`ul-${key++}`} className="list-disc pl-6 my-4">
          {items.map((it, idx) => (
            <li key={idx}>{renderInlineMarkdown(it)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const para: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith("```")
    ) {
      para.push(lines[i]);
      i++;
    }
    nodes.push(
      <p key={`p-${key++}`} className="my-4 leading-relaxed">
        {renderInlineMarkdown(para.join(" "))}
      </p>
    );
  }

  return nodes;
}
