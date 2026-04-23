import Item from "../models/Item.js";

// Create Item
export const createItem = async (req, res) => {
  try {
    const { name, description, variants, basePrice } = req.body;

    const item = new Item({
      name,
      description,
      variants,
      basePrice,
    });

    const savedItem = await item.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Item
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Item
export const updateItem = async (req, res) => {
  try {
    const { name, description, variants, basePrice } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        variants,
        basePrice,
      },
      { new: true } // return updated doc
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};