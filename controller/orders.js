const router = require("express").Router();

router.post("/orders", (req,res)=>{
    const addProducts = "INSERT INTO `orders` (`o_name`,`o_items`,`o_status`,`o_address`) VALUES (?,?,?,?)"

    const values = [
        req.body.name,
        JSON.stringify(req.body.items),
        req.body.status,
        req.body.address
    ]

    db.query(addProducts,values, (err, data)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(data)
        }
    })
})

router.get("/orders", (req,res)=>{
    const getOrders = "SELECT * FROM `orders`"
    db.query(getOrders, (err,data)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(data)
        }
    })
})

//soon