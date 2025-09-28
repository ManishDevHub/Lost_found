import Item from "../models/itemModel.js";

// ================== CREATE ITEM ==================
export const createItem = async (req, res) => {
  try {
    const { name, description, location, date, status } = req.body;

    if (!name || !location || !date || !status) {
      return res.status(400).json({ message: "name, location, date, status required" });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const item = await Item.create({
      name,
      description,
      location,
      date,
      status,
      imageUrl,
      user: req.user._id, // ✅ Save owner
    });

    // 👇 frontend ko "image" key hamesha mile
    res.status(201).json({
      ...item._doc,
      image: item.imageUrl,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ================== GET ALL ITEMS ==================
export const getItems = async (req, res) => {
  try {
    const { status, q } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ];
    }

    const items = await Item.find(filter)
      .sort({ createdAt: -1 }) // ✅ latest items first
      .populate("user", "name email profileImage");

    const mapped = items.map((i) => ({
      ...i._doc,
      image: i.imageUrl,
    }));

    res.json(mapped);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ================== GET ITEM BY ID ==================
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("user", "name email profileImage");
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({
      ...item._doc,
      image: item.imageUrl,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ================== DELETE ITEM ==================
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // ✅ Only owner can delete
    if (String(item.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await item.deleteOne();
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
