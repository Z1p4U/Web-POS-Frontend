import Banner from "../../ui/banner/Banner";
import VoucherTable from "./components/VoucherTable";
import useVoucher from "../../../redux/hooks/sale/voucher/useVoucher";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const DailyVoucher = () => {
  const [exportAnchorEl, setExportAnchorEl] = useState(null);

  const {
    vouchers,
    dailyTotalSale,
    printVoucher,
    selectedDay,
    activeFilter,
    setSelectedDay,
    setActiveFilter,
    handleExportVoucher,
  } = useVoucher();

  const handleDayChange = (newValue) => {
    if (newValue) {
      const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
      setSelectedDay(formattedDate);
    }
  };

  const openExportMenu = (event) => setExportAnchorEl(event.currentTarget);
  const closeExportMenu = () => setExportAnchorEl(null);

  useEffect(() => {
    if (activeFilter !== "day") {
      setActiveFilter("day");
    }
  }, [activeFilter, setActiveFilter]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[95%] my-6 flex flex-col gap-8">
          {/* Banner */}
          <Banner title={"Today Sales Overview"} path1={"Sale"} />
          {/* Banner */}

          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Day"
                  value={selectedDay ? dayjs(selectedDay) : null}
                  onChange={handleDayChange}
                  format="YYYY-MM-DD"
                  views={["year", "month", "day"]}
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
              {/* Voucher Table */}
              <VoucherTable vouchers={vouchers} printVoucher={printVoucher} />
              {/* TOTAL DAILY MONEY */}
              <div
                className={`${
                  !vouchers ? "hidden" : "flex"
                } gap-5 items-end w-full overflow-auto`}
              >
                <div className="flex mt-5 border-dim bg-primary">
                  <div className="border border-dim px-5 py-2 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Vouchers
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wide font-semibold">
                      {dailyTotalSale?.total_voucher}
                    </p>
                  </div>

                  <div className="border-r border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Cash
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {dailyTotalSale?.total_cash?.toLocaleString()}
                    </p>
                  </div>

                  <div className="border-r border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Profit
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {dailyTotalSale?.total_profit?.toLocaleString()}
                    </p>
                  </div>

                  <div className="border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Tax
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {dailyTotalSale?.total_tax?.toLocaleString()}
                    </p>
                  </div>

                  <div className="border border-dim py-2 px-5 text-end w-auto">
                    <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                      Total
                    </h1>
                    <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {dailyTotalSale?.total?.toLocaleString()}
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

export default DailyVoucher;
