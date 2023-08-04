const express = require('express')
require('dotenv').config()
const openairouter = express.Router()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

openairouter.post("/get", async (req, res) => {
    try {
        const { userrequest } = req.body
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.api_key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Create shayari on ${userrequest}` }],
                max_tokens: 50,
            }),

        })
        let data=await response.json()
        let result=data.choices[0].message.content
        return res.status(200).send({data:result})  
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})

module.exports=openairouter