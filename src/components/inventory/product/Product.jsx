import { BiPlus, BiSearch } from "react-icons/bi";
import Banner from "../../ui/banner/Banner";
import ProductTable from "./components/ProductTable";
import { useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TableViewIcon from "@mui/icons-material/TableView";
import useProduct from "../../../redux/hooks/inventory/product/useProduct";
import ProductCard from "./components/ProductCard";
import { Link } from "react-router-dom";

const Product = () => {
  const {
    products,
    pagination,
    setPagination,
    pageCount,
    totalRecord,
    setSearch,
    refetchProducts,
  } = useProduct();

  const [tableView, setTableView] = useState(true);

  const handlePaginate = (e, value) => {
    setPagination({ page: value, per_page: 10 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    setSearch(inputValue);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] my-6 flex flex-col gap-8">
        <div className=" flex justify-start flex-col items-start md:flex-row md:justify-between gap-3">
          {/* banner  */}
          <Banner title={"Products"} path1={"Inventory"} />
          {/* banner  */}
          <Link
            to={"/inventory/entry-product/"}
            className="px-5 py-3 flex justify-center items-center gap-3 rounded-lg bg-primary text-center text-white cursor-pointer hover:opacity-80 transition-colors duration-300"
          >
            <BiPlus size={20} />
            Add Product
          </Link>
        </div>

        <div className=" flex flex-wrap justify-end md:justify-between  md:items-center gap-3">
          <div className="flex flex-col gap-3 w-full md:w-fit ">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="border-2 w-full border-[#E8EAED] py-[6px] pr-5 pl-10 rounded-md outline-none focus:border-primary duration-300 font-medium placeholder:tracking-wider"
              />
              <div className="absolute top-[10px] left-[11px]">
                <BiSearch size={20} />
              </div>
            </form>
          </div>

          <div className="flex ">
            <button
              onClick={() => setTableView(true)}
              disabled={tableView}
              className={`${
                tableView && "text-[#8AB4F8]"
              } flex justify-center items-center w-10 h-10 rounded-l-md border border-[#7E7F80] text-[#7E7F80]`}
            >
              <TableViewIcon fontSize="20" />
            </button>
            <button
              onClick={() => setTableView(false)}
              disabled={!tableView}
              className={`${
                !tableView && "text-[#8AB4F8]"
              } flex justify-center items-center w-10 h-10 rounded-r-md border-l-0 border border-[#7E7F80] text-[#7E7F80]`}
            >
              <FormatListBulletedIcon fontSize="20" />
            </button>
          </div>
        </div>
        {products?.length == 0 ? (
          <div className=" h-1/2 min-h-[300px] flex justify-center items-center">
            <h1 className=" text-primary text-lg lg:text-2xl font-bold">
              No Products Yet
            </h1>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-8">
              <div>
                {tableView ? (
                  <>
                    {/* table  */}
                    <ProductTable
                      products={products}
                      pageCount={pageCount}
                      pagination={pagination}
                      totalRecord={totalRecord}
                      handlePaginate={handlePaginate}
                      refetchProducts={refetchProducts}
                    />
                    {/* table  */}
                  </>
                ) : (
                  <>
                    {/* table  */}
                    <ProductCard
                      products={products}
                      pageCount={pageCount}
                      pagination={pagination}
                      totalRecord={totalRecord}
                      handlePaginate={handlePaginate}
                      refetchProducts={refetchProducts}
                    />
                    {/* table  */}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
