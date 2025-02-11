import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./App";

const IsAuthorised = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        
        const { data } = await axiosInstance.get(`/get-authenticated?token=${token}`);

        if (!data.success) {
          navigate("/user/login");
        }else{
          localStorage.setItem("userInfo" , data.email)
        }
        
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/user/login");
      }
    };

    checkAuth();
  }, [navigate]);

  // return children; // Only render children if authorized
};

export default IsAuthorised;
