import StatsCharts from "@/components/statscharts/StatsCharts";

const DashboardPage = () => {
  return (
    <div className="flex items-center justify-center size-full bg-neutral-800/50 rounded-md border border-yellow-500 text-yellow-400  animate-fade-in ">
      <div className="size-full p-2">
        <StatsCharts />
      </div>
    </div>
  );
};

export default DashboardPage;
