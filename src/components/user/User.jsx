import { BiPlus, BiSearch } from "react-icons/bi";
import { useState } from "react";
import Banner from "../ui/banner/Banner";
import UserList from "./components/UserList";
import useUser from "../../redux/hooks/user/useUser";
import UserEntry from "./UserEntry";

const User = () => {
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });
  const [addModal, setAddModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const {
    users,
    pageCount,
    totalRecord,
    setSearch,
    handleRegisterUser,
    handleEditUserProfile,
  } = useUser({
    page: 1,
    per_page: 10,
  });

  const handlePaginate = (e, value) => {
    setPagination({ page: value, per_page: 10 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value;
    setSearch(inputValue);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setAddModal(true);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[95%] my-6 flex flex-col gap-8">
        <div className=" flex justify-start flex-col items-start md:flex-row md:justify-between gap-3">
          {/* banner  */}
          <Banner title={"User"} />
          {/* banner  */}
          <div
            onClick={() => setAddModal(true)}
            className="px-5 py-3 flex justify-center items-center gap-3 rounded-lg bg-primary text-center text-white cursor-pointer hover:opacity-80 transition-colors duration-300"
          >
            <BiPlus size={20} />
            Register User
          </div>
          <UserEntry
            addModal={addModal}
            currentUser={editUser}
            setAddModal={setAddModal}
            setEditUser={setEditUser}
            handleRegisterUser={handleRegisterUser}
            handleEditUserProfile={handleEditUserProfile}
          />
        </div>

        <div className=" flex flex-wrap justify-end gap-3">
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
        </div>
        {users?.length == 0 ? (
          <div className=" h-1/2 min-h-[300px] flex justify-center items-center">
            <h1 className=" text-primary text-lg lg:text-2xl font-bold">
              No users yet!
            </h1>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-8">
              <div>
                {/* User List*/}
                <UserList
                  users={users}
                  pageCount={pageCount}
                  pagination={pagination}
                  totalRecord={totalRecord}
                  handleEdit={handleEdit}
                  handlePaginate={handlePaginate}
                />
                {/* User List*/}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
