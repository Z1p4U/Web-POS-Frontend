import useUser from "../../redux/hooks/user/useUser";
import { Person, VerifiedUser } from "@mui/icons-material";
import { useState } from "react";

const UserProfile = () => {
  const [show, setShow] = useState("Personal");

  const { profile } = useUser({
    noPagination: true,
  });

  return (
    <div>
      {/* pp top start  */}
      <div className=" bg-light border-b border-[#878787]">
        <div className="pb-10 pt-7 mt-[73px] flex items-center relative">
          <div className=" absolute top-[-70px] left-[33px] ">
            <div className=" w-[150px] aspect-square rounded-full flex justify-center items-center bg-primary">
              <VerifiedUser className="text-light text-8xl" />
            </div>
          </div>

          <div className=" flex justify-between w-full gap-3">
            <div className=" ml-[213px]">
              <h1 className=" text-xl text-secondary capitalize font-bold tracking-wider mb-1">
                {profile?.name}
              </h1>
            </div>
          </div>
        </div>

        {/* profile navLink  */}
        <div className=" flex items-center gap-10 ml-8 pb-5">
          <div
            onClick={() => setShow("Personal")}
            className={` ${show == "Personal" ? "text-primary" : "text-secondary"} cursor-pointer flex items-center gap-2`}
          >
            <span className=" text-[19px]">
              <Person />
            </span>
            <span className=" font-semibold">Personal</span>
          </div>

          <div
            onClick={() => setShow("Login Information")}
            className={` ${show == "Login Information" ? "text-primary" : "text-secondary"} cursor-pointer flex items-center gap-2`}
          >
            <span className=" text-[19px]">
              <VerifiedUser />
            </span>
            <span className=" font-semibold">Login Information</span>
          </div>
        </div>
      </div>
      {/* pp top end  */}

      {/* pp bottom start  */}
      <div className=" bg-primary">
        {/* Personal  */}
        <div
          className={` ${show == "Personal" || show == null ? "block" : "hidden"} pl-10 max-[430px]:pl-8 pt-6 pb-9 flex flex-col gap-3`}
        >
          <div className=" flex items-center gap-14 max-[430px]:gap-0 text-[17px] tracking-wider">
            <p className=" text-[#878787] w-[150px] font-semibold">Phone</p>
            <p className=" text-[#fff]">
              {profile?.phone ? profile?.phone : ""}
            </p>
          </div>

          <div className=" flex items-center gap-14 max-[430px]:gap-0 text-[17px] tracking-wider">
            <p className=" text-[#878787] w-[150px] font-semibold">Email</p>
            <p className=" text-[#fff]">
              {profile?.email ? profile?.email : ""}
            </p>
          </div>
          <div className=" flex items-center gap-14 max-[430px]:gap-0 text-[17px] tracking-wider">
            <p className=" text-[#878787] w-[150px] font-semibold">Position</p>
            <p className=" text-[#fff]">{profile?.role}</p>
          </div>
        </div>

        <div
          className={` ${show == "Login Information" ? "block" : "hidden"} pl-10 pt-6 pb-9 flex flex-col gap-5`}
        >
          password
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
