import { BiPlus, BiSearch } from "react-icons/bi";
import Banner from "../../ui/banner/Banner";
import ProductTable from "./components/ProductTable";
import { useRef, useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TableViewIcon from "@mui/icons-material/TableView";
import useProduct from "../../../redux/hooks/inventory/product/useProduct";
import ProductCard from "./components/ProductCard";
import { Link } from "react-router-dom";
import { Box, Button, Menu, MenuItem, Modal, Typography } from "@mui/material";

const Product = () => {
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const [tableView, setTableView] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const {
    products,
    pageCount,
    totalRecord,
    setSearch,
    refetchProducts,
    handleExportProducts,
    handleImportProducts,
  } = useProduct({ page: 1, per_page: 10 });

  const openExportMenu = (event) => setExportAnchorEl(event.currentTarget);
  const closeExportMenu = () => setExportAnchorEl(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const allowedFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    if (file) {
      // Validate file size
      if (file.size > maxFileSize) {
        alert("File size exceeds 5MB. Please select a smaller file.");
        return;
      }

      // Validate file type
      if (!allowedFileTypes.includes(file.type)) {
        alert("Invalid file type. Please select a .csv or .xlsx file.");
        return;
      }

      // Set the file if valid
      setSelectedFile(file);
    }
  };

  const handleImportModalClose = () => {
    setSelectedFile(null);
    setImportModalOpen(false);
  };

  const handleImportSubmit = async () => {
    if (!selectedFile) return;
    try {
      await handleImportProducts(selectedFile);
      refetchProducts();
      setImportModalOpen(false);
    } catch (error) {
      console.error("Import Error:", error);
    }
  };

  const handlePaginate = (e, value) => {
    setPagination({ page: value, per_page: 10 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    setSearch(inputValue);
  };

  return (
    <>
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

            <div className=" flex justify-end items-center gap-5">
              <Button
                onClick={() => setImportModalOpen(true)}
                className="py-2 px-4 rounded-lg font-bold hover:opacity-80 transition-colors duration-200"
                sx={{
                  backgroundColor: "#22c55e",
                  color: "white",
                  px: 2,
                  py: 1,
                }}
              >
                Import
              </Button>
              <div>
                <Button
                  onClick={openExportMenu}
                  className=" py-2 px-4 rounded-lg font-bold hover:opacity-80 transition-colors duration-200"
                  sx={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    px: 2,
                    py: 1,
                  }}
                >
                  Export
                </Button>
                <Menu
                  anchorEl={exportAnchorEl}
                  open={Boolean(exportAnchorEl)}
                  onClose={closeExportMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleExportProducts("csv");
                      closeExportMenu();
                    }}
                  >
                    Export as CSV
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleExportProducts("excel");
                      closeExportMenu();
                    }}
                  >
                    Export as Excel
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>

          <div className=" flex flex-wrap justify-end md:items-center gap-3">
            <div className="flex ">
              <button
                aria-label="Switch to Table View"
                onClick={() => setTableView(true)}
                disabled={tableView}
                className={`${
                  tableView && "text-[#8AB4F8]"
                } flex justify-center items-center w-10 h-10 rounded-l-md border border-[#7E7F80] text-[#7E7F80]`}
              >
                <TableViewIcon fontSize="20" />
              </button>
              <button
                aria-label="Switch to Card View"
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

      <Modal
        open={importModalOpen}
        onClose={handleImportModalClose}
        aria-labelledby="import-products-modal"
        aria-describedby="import-products-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="import-products-modal" variant="h6" mb={2}>
            Import Products
          </Typography>
          <Box
            sx={{
              height: 150,
              width: "100%",
              bgcolor: "grey.200",
              border: "1px dashed grey",
              borderRadius: 2,
              mb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => fileInputRef.current.click()}
          >
            {selectedFile ? (
              <Typography color="text.secondary">
                Selected File: {selectedFile.name}
              </Typography>
            ) : (
              <Typography color="text.secondary">
                Click to select an Excel or CSV file
              </Typography>
            )}
          </Box>
          <input
            type="file"
            accept=".csv, .xlsx"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              onClick={handleImportSubmit}
              sx={{
                backgroundColor: "#22c55e",
                color: "white",
                flex: 1,
                "&:hover": { backgroundColor: "#16a34a" },
                "&:disabled": { color: "white", opacity: "0.5" },
              }}
              disabled={!selectedFile}
            >
              Import
            </Button>
            <Button
              onClick={handleImportModalClose}
              sx={{
                backgroundColor: "grey.500",
                color: "white",
                flex: 1,
                "&:hover": { backgroundColor: "grey.700" },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Product;
