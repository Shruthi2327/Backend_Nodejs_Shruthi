//const Vendor=require('../models/Vendor');

const vendorController=require('../controllers/vendorController')
const express=require('express');

const router=express.Router();



//now create a file 
//i.e 
//vendorController lo unna 
//vendorRegister file 

router.post('/register',vendorController.vendorRegister)
router.post('/login',vendorController.vendorLogin)


router.get('/all-vendors',vendorController.getAllVendors)
router.get('/single-vendor/:id',vendorController.getVendorById)
//ippudu manam e router ni export chesthe 
//e router lo unna routes kuda 
//export aithai 
module.exports=router