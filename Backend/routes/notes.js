const express = require('express')
const router = express.Router();

router.get('/', (req,res)=>{
    onj={
        a:"thiouis",
        number:34
    }
    res.json(onj)
} )
module.exports = router ;