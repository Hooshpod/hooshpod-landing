"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Comparison() {
  const rows = [
    {
      feature: "Customization",
      hooshpod: "Vertical-tuned models with no-code builder",
      competitors: "Generic templates",
    },
    {
      feature: "Scalability",
      hooshpod: "Auto-scales to enterprise loads",
      competitors: "Limited integrations",
    },
    {
      feature: "Security",
      hooshpod: "Built-in compliance and audit logs",
      competitors: "Add-on only",
    },
    {
      feature: "ROI",
      hooshpod: "20–40% efficiency gains proven",
      competitors: "Variable results",
    },
  ];

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10 space-y-4">
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Why Hooshpod for Specialized Agents?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Purpose-built where it matters
          </h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Hooshpod</TableHead>
                <TableHead>Competitors</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{r.feature}</TableCell>
                  <TableCell>{r.hooshpod}</TableCell>
                  <TableCell>{r.competitors}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
