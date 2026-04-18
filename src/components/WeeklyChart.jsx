import { ResponsiveLine } from "@nivo/line";

function WeeklyChart({ data }) {

  const chartData = [
    {
      id: "Applications",
      data: data.map(d => ({
        x: d.day,
        y: d.count
      }))
    }
  ];

  return (
    <div style={{ height: 300 }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        axisBottom={{ tickRotation: -20 }}
        curve="monotoneX"
      />
    </div>
  );
}

export default WeeklyChart;