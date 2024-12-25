import { useState } from "react";
import Banner from "../ui/banner/Banner";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Link } from "react-router-dom";
import useMedia from "../../redux/hooks/media/useMedia";
import MediaList from "./components/MediaList";

const Media = () => {
  const {
    photos,
    handleCreatePhoto,
    pagination,
    handlePaginate,
    pageCount,
    handleDeletePhoto,
  } = useMedia();

  const [hover, setHover] = useState(false);

  const handleSubmit = async (files) => {
    if (!files || files.length === 0) {
      console.error("No files to upload.");
      return;
    }

    const photos = new FormData();
    for (let i = 0; i < files.length; i++) {
      photos.append("photos[]", files[i], files[i].name);
    }

    try {
      const response = await handleCreatePhoto(photos);
      console.log("Server Response:", response);
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await handleDeletePhoto(id);
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setHover(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setHover(true);
  };

  return (
    <>
      {/* BreadCrump */}
      <Banner title={"Media"} />
      {/* BreadCrump */}

      {/* Uploader */}
      <div
        onDropCapture={handleDragLeave}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(e) => handleSubmit([...e.dataTransfer.files])}
        className={`${hover && " opacity-70"} drag w-full border border-light bg-primary rounded-md flex flex-col gap-8 p-10 py-14 duration-200`}
      >
        <div
          onClick={() => {
            document.querySelector(".input-field").click();
          }}
          className={`${hover && "scale-110 bg-white"} w-[120px] h-[120px] bg-secondary rounded-full flex justify-center items-center mx-auto cursor-pointer duration-500`}
        >
          <div
            className={`${hover && "border-blue-500 bg-white"} w-[85px] h-[85px] bg-secondary rounded-full flex justify-center items-center border-dashed border-2 border-light duration-500`}
          >
            <MdOutlineCloudUpload size={40} className={` text-light`} />
          </div>
        </div>

        <form className="flex gap-2 justify-center items-center flex-wrap">
          <input
            multiple
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            className="input-field"
            hidden
            onChange={(e) => handleSubmit([...e.target.files])}
          />
          <p
            onClick={() => {
              document.querySelector(".input-field").click();
            }}
            className=" text-light underline font-medium tracking-wider cursor-pointer"
          >
            Browse
          </p>
          <p className="text-white font-medium tracking-wider ">
            {" "}
            Drag and Image
          </p>
        </form>
      </div>
      {/* Uploader */}

      {/* Media Control */}
      <div className="w-full flex items-center justify-between mt-10">
        <p className="text-[#c5c1c1] tracking-wide">
          <Link to={"/"}>Home</Link> <span>/</span> Media <span>/</span>{" "}
          <span className=" text-primary">Uploaded Photo</span>
        </p>
      </div>
      {/* Media Control */}

      {/* Media List */}
      <MediaList
        pageCount={pageCount}
        photos={photos}
        pagination={pagination}
        handlePaginate={handlePaginate}
        handleDelete={handleDelete}
      />
      {/* MEdia List */}
    </>
  );
};

export default Media;
