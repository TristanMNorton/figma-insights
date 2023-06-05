import axios from 'axios'
import { StyleData, Style, Node, isTextNode } from './types.js'

const masterObject: StyleData = {
    fontSizes: [],
    colorHexValues: [],
}

interface NodeResponse {
    [key: string]: {
        document: Node
    }
}

/**
 * @function fetchStyleObjects
 * @return {Style[]} Array of style objects from Figma API
 * 
 * https://www.figma.com/developers/api#get-file-styles-endpoint
 */
async function fetchStyleObjects(): Promise<Style[]> {
    const res = await axios.get('/files/P634r4yMoJO3seiYMYvS6G/styles')
    
    const styles: Style[] = res.data.meta.styles
    
    return styles
}

export async function getStyleData(): Promise<StyleData> {
    const styles: Style[] = await fetchStyleObjects()
    
    const nodeIDs = styles.map(style => style.node_id).join(',')
    
    const allRes = await axios.get(`/files/P634r4yMoJO3seiYMYvS6G/nodes?ids=${nodeIDs}`)
    
    const nodes: NodeResponse = allRes.data.nodes
    
    Object.keys(nodes).forEach(key => {
        const nodeObject = nodes[key].document
    
        if (isTextNode(nodeObject)) {
            const remSize = nodeObject.style.fontSize / 16
            masterObject.fontSizes.push(`${remSize}rem`)
        }
    })
    
    return masterObject
    // masterArray.forEach(node => {
    //     if ('style' in node && 'fontSize' in node.style) {
    //         masterObject.fontSizes.push(node.style.fontSize)
    //     }
    
    //     if ('fills' in node) {
    //         masterObject.colorHexValues.push(node.fills[0].color)
    //     }
    // })
    
    // masterObject.fontSizes = [...new Set(masterObject.fontSizes)]
    // masterObject.fontSizes = masterObject.fontSizes.map(fontSize => `${fontSize / 16}rem`)
    
    // masterObject.colorHexValues = masterObject.colorHexValues.map(color => ({
    //     r: Math.round(color.r * 255),
    //     g: Math.round(color.g * 255),
    //     b: Math.round(color.b * 255),
    // }))
    // .map(color => `#${rgbHex(color.r, color.g, color.b)}`)
    
    // masterObject.colorHexValues = [...new Set(masterObject.colorHexValues)]
    
    // fs.writeFileSync('./styles.json', JSON.stringify(masterObject, null, 2))
}