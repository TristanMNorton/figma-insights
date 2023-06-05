import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

/**
 * @function axiosSetup
 * @return {void}
 * 
 * Initial axios setup for auth and base url
 */
export default function axiosSetup(): void {
    axios.defaults.baseURL = 'https://api.figma.com/v1'
    axios.defaults.headers.common['X-Figma-Token'] = process.env.FIGMA_KEY
}
