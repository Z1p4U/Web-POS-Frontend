import useProduct from "../../redux/hooks/inventory/product/useProduct";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import Loader from "../../components/ui/loader/Loader";
import Banner from "../../components/ui/banner/Banner";
import ProductCalculator from "./components/ProductCalculator";
import { useState } from "react";
import { Check } from "@mui/icons-material";

const Casher = () => {
  const { products, setSearch } = useProduct({ noPagination: true });
  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value.trim();
    setSearch(inputValue);
    e.target.reset();
  };

  const selectProduct = (product) => {
    setSelectedProduct((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev;
      }
      return [...prev, { quantity: 1, product }];
    });
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="flex justify-between items-center min-h-[80px] bg-[#1976d2] px-5 py-3 w-full fixed top-0 right-0 left-0 z-10">
        <Link to={"/"}>
          <h1 className="font-semibold tracking-wider text-lg cursor-pointer text-white">
            DeepBlue POS
          </h1>
        </Link>
      </div>

      <div>
        <div className="grid grid-cols-3">
          {/* Left content */}
          <div className="col-span-2 flex flex-col gap-5 overflow-y-auto h-screen pt-[80px]">
            {/* Search and Banner */}
            <div className="flex max-[800px]:flex-col max-[800px]:gap-3 justify-between items-center border-b border-[#3f4245] py-5 px-5">
              <div className="w-[50%] flex gap-4 items-center">
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
            {/* Product List */}
            <div className="mx-5">
              <div className="grid grid-cols-4 max-[1110px]:grid-cols-3 max-[840px]:grid-cols-2 max-[665px]:grid-cols-1 gap-5 pb-5">
                {!products ? (
                  <div className="col-span-4 h-full min-h-[500px] flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  products?.map((pd) => {
                    const isSelected = selectedProduct.some(
                      (item) => item.product.id === pd.id
                    );

                    return (
                      <div
                        key={pd?.id}
                        onClick={() => selectProduct(pd)}
                        className={`cursor-pointer rounded-lg ${
                          isSelected ? " shadow-xl" : ""
                        }`}
                      >
                        <div
                          className={`aspect-square relative select-none rounded-md shadow-md overflow-hidden`}
                        >
                          <div
                            className={`absolute top-2 right-2 bg-green-500 rounded-full ${isSelected ? "flex" : "hidden"} justify-center items-center aspect-square w-7 `}
                          >
                            <Check fontSize="10px" />
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
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="col-span-1 h-screen pt-[80px]">
            <div className="sticky top-0 h-full">
              <ProductCalculator
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
