import express from 'express'
import axiosSetup from './axiosSetup.js'
import { getStyleData } from './styleData.js'

axiosSetup()

const app = express()
const port = 3000

app.get('/', async (_, res) => {
    const styleData = await getStyleData()

    res.send(styleData)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
