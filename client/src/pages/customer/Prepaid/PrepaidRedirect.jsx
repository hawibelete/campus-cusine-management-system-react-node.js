import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthCheck } from '@/hooks/useAuthCheck';

const PrepaidRedirect = () => {
  useAuthCheck();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const res = await fetch("/api/prepaid/check-membership", {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to check membership");
        }

        const data = await res.json();

        if (data.isMember) {
          navigate("/customer/prepaid/member");
        } else {
          navigate("/customer/prepaid/lounges");
        }
      } catch (error) {
        console.error("❌ Error checking prepaid membership:", error);
        navigate("/error"); 
      }
    };

    checkMembership();
  }, [navigate]);

  return <div>Loading your prepaid service...</div>; 
};

export default PrepaidRedirect;
