
import TotalRevenue from "@/components/TotalRevenue";
import RevenueChart from "@/components/RevenueChart";
import OrdersChart from "@/components/OrdersChart";
import Table from "@/components/Table";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="group flex flex-col gap-5">
        <TotalRevenue />
        <TotalRevenue />
      </div>
      <RevenueChart />
      <OrdersChart />
    </div>
    <Table />
  </div>
  );
}
