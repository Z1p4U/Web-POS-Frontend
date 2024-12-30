import PropTypes from "prop-types";
import Loader from "../../../ui/loader/Loader";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";

const ProductCard = ({
  products,
  pageCount,
  pagination,
  handlePaginate,
  totalRecord,
}) => {
  return (
    <div>
      {!products ? (
        <div className=" ">
          <Loader />
        </div>
      ) : (
        <div>
          <div className=" pl-2">
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
              {products?.map((pd) => {
                return (
                  <Link to={`/inventory/product/${pd?.id}`} key={pd?.id}>
                    <div className=" aspect-square relative select-none cursor-pointer rounded-md shadow-md overflow-hidden group/pd-card">
                      <img
                        src={
                          pd?.photo
                            ? pd?.photo
                            : "https://i.pinimg.com/236x/01/21/8b/01218b1a1560ca260596cd19c14fb1d9.jpg"
                        }
                        alt=""
                        className=" w-full object-contain"
                      />

                      <div className=" absolute -bottom-7 group-hover/pd-card:bottom-0 left-0 right-0 bg-[#000000aa] flex flex-col gap-1 px-5 py-2 transition-all duration-300 ">
                        <p className="text-[#e8eaed] tracking-wider text-ellipsis overflow-hidden text-nowrap">
                          {pd?.name}
                        </p>
                        <p className=" tracking-wider text-sm text-[#c4c0c0]">
                          {pd?.sale_price} kyat
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

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
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  products: PropTypes.any.isRequired,
  pagination: PropTypes.any,
  pageCount: PropTypes.any,
  totalRecord: PropTypes.any,
  refetchProducts: PropTypes.any,
  handlePaginate: PropTypes.any,
};

export default ProductCard;
