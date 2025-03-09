import Banner from "../../ui/banner/Banner";
import VoucherTable from "./components/VoucherTable";
import useVoucher from "../../../redux/hooks/sale/voucher/useVoucher";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const MonthlyVoucher = () => {
  const [exportAnchorEl, setExportAnchorEl] = useState(null);

  const {
    vouchers,
    selectedMonth,
    monthlyTotalSale,
    printVoucher,
    activeFilter,
    setSelectedMonth,
    setActiveFilter,
    handleExportVoucher,
  } = useVoucher();

  const openExportMenu = (event) => setExportAnchorEl(event.currentTarget);
  const closeExportMenu = () => setExportAnchorEl(null);

  const handleMonthChange = (newValue) => {
    if (newValue) {
      const formattedMonth = dayjs(newValue).format("YYYY-MM");
      setSelectedMonth(formattedMonth);
    }
  };

  useEffect(() => {
    if (activeFilter !== "month") {
      setActiveFilter("month");
    }
  }, [activeFilter, setActiveFilter]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[95%] my-6 flex flex-col gap-8">
          {/* banner */}
          <Banner title={"Monthly Sales Overview"} path1={"Sale"} />
          {/* banner */}

          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Month"
                  value={selectedMonth ? dayjs(selectedMonth) : null} // Use selectedMonth directly
                  onChange={handleMonthChange}
                  format="YYYY-MM"
                  openTo="month"
                  views={["year", "month"]}
                />
              </LocalizationProvider>
              <Button
                onClick={openExportMenu}
                className=" py-2 px-4 rounded-lg font-bold hover:opacity-80 transition-colors duration-200"
                sx={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  px: 2,
                  py: 1,
                }}
              >
                Export
              </Button>
              <Menu
                anchorEl={exportAnchorEl}
                open={Boolean(exportAnchorEl)}
                onClose={closeExportMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleExportVoucher("csv");
                    closeExportMenu();
                  }}
                >
                  Export as CSV
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleExportVoucher("excel");
                    closeExportMenu();
                  }}
                >
                  Export as Excel
                </MenuItem>
              </Menu>
            </div>
          </div>
          {vouchers?.length === 0 ? (
            <div className="h-1/2 min-h-[300px] flex justify-center items-center">
              <h1 className="text-primary text-lg lg:text-2xl font-bold">
                No Voucher for today
              </h1>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* table */}
              <VoucherTable vouchers={vouchers} printVoucher={printVoucher} />
              {/* table */}

              <div
                className={`${
                  !vouchers ? "hidden" : "flex"
                } gap-5 items-end w-full overflow-auto`}
              >
                {/* TOTAL MONTHLY MONEY */}
                <div className="flex mt-5 border-dim bg-primary">
                  <div className="border border-dim px-5 py-2 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Vouchers
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wide font-semibold">
                      {monthlyTotalSale?.total_voucher}
                    </p>
                  </div>

                  <div className="border-r border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Cash
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {monthlyTotalSale?.total_cash?.toLocaleString()}
                    </p>
                  </div>

                  <div className="border-r border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Profit
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {monthlyTotalSale?.total_profit?.toLocaleString()}
                    </p>
                  </div>

                  <div className="border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Tax
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {monthlyTotalSale?.total_tax?.toLocaleString()}
                    </p>
                  </div>

                  <div className="border border-dim py-2 px-5 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {monthlyTotalSale?.total?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MonthlyVoucher;
