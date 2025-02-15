const express = require('express');
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
                    res.send(" client site movie check out")
})
app.listen(port,()=>{
                    console.log(`Server Site is  successfully Running.. ${port}`)
})
