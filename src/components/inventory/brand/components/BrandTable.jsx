import { Pagination } from "@mui/material";
import Loader from "../../../ui/loader/Loader";
import PropTypes from "prop-types";
import { BiEdit, BiTrash } from "react-icons/bi";
import ConfirmationModal from "../../../ui/model/ConfirmationModal";
import { useState } from "react";

const BrandTable = ({
  brands,
  pagination,
  handlePaginate,
  pageCount,
  handleDeleteBrand,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
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

  return (
    <>
      {!brands ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="text-white md:whitespace-nowrap md:block w-full">
            <thead className="tracking-wider text-sm border border-dim">
              <tr className="bg-primary">
                <th className="p-4 text-start">NO</th>
                <th className="p-4 text-start">PHOTO</th>
                <th className="p-4 text-start">NAME</th>
                <th className="p-4 text-start">COMPANY</th>
                <th className="p-4 text-center max-w-[1000px]">NOTE</th>
                <th className="p-4 text-end"></th>
              </tr>
            </thead>
            <tbody className="tracking-wide text-sm">
              {brands?.map((brand) => (
                <tr
                  key={brand?.id}
                  className="bg-secondary hover:opacity-90 duration-300 border border-dim"
                >
                  <td className="p-4 text-start">{brand?.id}</td>
                  <td className="p-4 text-start">
                    <img
                      src={brand?.photo}
                      className=" object-contain aspect-square w-20"
                      alt=""
                    />
                  </td>
                  <td className="p-4 text-start">{brand?.name}</td>
                  <td className="p-4 text-start">{brand?.company}</td>
                  <td className="p-4 text-start max-w-[1000px] text-wrap">
                    {brand?.note}
                  </td>
                  <td className="p-4 text-start">
                    <div className=" flex flex-row gap-3">
                      <div className="px-3 py-2 rounded-lg bg-primary text-center cursor-pointer hover:opacity-80 hover:text-light transition-all duration-200">
                        <BiEdit className=" text-lg" />
                      </div>
                      <div
                        onClick={() => handleOpenModal(brand?.id)}
                        className="px-3 py-2 rounded-lg bg-primary text-center cursor-pointer hover:opacity-80 hover:text-red-500 transition-all duration-200"
                      >
                        <BiTrash className=" text-lg" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className=" flex justify-end pr-10">
        <Pagination
          count={pageCount}
          shape="rounded"
          size="large"
          page={pagination.first}
          onChange={handlePaginate}
        />
      </div>

      <ConfirmationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this brand? This action cannot be undone."
      />
    </>
  );
};

BrandTable.propTypes = {
  brands: PropTypes.any.isRequired,
  pagination: PropTypes.any,
  pageCount: PropTypes.any,
  handlePaginate: PropTypes.any,
  handleDeleteBrand: PropTypes.any,
};

export default BrandTable;
