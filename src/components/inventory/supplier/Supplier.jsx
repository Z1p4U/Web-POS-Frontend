import { BiPlus, BiSearch } from "react-icons/bi";
import Banner from "../../ui/banner/Banner";
import { useState } from "react";
import useSupplier from "../../../redux/hooks/supplier/useSupplier";
import EntrySupplier from "./components/EntrySupplier";
import SupplierTable from "./components/SupplierTable";

const Supplier = () => {
  const {
    suppliers,
    pagination,
    pageCount,
    setSearch,
    setPagination,
    handleDeleteSupplier,
    handleUpdateSupplier,
    handleCreateSupplier,
  } = useSupplier();
  const [addModal, setAddModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);

  const handlePaginate = (e, value) => {
    setPagination({ page: value, per_page: 10 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    setSearch(inputValue);
  };

  const handleEdit = (supplier) => {
    setEditSupplier(supplier);
    setAddModal(true);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] my-6 flex flex-col gap-8">
        <div className=" flex justify-start flex-col items-start md:flex-row md:justify-between gap-3">
          {/* banner  */}
          <Banner title={"Suppliers"} path1={"Inventory"} />
          {/* banner  */}
          <div
            onClick={() => setAddModal(true)}
            className="px-5 py-3 flex justify-center items-center gap-3 rounded-lg bg-primary text-center text-white cursor-pointer hover:opacity-80 transition-colors duration-300"
          >
            <BiPlus size={20} />
            Add Supplier
          </div>
          <EntrySupplier
            addModal={addModal}
            currentSupplier={editSupplier}
            setAddModal={setAddModal}
            handleCreateSupplier={handleCreateSupplier}
            handleUpdateSupplier={handleUpdateSupplier}
            setEditSupplier={setEditSupplier}
          />
        </div>

        <div className="flex flex-col gap-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="border-2 border-[#E8EAED] py-[6px] pr-5 pl-10 rounded-md outline-none focus:border-primary duration-300 font-medium placeholder:tracking-wider"
            />
            <div className="absolute top-[10px] left-[11px]">
              <BiSearch size={20} />
            </div>
          </form>
        </div>
        {suppliers?.length == 0 ? (
          <div className=" h-1/2 min-h-[300px] flex justify-center items-center">
            <h1 className=" text-primary text-lg lg:text-2xl font-bold">
              No Suppliers Yet
            </h1>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* table  */}
            <SupplierTable
              suppliers={suppliers}
              pageCount={pageCount}
              pagination={pagination}
              handleEdit={handleEdit}
              handlePaginate={handlePaginate}
              handleUpdateSupplier={handleUpdateSupplier}
              handleDeleteSupplier={handleDeleteSupplier}
            />
            {/* table  */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplier;
