import { BiSearch } from "react-icons/bi";
import Banner from "../../ui/banner/Banner";
import VoucherTable from "./components/VoucherTable";
import useVoucher from "../../../redux/hooks/sale/voucher/useVoucher";

const DailyVoucher = () => {
  const { vouchers, dailyTotalSale, exportVoucher } = useVoucher();

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[95%] my-6 flex flex-col gap-8">
          {/* banner  */}
          <Banner title={"Today Sales Overview"} path1={"Sale"} />
          {/* banner  */}

          <div className="flex flex-col gap-3">
            <div className=" flex justify-between items-center max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-3">
              <form className="relative">
                <input
                  //   onChange={(e) =>
                  //     dispatch(setSearchRecentVoucher(e.target.value))
                  //   }
                  type="text"
                  placeholder="Search"
                  className=" border-2 border-[#E8EAED] py-[6px] pr-5 pl-10 rounded-md outline-none focus:border-primary duration-300 font-medium placeholder:tracking-wider"
                />
                <div className=" absolute top-[10px] left-[11px]">
                  <BiSearch size={20} />
                </div>
              </form>
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
              <VoucherTable vouchers={vouchers} exportVoucher={exportVoucher} />
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
                      {dailyTotalSale?.total_voucher}
                    </p>
                  </div>

                  <div className=" border-r border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className=" text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Cash
                    </h1>
                    <p className=" text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {dailyTotalSale?.total_cash}
                    </p>
                  </div>

                  <div className=" border-t border-b border-dim px-5 py-2 text-end w-auto">
                    <h1 className=" text-light font-semibold whitespace-nowrap tracking-wide">
                      Total Tax
                    </h1>
                    <p className=" text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {dailyTotalSale?.total_tax}
                    </p>
                  </div>

                  <div className=" border border-dim py-2 px-5 text-end w-auto ">
                    <h1 className=" text-light font-semibold whitespace-nowrap tracking-wide">
                      Total
                    </h1>
                    <p className=" text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                      {dailyTotalSale?.total}
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
