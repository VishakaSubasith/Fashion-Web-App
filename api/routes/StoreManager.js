const router = require('express').Router();
const  StoreManager = require('../models/StoreManager');

router.route('/:id').get((req,res)=>{
    StoreManager.find()
        .then(StoreManagers => res.json(StoreManagers))
        .catch(err=>res.status(400).json("Error:"+err))
});
router.route('/addStoreManager').post((req,res)=>{
    const smId = req.body.smId;
    const UserName = req.body.UserName;
    const  Email = req.body.Email;
    const  Password = req.body.Password;
    const  RePassword = req.body.RePassword;
    const  Admin = req.body.Admin;

    const  newStoreManager = new StoreManager({
        smId,
        UserName,
        Email,
        Password,
        RePassword,
        Admin
    });

    newStoreManager.save()
        .then(()=>res.json('StoreManager Added!'))
        .catch(err=>res.status(400).json("Error:"+err));

});

module.exports = router;