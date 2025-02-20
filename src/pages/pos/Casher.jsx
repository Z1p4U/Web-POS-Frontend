import useProduct from "../../redux/hooks/inventory/product/useProduct";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import Loader from "../../components/ui/loader/Loader";
import Banner from "../../components/ui/banner/Banner";
import ProductCalculator from "./components/ProductCalculator";
import { useCallback, useState } from "react";
import { Check } from "@mui/icons-material";
import useSetting from "../../redux/hooks/setting/useSetting";
import {
  Autocomplete,
  Chip,
  FormControl,
  Pagination,
  TextField,
} from "@mui/material";
import useSortedBrand from "../../redux/hooks/inventory/brand/useSortedBrand";
import useSortedCategory from "../../redux/hooks/inventory/category/useSortedCategory";
import useSortedSupplier from "../../redux/hooks/inventory/supplier/useSortedSupplier";

const Casher = () => {
  const [pagination, setPagination] = useState({ page: 1, per_page: 300 });
  const {
    products,
    status,
    pageCount,
    totalRecord,
    relationshipFilters,
    setSearch,
    refetchProducts,
    setRelationshipFilters,
  } = useProduct({ ...pagination });
  const { setting } = useSetting();
  const { sortedBrands } = useSortedBrand();
  const { sortedCategories } = useSortedCategory();
  const { sortedSuppliers } = useSortedSupplier();

  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value.trim();
    setSearch(inputValue);
    e.target.reset();
  };

  const selectProduct = (product) => {
    if (product.total_stock != 0) {
      setSelectedProduct((prev) => {
        const existingItem = prev.find(
          (item) => item.product.id === product.id
        );
        if (existingItem) {
          return prev;
          // return prev.filter((item) => item.product.id !== product.id); // This is for toggling select product
        }
        return [...prev, { quantity: 0, product }];
      });
    }
  };

  const onInputChange = useCallback(
    (field, value) => {
      if (field === "category_id" || field === "supplier_id") {
        const newValue = Array.isArray(value) ? value.join(",") : value;
        setRelationshipFilters((prev) => ({
          ...prev,
          [field]: newValue,
        }));
      } else {
        setRelationshipFilters((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    },
    [setRelationshipFilters]
  );

  const handlePaginate = (e, value) => {
    setPagination({ page: value, per_page: 300 });
  };

  return (
    <div className="relative">
      <div>
        <div className="grid grid-cols-3">
          {/* Left content */}
          <div className="col-span-2 flex flex-col gap-5 overflow-y-auto h-screen relative pt-[80px]">
            {/* Navbar */}
            <div className=" z-40 flex justify-between items-center min-h-[80px] bg-primary px-5 py-3 w-full fixed top-0 left-0">
              <Link to={"/"}>
                <img
                  src={`${setting?.logo ? setting?.logo : "/logo/logo.png"}`}
                  className=" aspect-square w-16"
                  alt="logo"
                />
              </Link>
            </div>

            {/* Search and Banner */}
            <div className="flex flex-col gap-5 border-b border-[#3f4245] p-5">
              <div className="flex flex-wrap flex-row justify-between items-center">
                <div className=" flex gap-4 items-center">
                  <Banner title={"Casher"} path1={"POS"} />
                </div>
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

              <div className=" flex flex-wrap gap-5 items-center">
                <div className=" text-nowrap text-lg lg:text-xl font-bold">
                  Filter Products :
                </div>
                <div className=" flex flex-row flex-wrap lg:flex-nowrap gap-10">
                  {/* Brand */}
                  <FormControl sx={{ minWidth: "180px" }} fullWidth>
                    <Autocomplete
                      id="brand-autocomplete"
                      options={sortedBrands || []}
                      groupBy={(option) => option.name[0].toUpperCase()}
                      getOptionLabel={(option) => option.name}
                      value={
                        relationshipFilters.brand_id
                          ? sortedBrands.find(
                              (brand) =>
                                brand.id === relationshipFilters.brand_id
                            )
                          : null
                      }
                      onChange={(event, newValue) => {
                        onInputChange("brand_id", newValue ? newValue.id : "");
                      }}
                      renderInput={(params) => {
                        const { key, ...rest } = params;
                        return (
                          <TextField
                            key={key}
                            {...rest}
                            label="Brand"
                            placeholder="Select Brand"
                            required
                          />
                        );
                      }}
                    />
                  </FormControl>

                  {/* Category Multi-Select with Chips */}
                  <FormControl sx={{ minWidth: "180px" }} fullWidth>
                    <Autocomplete
                      multiple
                      id="category-autocomplete"
                      options={sortedCategories || []}
                      groupBy={(option) => option.name[0]?.toUpperCase()}
                      getOptionLabel={(option) => option.name}
                      // Convert comma-separated string into an array of selected objects.
                      value={
                        relationshipFilters.category_id
                          ? sortedCategories.filter((cat) =>
                              relationshipFilters.category_id
                                .split(",")
                                .includes(String(cat.id))
                            )
                          : []
                      }
                      onChange={(event, newValue) => {
                        onInputChange(
                          "category_id",
                          newValue.map((option) => option.id)
                        );
                      }}
                      renderInput={(params) => {
                        const { key, ...rest } = params;
                        return (
                          <TextField
                            key={key}
                            {...rest}
                            label="Category"
                            placeholder="Select Category"
                            required
                          />
                        );
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                          const { key, ...chipProps } = getTagProps({ index });
                          return (
                            <Chip
                              key={key}
                              label={option.name}
                              {...chipProps}
                            />
                          );
                        })
                      }
                    />
                  </FormControl>

                  {/* Supplier Multi-Select with Chips */}
                  <FormControl sx={{ minWidth: "180px" }} fullWidth>
                    <Autocomplete
                      multiple
                      id="supplier-autocomplete"
                      options={sortedSuppliers || []}
                      groupBy={(option) => option.name[0].toUpperCase()}
                      getOptionLabel={(option) => option.name}
                      value={
                        relationshipFilters.supplier_id
                          ? sortedSuppliers.filter((sup) =>
                              relationshipFilters.supplier_id
                                .split(",")
                                .includes(String(sup.id))
                            )
                          : []
                      }
                      onChange={(event, newValue) => {
                        onInputChange(
                          "supplier_id",
                          newValue.map((option) => option.id)
                        );
                      }}
                      renderInput={(params) => {
                        const { key, ...rest } = params;
                        return (
                          <TextField
                            {...rest}
                            key={key}
                            label="Supplier"
                            placeholder="Select Supplier"
                            required
                          />
                        );
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                          const { key, ...chipProps } = getTagProps({ index });
                          return (
                            <Chip
                              key={key}
                              label={option.name}
                              {...chipProps}
                            />
                          );
                        })
                      }
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            {/* Product List */}
            <div className="mx-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-5">
                {status === "loading" ? (
                  <div className="col-span-4 h-full min-h-[500px] flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  products?.map((pd) => {
                    const isSelected = selectedProduct?.some(
                      (item) => item?.product.id === pd?.id
                    );

                    return (
                      <div
                        key={pd?.id}
                        onClick={() => selectProduct(pd)}
                        className={` col-span-1 rounded-lg ${
                          isSelected ? " shadow-md shadow-primary" : ""
                        }  ${pd?.total_stock == 0 ? " cursor-not-allowed" : " cursor-pointer"}`}
                      >
                        <div
                          className={`aspect-square relative select-none rounded-md shadow-md overflow-hidden`}
                        >
                          <div
                            className={`absolute top-2 left-2 bg-green-500 rounded-full ${isSelected ? "flex" : "hidden"} justify-center items-center aspect-square w-7 `}
                          >
                            <Check fontSize="10px" />
                          </div>
                          <div
                            className={`absolute rounded-sm ${pd?.total_stock == 0 ? "flex" : "hidden"} justify-center items-center bg-black opacity-75 text-nowrap w-full h-full z-10 `}
                          >
                            <p className=" absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white border-2 p-2 border-white font-semibold -rotate-12">
                              Out of stock !
                            </p>
                          </div>
                          <div
                            className={`absolute top-3 rounded-s-full right-0 px-2 rounded-sm ${pd?.total_stock <= 10 ? "flex" : "hidden"} text-sm text-white justify-center items-center bg-yellow-500 text-nowrap `}
                          >
                            <p className="">Low stock!</p>
                          </div>
                          <img
                            src={
                              pd?.photo
                                ? pd?.photo
                                : "https://i.pinimg.com/236x/01/21/8b/01218b1a1560ca260596cd19c14fb1d9.jpg"
                            }
                            alt=""
                            className="w-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-[#000000aa] flex flex-col gap-1 px-5 py-2 transition-all duration-300">
                            <p className="text-[#e8eaed] tracking-wider text-ellipsis overflow-hidden text-nowrap">
                              {pd?.name}
                            </p>
                            <p className="tracking-wider text-sm text-[#c4c0c0]">
                              {pd?.sale_price} kyat
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}

                <div className=" col-span-full flex justify-between flex-wrap gap-5 items-center pr-10 mt-8">
                  <div>
                    {`Showing ${
                      (pagination.page - 1) * pagination.per_page + 1
                    } to ${Math.min(
                      pagination.page * pagination.per_page,
                      totalRecord
                    )} of ${totalRecord}`}
                  </div>

                  <Pagination
                    count={pageCount}
                    shape="rounded"
                    size="large"
                    page={pagination.page}
                    onChange={handlePaginate}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="col-span-1 h-screen z-50">
            <div className="sticky top-0 h-full">
              <ProductCalculator
                refetchProducts={refetchProducts}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casher;
