export default function LineChart({ props }: { props?: string }) {
  return (
    <div className={props}>
      <h2>Line Chart</h2>
      <canvas id="lineChart"></canvas>
    </div>
  );
}
