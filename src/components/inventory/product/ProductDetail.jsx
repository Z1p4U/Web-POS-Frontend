import { Link, useParams } from "react-router-dom";
import useProduct from "../../../redux/hooks/inventory/product/useProduct";
import { useEffect, useRef, useState } from "react";
import Banner from "../../ui/banner/Banner";
import Loader from "../../ui/loader/Loader";
import { BiEdit } from "react-icons/bi";
import ProductDetailStockMovement from "./components/productDetail/ProductDetailStockMovement";
import Barcode from "react-barcode";
import { Box, Modal } from "@mui/material";

const ProductDetail = () => {
  const { productId } = useParams();
  const { handleProductDetail, pdDetail } = useProduct();
  const [openModal, setOpenModal] = useState(false);

  const barcodeRef = useRef();

  useEffect(() => {
    if (productId) {
      handleProductDetail(productId).catch(() => {
        console.error("Failed to fetch product details");
      });
    }
  }, [handleProductDetail, productId]);

  const handleDownloadBarcode = () => {
    const svg = barcodeRef.current.querySelector("svg");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "barcode.png";
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className=" w-full flex justify-center">
      <div className="w-[95%] my-6 flex flex-col gap-8">
        {/* banner  */}
        <Banner
          title={`${pdDetail?.name}`}
          path1={"Inventory"}
          path2={"Product"}
        />
        {/* banner  */}

        {!pdDetail ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className=" ">
              <div className=" bg-light border-b border-dim rounded-t-lg ">
                <div className="pb-10 pt-7 mt-[73px] flex items-center relative">
                  <div className=" absolute top-[-70px] left-[33px] bg-primary rounded-full">
                    <img
                      src={pdDetail?.photo ? pdDetail?.photo : <></>}
                      alt=""
                      className=" rounded-full w-[150px] aspect-square object-contain"
                    />
                  </div>

                  <Link
                    to={{
                      pathname: "/inventory/entry-product/", // Target route
                    }}
                    state={{ product: pdDetail }} // Pass the product as state
                    className="absolute top-5 right-5 bg-primary text-light hover:opacity-75 transition-all duration-200 cursor-pointer rounded-full aspect-square w-10 flex justify-center items-center"
                  >
                    <BiEdit />
                  </Link>

                  <div className=" flex w-full">
                    <div className="flex flex-col gap-3 ml-[213px]">
                      <h1 className=" text-xl text-secondary font-bold tracking-wider mb-1">
                        {pdDetail?.name}
                      </h1>
                      <div className=" flex flex-col gap-1 text-sm">
                        <div className="flex gap-1 tracking-wide">
                          <span className=" text-secondary font-semibold">
                            Sale Price :
                          </span>
                          <span className=" text-secondary">
                            {pdDetail?.sale_price} Ks
                          </span>
                        </div>
                        <div className="flex gap-1 tracking-wide">
                          <span className=" text-secondary font-semibold">
                            Actual Price :
                          </span>
                          <span className=" text-secondary">
                            {pdDetail?.actual_price} Ks
                          </span>
                        </div>
                      </div>
                      <div
                        onClick={() => setOpenModal(true)}
                        className=" bg-primary text-white flex justify-center items-center rounded-md font-semibold tracking-wide cursor-pointer text-sm w-fit px-3 py-2 mt-3 hover:opacity-80"
                      >
                        View Barcode
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" bg-primary rounded-b-lg ">
                <div className={` pt-2 px-10`}>
                  <p className=" font-semibold text-lg text-white">
                    Detailed Information
                  </p>
                </div>
                {/* Information  */}
                <div className={` px-10 py-6 flex flex-col gap-5`}>
                  <div className=" flex items-center gap-10 tracking-wider">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Name</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <p className=" text-white">{pdDetail?.name}</p>
                  </div>

                  <div className=" flex items-center gap-10 tracking-wider">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Brand</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <p className=" text-white">{pdDetail?.brand_name}</p>
                  </div>

                  <div className=" flex items-start gap-10 tracking-wider">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Categories</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <div className=" w-4/5 flex flex-wrap gap-x-2 gap-y-1">
                      {pdDetail?.category_names?.map((cat) => {
                        return (
                          <p
                            className=" text-xs hover:text-light break-words bg-secondary rounded-full px-2 py-1 text-white"
                            key={cat}
                          >
                            {cat}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  <div className=" flex items-start gap-10 tracking-wider">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Suppliers</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <div className=" w-4/5 flex flex-wrap gap-x-2 gap-y-1">
                      {pdDetail?.supplier_names?.map((sup) => {
                        return (
                          <p
                            className=" text-xs hover:text-light break-words bg-secondary rounded-full px-2 py-1 text-white"
                            key={sup}
                          >
                            {sup}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  <div className=" flex items-center gap-10 tracking-wide">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Stock</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <p className=" text-white">
                      {pdDetail?.total_stock} {pdDetail?.unit}
                    </p>
                  </div>
                  {pdDetail?.description && (
                    <div className=" flex items-start gap-10 tracking-wide">
                      <div className=" w-[100px]">
                        <p className=" text-white font-semibold">Description</p>
                      </div>
                      <p className=" text-white"> : </p>
                      <div className="max-w-[60%] w-full">
                        <p className=" text-white text-sm ">
                          {pdDetail?.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="barcode-modal-title"
              aria-describedby="barcode-modal-description"
              sx={{ border: 0, outline: 0 }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <div ref={barcodeRef}>
                  <Barcode
                    value={pdDetail?.id?.toString() || "DefaultBarcode"}
                    format="CODE128"
                  />
                </div>
                <div
                  onClick={() => handleDownloadBarcode()}
                  className=" bg-primary text-white flex justify-center items-center rounded-md font-semibold tracking-wide cursor-pointer text-sm w-fit px-3 py-2 mt-3 hover:opacity-80 mx-auto"
                >
                  Download Barcode
                </div>
              </Box>
            </Modal>

            {/* Media Control */}
            <div className="w-full flex items-center justify-between mt-10">
              <p className="text-[#c5c1c1] tracking-wide">
                <Link to={"/"}>Home</Link> <span> / </span>
                <span>Inventory</span>
                <span> / </span>
                <Link to={"/inventory/product"}>Products</Link>
                <span> / </span> <span className=" text-primary">Record</span>
              </p>
            </div>
            {/* Media Control */}

            <div className=" mt-9 flex flex-col gap-8">
              {pdDetail?.stock_record && (
                <div>
                  <ProductDetailStockMovement
                    stockRecord={pdDetail?.stock_record}
                  />
                </div>
              )}
              {/* <div>
                <ProductDetailTable2 />
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
