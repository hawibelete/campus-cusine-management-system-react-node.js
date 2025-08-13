import db from "../config/db.js";

export const getPrepaidServices = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM prepaid_services");
        return rows;
    } catch (error) {
        console.error("Error getting prepaid services:", error);
        throw error;
    }
};

export const getPrepaidServicesByLounge = async (loungeId) => {
    try {
        const [rows] = await db.query("SELECT * FROM prepaid_services WHERE lounge_id = ?", [loungeId]);
        return rows;
    } catch (error) {
        console.error(`Error getting prepaid services for lounge ID ${loungeId}:`, error);
        throw error;
    }
};

export const updatePrepaidService = async (loungeId, discount, minTopUp, info) => {
    try {
        const [result] = await db.query(
            `UPDATE prepaid_service_info
             SET discount_percentage = ?, minimum_top_up = ?, additional_info = ?
             WHERE lounge_id = ?`,
            [discount, minTopUp, info, loungeId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Error updating prepaid service for lounge ID ${loungeId}:`, error);
        throw error;
    }
};

export const getPrepaidServiceInfo = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM prepaid_service_info");
        return rows;
    } catch (error) {
        console.error("Error getting prepaid service info:", error);
        throw error;
    }
};

export const getPrepaidServiceInfoByLounge = async (loungeId) => {
    try {
        const [rows] = await db.query("SELECT * FROM prepaid_service_info WHERE lounge_id = ?", [loungeId]);
        return rows;
    } catch (error) {
        console.error(`Error getting prepaid service info for lounge ID ${loungeId}:`, error);
        throw error;
    }
};

export const updatePrepaidServiceInfo = async (loungeId, discount, minTopUp, info) => {
    try {
        const [result] = await db.query(
            `UPDATE prepaid_service_info
             SET discount_percentage = ?, minimum_top_up = ?, additional_info = ?
             WHERE lounge_id = ?`,
            [discount, minTopUp, info, loungeId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Error updating prepaid service info for lounge ID ${loungeId}:`, error);
        throw error;
    }
};
