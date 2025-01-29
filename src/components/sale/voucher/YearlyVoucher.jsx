import Banner from "../../ui/banner/Banner";
import VoucherTable from "./components/VoucherTable";
import useVoucher from "../../../redux/hooks/sale/voucher/useVoucher";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";
import dayjs from "dayjs";

const YearlyVoucher = () => {
  const {
    vouchers,
    yearlyTotalSale,
    printVoucher,
    selectedYear,
    setSelectedYear,
    activeFilter,
    setActiveFilter,
  } = useVoucher();

  const handleYearChange = (newValue) => {
    if (newValue) {
      const formattedYear = dayjs(newValue).format("YYYY");
      setSelectedYear(formattedYear);
    }
  };

  useEffect(() => {
    if (activeFilter != "year") {
      setActiveFilter("year");
    }
  }, [activeFilter, setActiveFilter]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[95%] my-6 flex flex-col gap-8">
          {/* banner  */}
          <Banner title={"Yearly Sales Overview"} path1={"Sale"} />
          {/* banner  */}

          <div className="flex flex-col gap-3">
            <div className=" flex items-center max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Year"
                  value={selectedYear ? dayjs(selectedYear) : null} // Use selectedYear directly
                  onChange={handleYearChange}
                  format="YYYY"
                  views={["year"]}
                />
              </LocalizationProvider>
            </div>
          </div>
          {vouchers?.length == 0 ? (
            <div className=" h-1/2 min-h-[300px] flex justify-center items-center">
              <h1 className=" text-primary text-lg lg:text-2xl font-bold">
                No Voucher for today
              </h1>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* table  */}
              <VoucherTable vouchers={vouchers} printVoucher={printVoucher} />
              {/* table  */}

              <div
                className={` ${!vouchers ? "hidden" : "flex"} gap-5 items-end w-full overflow-scroll`}
              >
                {/* TOTAL DAILY MONEY  */}
                <div className={` flex mt-5 border-dim bg-primary`}>
                  <div className=" border border-dim px-5 py-2 text-end w-auto">
                    <h1 className=" text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Vouchers
                    </h1>
                    <p className=" text-white text-xl whitespace-nowrap tracking-wide font-semibold">
                      {yearlyTotalSale?.total_voucher}
                    </p>
                  </div>

                  <div className=" border-r border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className=" text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Cash
                    </h1>
                    <p className=" text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {yearlyTotalSale?.total_cash}
                    </p>
                  </div>

                  <div className=" border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className=" text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Tax
                    </h1>
                    <p className=" text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {yearlyTotalSale?.total_tax}
                    </p>
                  </div>

                  <div className=" border border-dim py-2 px-5 text-end w-auto ">
                    <h1 className=" text-light font-semibold whitespace-nowrap tracking-wide">
                      Total
                    </h1>
                    <p className=" text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {yearlyTotalSale?.total}
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

export default YearlyVoucher;
