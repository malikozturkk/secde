import type { JsonLdObject } from "@/src/lib/jsonld";

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
