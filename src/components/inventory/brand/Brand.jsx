import { BiPlus, BiSearch } from "react-icons/bi";
import Banner from "../../ui/banner/Banner";
import BrandTable from "./components/BrandTable";
import useBrand from "../../../redux/hooks/brand/useBrand";
import ConfirmationModal from "../../ui/model/ConfirmationModal";
import { useState } from "react";

const Brand = () => {
  const {
    brands,
    pagination,
    setPagination,
    pageCount,
    setSearch,
    handleDeleteBrand,
  } = useBrand();
  const handlePaginate = (e, value) => {
    setPagination({ page: value, per_page: 10 });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // Store the ID to delete

  const handleOpenModal = (id) => {
    setSelectedId(id); // Set the ID to delete
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setSelectedId(null); // Clear the ID when closing the modal
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await handleDeleteBrand(selectedId);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting the brand:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    setSearch(inputValue);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] my-6 flex flex-col gap-8">
        {/* banner  */}
        <Banner title={"Brands"} path1={"Inventory"} />
        {/* banner  */}

        <div className="flex flex-col gap-3">
          <div className=" flex justify-start flex-col items-start md:flex-row md:justify-between gap-3">
            <a className="px-5 py-3 flex justify-center items-center gap-3 rounded-lg bg-primary text-center text-white cursor-pointer hover:opacity-80 transition-colors duration-300">
              <BiPlus size={20} />
              Add Brand
            </a>

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
        </div>
        {brands?.length == 0 ? (
          <div className=" h-1/2 min-h-[300px] flex justify-center items-center">
            <h1 className=" text-primary text-lg lg:text-2xl font-bold">
              No Brands Yet
            </h1>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* table  */}
            {/* <VoucherTable brands={brands} exportVoucher={exportVoucher} /> */}
            <BrandTable
              brands={brands}
              pageCount={pageCount}
              pagination={pagination}
              handlePaginate={handlePaginate}
              handleOpenModal={handleOpenModal}
            />
            {/* table  */}
          </div>
        )}
      </div>

      <ConfirmationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this brand? This action cannot be undone."
      />
    </div>
  );
};

export default Brand;
