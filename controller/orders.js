const {db} = require("../database/mysql")

const addOrder = (req,res)=>{
    const addOrders = "INSERT INTO `orders` (`o_userid`, `o_name`,`o_email`, `o_price`, `o_bill`, `o_items`,`o_status`,`o_address`, `o_date`) VALUES (?,?,?,?,?,?,?,?,?)"

    const values = [
        req.body.userID,
        req.body.name,
        req.body.email,
        req.body.price,
        req.file.filename,
        req.body.items,
        req.body.status,
        req.body.address,
        req.body.date
    ]
    
    db.query(addOrders, values, (err, data)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(data)
        }
    })
}

const getOrders = (req,res)=>{
    const getOrders = "SELECT * FROM `orders`"
    db.query(getOrders, (err,data)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(data)
        }
    })
}

const getSingleOrder = (req, res)=>{
    const {id} = req.params;
    const getSingleOrder = "SELECT * FROM `orders` WHERE `o_id`=?"
    db.query(getSingleOrder, [id], (err,data)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(data)
        }
    })
}

const deleteOrder = (req,res)=>{
    const {id} = req.params;
    const getSingleOrder = "DELETE FROM `orders` WHERE `o_id`=?"
    db.query(getSingleOrder, [id], (err,data)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(data)
        }
    })
}

const updateStatus = (req, res)=>{
    const {id} = req.params;
    const updateStatus = "UPDATE `orders` SET `o_status`=? WHERE `o_id`=?"

    const values = [
        req.body.status,
        id
    ]
    db.query(updateStatus, values, (err,data)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.status(200).json(data)
        }
    })
}

module.exports = {addOrder, getOrders, getSingleOrder, updateStatus, deleteOrder}
