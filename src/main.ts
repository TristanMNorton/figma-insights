import express from 'express'
import axiosSetup from './axiosSetup.js'
import { getStyleData } from './styleData.js'

axiosSetup()

const app = express()
const port = 3000

app.use((req, _, next) => {
    console.log(`Request made for figma document id: ${req.query.fileId}`);
    next();
});

app.get('/', async (req, res) => {
    const fileId = req.query.fileId as string
    const styleData = await getStyleData(fileId)

    res.send(styleData)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
