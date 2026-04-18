// src/components/StatsChart.jsx

import { ResponsiveBar } from "@nivo/bar";

function StatsChart({ stats }) {
  const data = [
    { status: "Applied", value: stats.applied },
    { status: "Interview", value: stats.interview },
    { status: "Selected", value: stats.selected },
    { status: "Rejected", value: stats.rejected },
  ];

  return (
    <div style={{ height: 300 }}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="status"
        margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
        padding={0.3}
      />
    </div>
  );
}

export default StatsChart;