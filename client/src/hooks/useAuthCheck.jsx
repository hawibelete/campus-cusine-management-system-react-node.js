import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "@/utility/axios";

export const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/check", { withCredentials: true });
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);
};
