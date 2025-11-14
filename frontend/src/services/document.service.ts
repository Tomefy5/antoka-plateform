import axios from 'axios'
import type { DocumentGenerationRequest, GeneratedDocument } from '@/types/document.types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'

export const documentService = {
    async generateDocument(data: DocumentGenerationRequest): Promise<GeneratedDocument> {
        const response = await axios.post(`${API_URL}/docgen/generate`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        return response.data
    },

    async getTemplates() {
        const response = await axios.get(`${API_URL}/docgen/templates`)
        return response.data
    }
}
