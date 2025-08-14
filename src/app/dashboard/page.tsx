import LineChart from "./line-chart";
export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <LineChart props="text-center" />
    </div>
  );
}
