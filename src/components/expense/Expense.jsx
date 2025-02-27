import { BiPlus } from "react-icons/bi";
import Banner from "../ui/banner/Banner";
import { useState } from "react";
import useUserProfile from "../../redux/hooks/user/useUserProfile";
import EntryExpense from "./components/EntryExpense";
import ExpenseTable from "./components/ExpenseTable";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useMonthlyExpense from "../../redux/hooks/expense/useMonthlyExpense";

const Expense = () => {
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });

  const {
    monthlyExpenseList,
    monthlyExpenseAmount,
    pageCount,
    totalRecord,
    selectedMonth,
    setSelectedMonth,
    handleDeleteExpense,
    handleCreateExpense,
    handleUpdateExpense,
  } = useMonthlyExpense({ ...pagination });
  const { isAdmin } = useUserProfile();

  const [addModal, setAddModal] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  const handlePaginate = (e, value) => {
    setPagination({ page: value, per_page: 10 });
  };

  const handleMonthChange = (newValue) => {
    if (newValue) {
      const formattedMonth = dayjs(newValue).format("YYYY-MM");
      setSelectedMonth(formattedMonth);
    }
  };

  const handleEdit = (expense) => {
    setEditExpense(expense);
    setAddModal(true);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] my-6 flex flex-col gap-8">
        <div className=" flex justify-start flex-col items-start md:flex-row md:justify-between gap-3">
          {/* banner  */}
          <Banner title={"Expenses"} path1={"Inventory"} />
          {/* banner  */}
          {isAdmin ? (
            <>
              <div
                onClick={() => setAddModal(true)}
                className="px-5 py-3 flex justify-center items-center gap-3 rounded-lg bg-primary text-center text-white cursor-pointer hover:opacity-80 transition-colors duration-300"
              >
                <BiPlus size={20} />
                Add Expense
              </div>
              <EntryExpense
                addModal={addModal}
                currentExpense={editExpense}
                setAddModal={setAddModal}
                handleCreateExpense={handleCreateExpense}
                handleUpdateExpense={handleUpdateExpense}
                setEditExpense={setEditExpense}
              />
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Month"
                value={selectedMonth ? dayjs(selectedMonth) : null}
                onChange={handleMonthChange}
                format="YYYY-MM"
                openTo="month"
                views={["year", "month"]}
              />
            </LocalizationProvider>
          </div>
        </div>
        {monthlyExpenseList?.data?.length == 0 ? (
          <div className=" h-1/2 min-h-[300px] flex justify-center items-center">
            <h1 className=" text-primary text-lg lg:text-2xl font-bold">
              No Expenses Yet
            </h1>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* table  */}
            <ExpenseTable
              expenses={monthlyExpenseList}
              pageCount={pageCount}
              pagination={pagination}
              handleEdit={handleEdit}
              totalRecord={totalRecord}
              isAdmin={isAdmin}
              handlePaginate={handlePaginate}
              handleDeleteExpense={handleDeleteExpense}
            />
            {/* table  */}

            <div
              className={`${
                !monthlyExpenseList ? "hidden" : "flex"
              } gap-5 items-end w-full overflow-auto`}
            >
              {/* TOTAL MONTHLY Report */}
              <div className="flex mt-5 border-dim bg-primary">
                <div className="border-r border-t border-b border-dim px-5 py-2 text-end w-auto">
                  <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                    Total Expenses
                  </h1>
                  <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                    {monthlyExpenseList?.length}
                  </p>
                </div>

                <div className="border-r border-t border-b border-dim px-5 py-2 text-end w-auto">
                  <h1 className="text-light font-semibold whitespace-nowrap tracking-wide">
                    Total Amount
                  </h1>
                  <p className="text-white text-xl whitespace-nowrap tracking-wider font-semibold">
                    {monthlyExpenseAmount?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;
