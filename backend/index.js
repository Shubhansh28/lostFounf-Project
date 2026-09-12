const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")
const apiRoutes = require("./routes/apiRoutes")
const app = express()
app.use(cors())

app.use("/api",apiRoutes)

app.listen(3000,()=>{
    console.log(`url :- \x1b[35m http://localhost:3000/api/items`);
})