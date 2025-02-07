import { Money, ShoppingBag } from "@mui/icons-material";
import useUser from "../../redux/hooks/user/useUser";
import useSetting from "../../redux/hooks/setting/useSetting";
import { useNavigate } from "react-router-dom";
import useProduct from "../../redux/hooks/inventory/product/useProduct";
import useVoucher from "../../redux/hooks/sale/voucher/useVoucher";
import dayjs from "dayjs";

// Import Chart.js components and the React wrapper
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register all necessary Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
  const { profile } = useUser({ noPagination: true });
  const { lowStockItemCount, outOfStockItemCount } = useProduct({
    noPagination: true,
  });
  const { setting } = useSetting();
  const nav = useNavigate();

  const {
    vouchers,
    dailyTotalSale,
    dailyRecordsInMonth,
    monthlyRecordsInYear,
    activeFilter,
    setActiveFilter,
  } = useVoucher();

  const totalQuantity = vouchers.reduce((total, voucher) => {
    const voucherTotal = voucher?.records?.reduce(
      (sum, record) => sum + record?.quantity,
      0
    );
    return total + voucherTotal;
  }, 0);

  // Prepare chart labels and dataValues based on activeFilter
  let labels = [];
  let dataValues = [];

  if (activeFilter === "day") {
    // DAILY VIEW:
    // Group today's vouchers by their created hour.
    // Here we assume each voucher has a valid "createdAt" property.
    const hourlySales = Array(24).fill(0);
    const hourlyVouchers = Array(24).fill(0);

    vouchers.forEach((voucher) => {
      const hour = dayjs(voucher.createdAt).hour(); // returns 0-23
      hourlySales[hour] += voucher.total || 0; // Sum total sales amount
      hourlyVouchers[hour] += 1; // Count vouchers
    });
    labels = Array.from({ length: 24 }, (_, i) => `${i + 1}h`);
    dataValues = [
      {
        label: "Total Sales",
        data: hourlySales,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Voucher Count",
        data: hourlyVouchers,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ];
  } else if (activeFilter === "month") {
    // MONTHLY VIEW:
    // Use dailyRecordsInMonth array where each record is in the form:
    // { day: "yyyy-mm-dd", total, total_cash, total_tax, total_voucher }
    // For the x-axis, we display the day number (e.g., 1, 2, 3, ...)
    labels = dailyRecordsInMonth?.map((record) =>
      dayjs(record.day).format("D MMM")
    );
    dataValues = [
      {
        label: "Total Sales",
        data: dailyRecordsInMonth.map((r) => r.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Voucher Count",
        data: dailyRecordsInMonth.map((r) => r.total_voucher),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ];
  } else if (activeFilter === "year") {
    // YEARLY VIEW:
    // Use monthlyRecordsInYear array where each record is in the form:
    // { month: "yyyy-mm", total, total_cash, total_tax, total_voucher }
    // For the x-axis, we format the month (e.g., "Jan", "Feb", etc.)
    labels = monthlyRecordsInYear.map((record) =>
      dayjs(record.month, "YYYY-MM").format("MMM")
    );
    dataValues = [
      {
        label: "Total Sales",
        data: monthlyRecordsInYear.map((r) => r.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Voucher Count",
        data: monthlyRecordsInYear.map((r) => r.total_voucher),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ];
  }

  const chartData = {
    labels,
    datasets: dataValues,
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Voucher Sales Overview" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 pt-5">
        {/* Welcome Card */}
        <div className="flex justify-between p-5 rounded relative shadow h-[150px] bg-[#e0eafc]">
          <div className="flex flex-col gap-2">
            <p className="text-blue-500 font-bold">
              Welcome Back, {profile?.name}!
            </p>
            <p className="text-blue-500 text-sm font-medium">{setting?.name}</p>
          </div>
          <div>
            <img
              width={150}
              height={100}
              className="absolute bottom-0 right-0"
              src="https://appstack.bootlab.io/img/illustrations/customer-support.png"
              alt="Customer Support"
            />
          </div>
        </div>

        {/* Today's Earnings */}
        <div className="flex justify-between p-5 rounded shadow bg-white h-[150px]">
          <div>
            <p className="text-slate-600 text-xl font-semibold">
              {dailyTotalSale?.total ? dailyTotalSale.total : 0}{" "}
              <span className="text-xs ms-1">Kyats</span>
            </p>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Today Earnings
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div>
                <span className="text-green-500 text-xs bg-green-100 px-2 py-1 w-6 font-bold rounded">
                  {totalQuantity}
                </span>
              </div>
              <p className="text-slate-400 text-sm font-normal">
                Items Sold Today.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-10 h-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full">
              <Money />
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="flex justify-between p-5 rounded shadow bg-white h-[150px]">
          <div>
            <p className="font-bold text-2xl text-yellow-500">
              {lowStockItemCount}
            </p>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Low stock items
            </p>
            <div
              onClick={() =>
                nav("/inventory/product", { state: { filter: "Low" } })
              }
              className="flex items-center gap-3 text-sm cursor-pointer bg-primary px-2 py-1 text-white rounded-md text-center w-fit mt-6"
            >
              Check Items
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-10 h-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full">
              <ShoppingBag />
            </div>
          </div>
        </div>

        {/* Out of Stock Items */}
        <div className="flex justify-between p-5 rounded shadow bg-white h-[150px]">
          <div>
            <p className="font-bold text-2xl text-red-500">
              {outOfStockItemCount}
            </p>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Out of stock items
            </p>
            <div
              onClick={() =>
                nav("/inventory/product", { state: { filter: "OUT" } })
              }
              className="flex items-center gap-3 text-sm cursor-pointer bg-primary px-2 py-1 text-white rounded-md text-center w-fit mt-6"
            >
              Check Items
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-10 h-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full">
              <ShoppingBag />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section with Filter Selection */}
      <div className="mt-8 p-5 bg-white shadow rounded">
        <div className=" flex items-center">
          <div
            className={` ${activeFilter == "day" ? "bg-primary text-white border-primary pointer-events-none" : "text-black border-[#7E7F80]"} text-sm cursor-pointer px-3 flex justify-center items-center h-10 rounded-l-md border border-r-0`}
            onClick={() => {
              setActiveFilter("day");
            }}
          >
            Daily
          </div>
          <div
            className={` ${activeFilter == "month" ? "bg-primary text-white border-primary pointer-events-none" : "text-black border-[#7E7F80]"} text-sm cursor-pointer px-3 flex justify-center items-center h-10 border border-r-0`}
            onClick={() => {
              setActiveFilter("month");
            }}
          >
            Monthly
          </div>
          <div
            className={` ${activeFilter == "year" ? "bg-primary text-white border-primary pointer-events-none" : "text-black border-[#7E7F80]"} text-sm cursor-pointer px-3 flex justify-center items-center h-10 rounded-r-md border`}
            onClick={() => {
              setActiveFilter("year");
            }}
          >
            Yearly
          </div>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Dashboard;
