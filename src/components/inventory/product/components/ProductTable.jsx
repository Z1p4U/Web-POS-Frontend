import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Loader from "../../../ui/loader/Loader";
import PropTypes from "prop-types";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import EntryStock from "./EntryStock";
import { Link } from "react-router-dom";

const ProductTable = ({
  products,
  pageCount,
  pagination,
  totalRecord,
  handlePaginate,
  refetchProducts,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockEntryModal, setStockEntryModal] = useState(false);

  const handleAddProductStock = (stock) => {
    setSelectedProduct(stock);
    setStockEntryModal(true);
  };

  return (
    <>
      {!products ? (
        <div>
          <Loader />
        </div>
      ) : (
        <TableContainer component={Paper} className="overflow-x-auto">
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#002d5d", color: "#fff" }}>
                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white" }}
                >
                  NO
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white" }}
                >
                  PHOTO
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white" }}
                >
                  NAME
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white", maxWidth: 500 }}
                >
                  BRAND
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white" }}
                >
                  SALE PRICE
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white", maxWidth: 500 }}
                >
                  TOTAL STOCK
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ padding: "16px", color: "white" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product, index) => {
                const rowNumber =
                  (pagination.page - 1) * pagination.per_page + index + 1;
                return (
                  <TableRow
                    key={product?.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#38577e" : "#38577e", // alternate row colors (bg-secondary & bg-primary)
                      "&:hover": {
                        opacity: 0.9,
                      },
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {rowNumber}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: "16px" }}>
                      <img
                        src={product?.photo}
                        className="object-contain aspect-square w-20"
                        alt=""
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {product?.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {product?.brand_name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      {product?.sale_price} Ks
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "#fff", padding: "16px" }}
                    >
                      <div
                        className={`mx-auto pl-2 pr-1 py-1 rounded-full flex justify-center items-center w-fit gap-2 text-primary ${product?.total_stock < 11 ? " bg-red-300" : " bg-green-300"}`}
                      >
                        {product?.total_stock}
                        <div
                          onClick={() => handleAddProductStock(product)}
                          className=" p-1 flex justify-center items-center rounded-full bg-secondary cursor-pointer hover:opacity-80"
                        >
                          <BiPlus className="text-white" />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell align="center" sx={{ padding: "16px" }}>
                      <Link
                        to={`/inventory/product/${product.id}`}
                        className="bg-[#002d5d] text-white py-2 px-4 rounded-lg font-bold inline-block text-center hover:bg-[#001a3d] transition-colors duration-200"
                      >
                        View Detail
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <div className="flex justify-between flex-wrap gap-5 items-center pr-10 mt-8">
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

      <EntryStock
        stockEntryModal={stockEntryModal}
        currentProduct={selectedProduct}
        setStockEntryModal={setStockEntryModal}
        setCurrentProduct={setSelectedProduct}
        refetchProducts={refetchProducts}
      />
    </>
  );
};

ProductTable.propTypes = {
  products: PropTypes.any.isRequired,
  pagination: PropTypes.any,
  pageCount: PropTypes.any,
  totalRecord: PropTypes.any,
  refetchProducts: PropTypes.any,
  handlePaginate: PropTypes.any,
};

export default ProductTable;
