import axios from 'axios'
import { File, FileNode, Node, Style } from './types.js'

interface NodeResponse {
    [key: string]: {
        document: Node
    }
}

/**
 * @function getNodeData
 * @param  {string} fileId: string
 * @return {Map<string, Node>} Map of node IDs to node objects
 */
export async function fetchNodeData(fileId: string): Promise<Map<string, Node>> {
    const nodesMap: Map<string, Node> = new Map()

    const fileRes = await axios.get(`/files/${fileId}`)
    const file = fileRes.data as File
    const fileNodes: Map<string, FileNode> = new Map(Object.entries(file.components))

    const nodeIDs = [...fileNodes.keys()].join(',')
    const nodeRes = await axios.get(`/files/${fileId}/nodes?ids=${nodeIDs}`)
    const responseNodes: NodeResponse = nodeRes.data.nodes

    Object.entries(responseNodes).forEach(([key, value]) => {
        nodesMap.set(key, value.document)
    })

    return nodesMap
}

/**
 * @function fetchStyleObjects
 * @return {Style[]} Array of style objects from Figma API
 * 
 * https://www.figma.com/developers/api#get-file-styles-endpoint
 */
export async function fetchStyleData(fileId: string): Promise<Map<string, Style>> {
    const res = await axios.get(`/files/${fileId}/styles`)
    const styles: Style[] = res.data.meta.styles
    
    const stylesMap: Map<string, Style> = new Map(styles.map(style => [style.node_id, style] as [string, Style]))
    
    return stylesMap
}

/**
 * @function fetchFigmaData
 * @param  {string} fileId: string
 * @return {{nodesMap: Map<string, Node>, stylesMap: Map<string, Style>}} Object of node and style maps
 */
export async function fetchFigmaData(fileId: string): Promise<{ 
    nodesMap: Map<string, Node>
    stylesMap: Map<string, Style>
}> {
    const [nodesMap, stylesMap] = await Promise.all([fetchNodeData(fileId), fetchStyleData(fileId)])

    return { nodesMap, stylesMap }
}