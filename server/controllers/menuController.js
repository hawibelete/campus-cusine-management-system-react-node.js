import * as Menu from '../models/menuModel.js';

export const create = async (req, res) => {
    try {
        const { name, price, description, availability } = req.body;
        const loungeId = req.user.loungeId;
        const added_at = new Date().toISOString().split('T')[0];
        const menuItem = await Menu.createMenuItem(loungeId, name, price, description, availability, added_at);
        res.status(201).json(menuItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const items = await Menu.getMenuItems();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getById = async (req, res) => {
    try {
        const item = await Menu.getMenuItemById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Menu item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getByLounge = async (req, res) => {
    try {
        const items = await Menu.getMenuItemsByLounge(req.params.loungeId);
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const { name, price, description, availability } = req.body;
        console.log(req.body)
        const updated = await Menu.updateMenuItem(req.params.id, name, price, description, availability);
        if (!updated) return res.status(404).json({ error: 'Menu item not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        const deleted = await Menu.deleteMenuItem(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Menu item not found' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPopularItems = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5; 
        const items = await Menu.getPopularMenuItems(limit);
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
