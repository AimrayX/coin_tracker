import express from 'express'
import { getCoin, getCoins, addOwnedCoin } from './database.js'

const app = express()
app.use(express.json())

app.get("/coins", async (req, res) => {
    const coins = await getCoins()
    res.send(coins)
})

app.get("/coins/:id", async (req, res) => {
    try {
        const id = req.params.id
        const coins = await getCoin(id)
        res.send(coins)
    } catch (error) {
        res.status(500)
        console.log(error)
    }
})

app.post("/coins", async (req, res) => {
    try {
        const { cid, gradingCompany, grade, 
            certNum, buyPrice, userID, coinID} = req.body
        const coin = await addOwnedCoin(cid, gradingCompany, grade, certNum, buyPrice, userID, coinID)
        res.status(201).send(coin)
    } catch (error) {
        res.status(500)
        console.log(error)
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something has gone wrong\nplease try again later")
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})