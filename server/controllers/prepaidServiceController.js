import {
    getPrepaidServices,
    getPrepaidServicesByLounge,
    getPrepaidServiceInfo,
    getPrepaidServiceInfoByLounge,
    updatePrepaidServiceInfo
} from "../models/prepaidServiceModel.js";

  export const fetchPrepaidServices = async (req, res) => {
    try {
      const users = req.user.role === "lounge_staff"
        ? await getPrepaidServicesByLounge(req.user.loungeId)
        : await getPrepaidServices();
  
      const loungeInfo = req.user.role === "lounge_staff"
        ? await getPrepaidServiceInfoByLounge(req.user.loungeId)
        : await getPrepaidServiceInfo();
  
      res.status(200).json({ users, loungeInfo }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const updatePrepaidServiceInfoForLounge = async (req, res) => {
    const { loungeId } = req.params;
    const { discountPercentage, minimumTopUp, additionalInfo } = req.body;

    if (req.user.loungeId !== parseInt(loungeId)) {
        console.log("req.user.loungeId");
        console.log(req.user.loungeId);
        console.log("loungeId")
        console.log(loungeId)
        return res.status(403).json({
            message: "Access denied. You can only update your own lounge's service info."
        });
    }

    try {
        const updated = await updatePrepaidServiceInfo(
            loungeId,
            discountPercentage,
            minimumTopUp,
            additionalInfo
        );

        if (!updated) {
            return res.status(404).json({ message: "Lounge not found or update failed." });
        }

        res.status(200).json({ message: "Prepaid service info updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
