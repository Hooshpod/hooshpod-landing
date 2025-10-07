import { AgentPage } from "@/components/landing/AgentPage";
import { HeaderContainer } from "@/components/landing/HeaderContainer";
import { Footer } from "@/components/landing/Footer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const validAgents = [
  "administrative-assistant",
  "compliance",
  "procurement",
  "aviation",
  "shipping",
  "healthcare",
];

type Props = {
  params: {
    locale: string;
    agent: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { agent } = params;

  if (!validAgents.includes(agent)) {
    return {
      title: "Agent Not Found",
    };
  }

  return {
    title: `${
      agent.charAt(0).toUpperCase() + agent.slice(1).replace("-", " ")
    } Agent | Hooshpod`,
    description: `Learn about Hooshpod's ${agent} AI agent - specialized for your industry needs.`,
  };
}

export default function AgentPageRoute({ params }: Props) {
  const { agent } = params;

  if (!validAgents.includes(agent)) {
    notFound();
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <HeaderContainer />
      <main className="flex-1">
        <AgentPage agentKey={agent} />
      </main>
      <Footer />
    </div>
  );
}
