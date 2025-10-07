import { redirect } from "next/navigation";

export default function LegacyAgentRoute({
  params,
}: {
  params: { agent: string };
}) {
  // Redirect to default locale (en) agent route if locale is missing
  redirect(`/en/agents/${params.agent}`);
}
