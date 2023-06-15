import express from 'express'
import axiosSetup from './axiosSetup.js'
import { fetchFigmaData } from './fetchFigmaData.js'

axiosSetup()

const app = express()
const port = 3001

app.use((req, _, next) => {
    console.log(`Request made for figma document id: ${req.query.fileId}`);
    next();
});

app.get('/', async (req, res) => {
    try {
        const fileId = req.query.fileId as string
        const figmaData = await fetchFigmaData(fileId)

        global.figmaData = figmaData

        res.send(Object.fromEntries(figmaData.stylesMap))
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
