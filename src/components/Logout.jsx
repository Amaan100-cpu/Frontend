import { NavLink, replace } from "react-router-dom";
import Mycontext from "../Mycontext.jsx";
import { useContext } from "react";
import { toastError, toastSuccess } from "../Utils.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = ({ setOpen }) => {
  const { fetchUser } = useContext(Mycontext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_NODEJS_URL}/logout`, {
        credentials: "include",
      });
      fetchUser();
      if (!toast.isActive("logout")) {
        toastSuccess("logout successfully", { toastId: "logout" });
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }
    } catch {
      console.log("server error");
    }
  };

  return (
    <h4 onClick={() => { logout(); setOpen(false); }} className="Logout">
      Logout
    </h4>
  );
};

export default Logout;
