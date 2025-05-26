const Vendor=require('../models/Vendor')
const jwt=require('jsonwebtoken');

const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv');

dotEnv.config();

const secretKey=process.env.whatIsYourName


//now next vendor ka registeration process

const vendorRegister=async(req,res)=>
{
    const {username,email,password}=req.body

    try{
        //checking here that already this email present or not ani
        const vendorEmail=await Vendor.findOne({email});

        if(vendorEmail)
        {
            return res.status(400).json("email already exist re fellow!")
        }

        const hashedPassword=await bcrypt.hash(password,10)


        //so now passowrd craeation also done successfully 
        //now e req.body nundi vache instance nundi 
        //manam vendor ki oka newinstance create chesi 
        //db lo ki add cheyali 
        const newVendor=new Vendor({
            username,
            email,
            password:hashedPassword
        });

        await newVendor.save();

        res.status(201).json({message:"vendor registred successfully re"})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({error:"Internak server error!"})
    }
}

const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if vendor exists
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(401).json({ error: 'Vendor not found' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { vendorId: vendor._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const getAllVendors=async(req,res)=>{
  try{
    const vendors=await Vendor.find().populate('firm');
    res.json({vendors})
  }
  catch(error)
  {
      console.error(error);
      res.status(500).json({error:"Internal server error !"})
  }
}

const getVendorById=async(req,res)=>{
  const vendorId=req.params.id

  try{
    const vendor=await Vendor.findById(vendorId).populate('firm');

    if(!vendor)
    {
      return res.status(404).json({error:"Vendor not found"})
    }

    res.status(200).json({vendor})
  }
  catch(error)
  {
      console.error(error);
      res.status(500).json({error:"Internal server error !"})
  }
}
module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}