const Firm=require('../models/Firm')

const Vendor=require('../models/Vendor')

const multer = require('multer');

// ✅ Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder where images are stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage:storage });
const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(400).json({ error: "Vendor not found" });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: [vendor._id] // ✅ lowercase 'vendor' vendor: [vendor._id] // ✅ lowercase 'vendor'
// Assuming Firm has a 'Vendor' field as an array
    });
 
    const savedFirm = await firm.save();

    vendor.firm.push(savedFirm);
await vendor.save();


    return res.status(200).json({ message: "Firm added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports={addFirm:[upload.single('image'),addFirm]}