import axios from 'axios'
import rgbHex from 'rgb-hex'
import { StyleData, FileNode, Style, Node, isTextNode, isNodeWithPadding } from './types.js'

const masterObject: StyleData = {
    fontSizes: [],
    colorHexValues: [],
    spacingSizes: [],
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
export async function fetchStyleObjects(fileId: string): Promise<Style[]> {
    const res = await axios.get(`/files/${fileId}/styles`)
    
    const styles: Style[] = res.data.meta.styles
    
    return styles
}

/**
 * @function getStyleData
 * @return {Promise<StyleData>} style data
 * 
 * Formatted style data from Figma API, consolidated and formatted for use in CSS
 */
export async function getStyleData(fileId: string): Promise<StyleData> {
    const styles: Style[] = await fetchStyleObjects(fileId)
    
    const nodeIDs = styles.map(style => style.node_id).join(',')
    
    const allRes = await axios.get(`/files/${fileId}/nodes?ids=${nodeIDs}`)
    
    const nodes: NodeResponse = allRes.data.nodes
    
    Object.keys(nodes).forEach(key => {
        const nodeObject = nodes[key].document
        
        // Font Sizes
        if (isTextNode(nodeObject)) {
            const remSize = nodeObject.style.fontSize / 16
            masterObject.fontSizes.push(`${remSize}rem`)
        }

        // Color Hex Values
        if ('fills' in nodeObject) {
            const color = nodeObject.fills[0].color
            const hexValue = `#${rgbHex(color.r * 255, color.g * 255, color.b * 255)}`
            masterObject.colorHexValues.push(hexValue)
        }
    })

    Object.keys(masterObject).forEach(key => {
        masterObject[key] = [...new Set(masterObject[key])]
    })
    
    return masterObject
}