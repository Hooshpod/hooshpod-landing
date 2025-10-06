import React from "react";

type JsonLdProps = {
  schema: Record<string, unknown>;
};

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Intentionally not using dangerouslySetInnerHTML string interpolation for safety
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
