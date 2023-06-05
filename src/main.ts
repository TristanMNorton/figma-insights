import axiosSetup from './axiosSetup.js'
import { getStyleData } from './styleData.js'

axiosSetup()

const styleData = await getStyleData()

console.log(styleData)
