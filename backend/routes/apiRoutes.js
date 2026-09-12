const express = require('express');
const fs = require("fs")
const path = require("path")
const validateCreate = require("../middlewares/validateCreate")
const router = express.Router();
const filePath = path.join(__dirname,"..","./databases","data.json")
const rawdata = fs.readFileSync(filePath,"utf-8")
let data = JSON.parse(rawdata)
// async function getUserData() {
//   try {
//     const rawdata = await readFile(filePath,'utf8');
//     const data = JSON.parse(rawdata)
//   } catch (error) {
//     console.error('An error occurred while reading the file:', error.message)
//   }
// }


//saare get req
router.get("/items",(req,res)=>{
    const {type,status,place} = req.query
    let filteredData = [...data]
    if (type) {
        filteredData = filteredData.filter(el => el.type===type)
    }
    if (status) {
        filteredData = filteredData.filter(el => el.status===status)
    }
    if (place) {
        filteredData = filteredData.filter(el => {
           return el.place.toLowerCase().includes(place.toLowerCase())
        })
    }
    res.json(filteredData)
})
router.get("/items/:id",(req,res)=>{
    let id = Number(req.params.id)
    let findedId = data.find(el => el.id===id)
    if (findedId === undefined){
        return res.status(400).json({"error": "Not found"})
    }
    res.status(200).json(findedId)
})

//saare post req
router.post("/items",validateCreate,(req,res)=>{
    req.body.id = Date.now()
    req.body.status = "open"
    data.push(req.body)
    fs.writeFileSync(filePath,JSON.stringify(data, null, 2))
    res.status(200).send(req.body)
})

//saare put req
router.put("/items",(req,res)=>{

})

//saare patch req
router.patch("/items/:id/claim",(req,res)=>{

})

//saare delete req
router.delete("/items/:id",(req,res)=>{

})
module.exports = router;