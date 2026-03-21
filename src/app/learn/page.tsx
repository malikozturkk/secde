import "@/src/styles/learn.css";
import AppLayout from "@/src/components/layout/AppLayout";
import { AmbientBackground } from "@/src/components/learn/AmbientBackground";
import { DynamicPath } from "@/src/components/learn/DynamicPath";
import { NodeRow } from "@/src/components/learn/NodeRow";
import { LearnNodeCard } from "@/src/components/learn/LearnNodeCard";
import { FeaturedLearnNode } from "@/src/components/learn/FeaturedLearnNode";
import { WeeklyProgress } from "@/src/components/learn/WeeklyProgress";
import { LEARN_NODES } from "./learnNodes";

export const revalidate = 3600;

export default function LearnPage() {
  const regularNodes = LEARN_NODES.filter((n) => !n.isFeatured);
  const featuredNode = LEARN_NODES.find((n) => n.isFeatured);

  const nodeIds = [
    ...regularNodes.map((n) => n.id),
    ...(featuredNode ? [featuredNode.id] : []),
  ];

  return (
    <AppLayout>
      <main className="pt-24 pb-20 px-10 min-h-screen relative overflow-hidden">
        <AmbientBackground />

        <div className="max-w-4xl mx-auto relative">
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
              İbadetleri Öğrenelim
            </h1>
            <p className="text-on-surface-variant text-lg">
              Abdest, Gusül Abdesti, Namazlar rehberlerini oyunlaştırarak öğren
            </p>
          </header>
          <DynamicPath nodeIds={nodeIds} />
          <div className="space-y-48 pb-20">
            {regularNodes.map((node) => (
              <NodeRow key={node.id} alignment={node.alignment as never}>
                <LearnNodeCard node={node} />
              </NodeRow>
            ))}
            {featuredNode && <FeaturedLearnNode node={featuredNode} />}
          </div>
        </div>
        <WeeklyProgress percentage={75} current={6} goal={8} />
      </main>
    </AppLayout>
  );
}
