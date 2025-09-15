import React from "react";
import Layout from "../layout/Layout";
import InsightsList from "../components/InsightsList";

export default function InsightPage() {
  const insights = [
    { risk: "High", message: "Contract renewal clause may cause penalties." },
    { risk: "Medium", message: "Pricing terms are ambiguous." },
    { risk: "Low", message: "Contract complies with data protection rules." },
  ];

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <h1 className="text-xl md:text-2xl font-bold">Insights</h1>
      </div>

      <div className="mt-4">
        <InsightsList insights={insights} />
      </div>
    </Layout>
  );
}
