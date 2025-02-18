import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const EntryProductConfirmation = React.memo(
  ({ formData, brands, categories, suppliers }) => {
    // Helper function to display required text
    const renderValue = (value, isRequired = true) => {
      if (!value && isRequired) {
        return <span className="text-red-500 font-semibold">Required</span>;
      }
      return value;
    };

    // Helper function to map IDs to names
    const mapIdsToNames = (ids, dataArray) => {
      return ids.map((id) => {
        const foundItem = dataArray.find((item) => item.id === id);
        return foundItem ? foundItem.name : `Unknown (${id})`;
      });
    };

    return (
      <Box className="flex gap-10 h-full">
        {/* Form Fields */}
        <Box className="w-full lg:w-5/6">
          <Box className="border w-full border-gray-400 p-10 flex flex-col gap-6 rounded-md">
            <div>
              <div className=" bg-light border-b border-dim rounded-t-lg ">
                <div className="pb-10 pt-7 mt-[73px] flex items-center relative">
                  <div className=" absolute top-[-70px] left-[33px] bg-primary rounded-full">
                    <img
                      src={formData?.photo || ""}
                      alt=""
                      className=" rounded-full w-[150px] aspect-square object-contain"
                    />
                  </div>

                  <div className=" flex w-full justify-end">
                    <div className="flex flex-col gap-3 mr-[80px]">
                      <h1 className=" text-xl text-secondary font-bold tracking-wider mb-1">
                        {renderValue(formData?.name)}
                      </h1>
                      <div className=" flex flex-col gap-1 text-sm">
                        <div className="flex gap-1 tracking-wide">
                          <span className=" text-secondary font-semibold">
                            Sale Price :
                          </span>
                          <span className=" text-secondary">
                            {renderValue(formData?.sale_price)}
                          </span>
                        </div>
                        <div className="flex gap-1 tracking-wide">
                          <span className=" text-secondary font-semibold">
                            Actual Price :
                          </span>
                          <span className=" text-secondary">
                            {renderValue(formData?.actual_price)}
                          </span>
                        </div>
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
                {/* Information */}
                <div className={` px-10 py-6 flex flex-col gap-5`}>
                  <div className=" flex items-center gap-10 tracking-wider">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Name</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <p className=" text-white">{renderValue(formData?.name)}</p>
                  </div>

                  <div className=" flex items-center gap-10 tracking-wider">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Brand</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <p className=" text-white">
                      {renderValue(
                        mapIdsToNames([formData?.brand_id], brands)[0]
                      )}
                    </p>
                  </div>

                  <div className=" flex items-start gap-10 tracking-wider">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Categories</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <div className=" w-4/5 flex flex-wrap gap-x-2 gap-y-1">
                      {formData?.category_ids?.length > 0 ? (
                        mapIdsToNames(formData?.category_ids, categories).map(
                          (catName) => (
                            <p
                              className=" text-xs hover:text-light break-words bg-secondary rounded-full px-2 py-1 text-white"
                              key={catName}
                            >
                              {catName}
                            </p>
                          )
                        )
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className=" flex items-start gap-10 tracking-wider">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Suppliers</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <div className=" w-4/5 flex flex-wrap gap-x-2 gap-y-1">
                      {formData?.supplier_ids?.length > 0 ? (
                        mapIdsToNames(formData?.supplier_ids, suppliers).map(
                          (supName) => (
                            <p
                              className=" text-xs hover:text-light break-words bg-secondary rounded-full px-2 py-1 text-white"
                              key={supName}
                            >
                              {supName}
                            </p>
                          )
                        )
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className=" flex items-center gap-10 tracking-wide">
                    <div className=" w-[100px]">
                      <p className=" text-white font-semibold">Stock</p>
                    </div>
                    <p className=" text-white"> : </p>
                    <p className=" text-white">0</p>
                  </div>
                  {formData?.description && (
                    <div className=" flex items-start gap-10 tracking-wide">
                      <div className=" w-[100px]">
                        <p className=" text-white font-semibold">Description</p>
                      </div>
                      <p className=" text-white"> : </p>
                      <div className="max-w-[60%] w-full">
                        <p className=" text-white text-sm ">
                          {formData?.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    );
  }
);

EntryProductConfirmation.displayName = "EntryProductConfirmation";

EntryProductConfirmation.propTypes = {
  formData: PropTypes.object.isRequired,
  brands: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  suppliers: PropTypes.array.isRequired,
};

export default EntryProductConfirmation;
