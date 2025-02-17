import { useState } from "react";
import { Inventory, Money, ShoppingBag } from "@mui/icons-material";
import useSetting from "../../redux/hooks/setting/useSetting";
import { useNavigate } from "react-router-dom";
import useVoucher from "../../redux/hooks/sale/voucher/useVoucher";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useSupplier from "../../redux/hooks/inventory/supplier/useSupplier";
import useStock from "../../redux/hooks/inventory/stock/useStock";
import useUserProfile from "../../redux/hooks/user/useUserProfile";
import useCustomProduct from "../../redux/hooks/inventory/product/useCustomProduct";

// Register all necessary Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
  const { lowStockItemCount, outOfStockItemCount, totalProducts } =
    useCustomProduct();
  const { suppliers } = useSupplier({ noPagination: true });
  const { isAdmin } = useUserProfile();
  const { setting } = useSetting();
  const { stockInCount, stockOutCount } = useStock();

  const {
    vouchers,
    dailyTotalSale,
    dailyRecordsInMonth,
    monthlyRecordsInYear,
    activeFilter,
    setActiveFilter,
  } = useVoucher();

  const nav = useNavigate();

  const [selectedDataset, setSelectedDataset] = useState("total");

  // Prepare chart labels and datasets based on activeFilter and selectedDataset
  let labels = [];
  let dataValues = [];

  if (activeFilter === "day") {
    // DAILY VIEW:
    // Group today's vouchers by their created hour.
    const hourlySales = Array(24).fill(0);
    const hourlyVouchers = Array(24).fill(0);

    vouchers.forEach((voucher) => {
      const hour = dayjs(voucher.createdAt).hour(); // returns 0-23
      hourlySales[hour] += voucher.total || 0; // Sum total sales amount
      hourlyVouchers[hour] += 1; // Count vouchers
    });
    // Create labels "00:00", "01:00", ..., "23:00"
    labels = Array.from(
      { length: 24 },
      (_, i) => String(i).padStart(2, "0") + ":00"
    );
    // Only one dataset is shown based on the user's selection
    if (selectedDataset === "total") {
      dataValues = [
        {
          label: "Total Sales",
          data: hourlySales,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ];
    } else if (selectedDataset === "voucher") {
      dataValues = [
        {
          label: "Voucher Count",
          data: hourlyVouchers,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ];
    }
  } else if (activeFilter === "month") {
    // MONTHLY VIEW:
    // dailyRecordsInMonth is an array of objects in the form:
    // { day: "yyyy-mm-dd", total, total_cash, total_tax, total_voucher }
    labels = dailyRecordsInMonth?.map((record) =>
      dayjs(record.day).format("D MMM")
    );
    if (selectedDataset === "total") {
      dataValues = [
        {
          label: "Total Sales",
          data: dailyRecordsInMonth.map((r) => r.total),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ];
    } else if (selectedDataset === "voucher") {
      dataValues = [
        {
          label: "Voucher Count",
          data: dailyRecordsInMonth.map((r) => r.total_voucher),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ];
    }
  } else if (activeFilter === "year") {
    // YEARLY VIEW:
    // monthlyRecordsInYear is an array of objects in the form:
    // { month: "yyyy-mm", total, total_cash, total_tax, total_voucher }
    labels = monthlyRecordsInYear.map((record) =>
      dayjs(record.month, "YYYY-MM").format("MMM")
    );
    if (selectedDataset === "total") {
      dataValues = [
        {
          label: "Total Sales",
          data: monthlyRecordsInYear.map((r) => r.total),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ];
    } else if (selectedDataset === "voucher") {
      dataValues = [
        {
          label: "Voucher Count",
          data: monthlyRecordsInYear.map((r) => r.total_voucher),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ];
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
        {/* Welcome Card */}
        <div className="flex justify-between p-5 rounded relative shadow h-[150px] bg-[#e0eafc]">
          <div className="flex flex-col gap-2">
            <p className="text-blue-500 font-bold">Welcome Back!</p>
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
                  {vouchers?.length}
                </span>
              </div>
              <p className="text-slate-400 text-sm font-normal">
                Invoices Sold Today.
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
              className="flex items-center gap-3 text-sm cursor-pointer bg-primary px-3 py-2 text-white rounded-md text-center w-fit mt-6"
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
              className="flex items-center gap-3 text-sm cursor-pointer bg-primary px-3 py-2 text-white rounded-md text-center w-fit mt-6"
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

      {/* Chart Section with Filter & Dataset Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
        <div
          className={`${isAdmin ? "col-span-1 flex-col" : "col-span-3 flex-row"} flex gap-5`}
        >
          {/* Supplier Card */}
          <div className="flex justify-between p-5 w-full rounded shadow bg-white h-full min-h-[150px]">
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-bold text-3xl">{suppliers?.length}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Total Suppliers
                </p>
              </div>
              <div
                onClick={() => nav("/inventory/supplier")}
                className="flex items-center gap-3 text-sm cursor-pointer bg-primary px-3 py-2 text-white rounded-md text-center w-fit"
              >
                Check Suppliers
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-10 h-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full">
                <Inventory />
              </div>
            </div>
          </div>

          {/* Product Card */}
          <div className="flex justify-between p-5 w-full rounded shadow bg-white h-full min-h-[150px]">
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-bold text-3xl">{totalProducts}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Total Products
                </p>
              </div>
              <div
                onClick={() => nav("/inventory/product")}
                className="flex items-center gap-3 text-sm cursor-pointer bg-primary px-3 py-2 text-white rounded-md text-center w-fit"
              >
                Check Products
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-10 h-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full">
                <Inventory />
              </div>
            </div>
          </div>

          {/* Stock In/Out Card */}
          <div className="flex justify-between p-5 w-full rounded shadow bg-white h-full min-h-[150px]">
            <div className="flex flex-col justify-between">
              <p>Today Stock In/Out Record</p>
              <div className=" flex items-center gap-5 text-green-500 ">
                <p className="font-bold text-2xl">{stockInCount}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Stock in
                </p>
              </div>
              <div className=" flex items-center gap-5 text-red-500">
                <p className="font-bold text-2xl">{stockOutCount}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Stock Out
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-10 h-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full">
                <Inventory />
              </div>
            </div>
          </div>
        </div>
        {isAdmin ? (
          <>
            <div
              className={` col-span-1 lg:col-span-2 p-5 min-h-[300px] bg-white shadow rounded`}
            >
              {/* Period Filter */}
              <div className="flex items-center">
                <div
                  className={`${
                    activeFilter === "day"
                      ? "bg-primary text-white border-primary pointer-events-none"
                      : "text-black border-[#7E7F80]"
                  } text-sm cursor-pointer px-3 flex justify-center items-center h-10 rounded-l-md border border-r-0`}
                  onClick={() => setActiveFilter("day")}
                >
                  Today
                </div>
                <div
                  className={`${
                    activeFilter === "month"
                      ? "bg-primary text-white border-primary pointer-events-none"
                      : "text-black border-[#7E7F80]"
                  } text-sm cursor-pointer px-3 flex justify-center items-center h-10 border border-r-0`}
                  onClick={() => setActiveFilter("month")}
                >
                  This Month
                </div>
                <div
                  className={`${
                    activeFilter === "year"
                      ? "bg-primary text-white border-primary pointer-events-none"
                      : "text-black border-[#7E7F80]"
                  } text-sm cursor-pointer px-3 flex justify-center items-center h-10 rounded-r-md border`}
                  onClick={() => setActiveFilter("year")}
                >
                  This Year
                </div>
              </div>

              {/* Dataset Selection */}
              <div className="flex items-center gap-2 mt-4">
                <label htmlFor="dataset" className="font-medium">
                  Select Data:
                </label>
                <select
                  id="dataset"
                  value={selectedDataset}
                  onChange={(e) => setSelectedDataset(e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="total">Total Sales</option>
                  <option value="voucher">Voucher Count</option>
                </select>
              </div>

              {/* Chart */}
              <Bar className="h-full" data={chartData} options={chartOptions} />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
        <div className=" col-span-1"></div>
      </div>
    </>
  );
};

export default Dashboard;
