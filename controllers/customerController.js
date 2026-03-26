import Customer from "../models/Customer.js";

// Add Customer
export const addCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body;

    // Validation Regex
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: "Invalid name. Use only letters and spaces (2-50 chars)." });
    }

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number. Must be exactly 10 digits." });
    }

    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^\d{10}$/;

    if (name && !nameRegex.test(name)) {
      return res.status(400).json({ message: "Invalid name. Use only letters and spaces (2-50 chars)." });
    }

    if (phone && !phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number. Must be exactly 10 digits." });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};