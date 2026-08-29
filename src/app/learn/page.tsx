import { createMetadata } from "@/src/lib/metadata";
import "@/src/styles/learn.css";
import { SeoPageShell } from "@/src/components/seo/SeoPageShell";
import { AmbientBackground } from "@/src/components/learn/AmbientBackground";
import { DynamicPath } from "@/src/components/learn/DynamicPath";
import { NodeRow } from "@/src/components/learn/NodeRow";
import { LearnNodeCard } from "@/src/components/learn/LearnNodeCard";
import { FeaturedLearnNode } from "@/src/components/learn/FeaturedLearnNode";
import { LEARN_NODES } from "./learnNodes";

export const metadata = createMetadata({
  title: "Öğren",
  description:
    "Abdest, gusül abdesti ve namazları adım adım öğren. Oyunlaştırılmış rehberlerle ibadetlerini geliştir.",
  path: "/learn",
});

export const revalidate = 3600;

const BREADCRUMBS = [
  { name: "Ana sayfa", path: "/" },
  { name: "Rehberler", path: "/learn" },
];

export default function LearnPage() {
  const regularNodes = LEARN_NODES.filter((n) => !n.isFeatured);
  const featuredNode = LEARN_NODES.find((n) => n.isFeatured);

  const nodeIds = [
    ...regularNodes.map((n) => n.id),
    ...(featuredNode ? [featuredNode.id] : []),
  ];

  return (
    <SeoPageShell
      publicShell
      breadcrumbs={BREADCRUMBS}
      eyebrow="Rehberler"
      title="İbadetleri adım adım öğrenelim"
      lede="Abdest, gusül abdesti ve beş vakit namaz — her rehber adım adım ilerler, aralarda kısa sorularla öğrendiğini pekiştirir. Patikayı baştan takip edebilir veya doğrudan aradığın rehbere geçebilirsin."
    >
      <div className="relative overflow-hidden rounded-[var(--ng-radius-lg)]">
        <AmbientBackground />

        <div className="relative px-2 py-10 lg:px-6">
          <DynamicPath nodeIds={nodeIds} />
          <div className="space-y-48">
            {regularNodes.map((node) => (
              <NodeRow key={node.id} alignment={node.alignment as never}>
                <LearnNodeCard node={node} />
              </NodeRow>
            ))}
            {featuredNode && <FeaturedLearnNode node={featuredNode} />}
          </div>
        </div>
      </div>
    </SeoPageShell>
  );
}
