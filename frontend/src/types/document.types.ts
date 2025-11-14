export type DocumentType =
    | 'contrat_location'
    | 'contrat_travail'
    | 'acte_vente'
    | 'procuration'
    | 'bail_commercial'

export interface Party {
    role: string
    nom: string
    prenom?: string
    adresse: string
    telephone?: string
    email?: string
}

export interface DocumentClause {
    label: string
    value: string
}

export interface DocumentGenerationRequest {
    type: DocumentType
    lang: 'fr' | 'mg'
    parties: Party[]
    clauses: DocumentClause[]
    niveau_detail?: 'basique' | 'standard' | 'détaillé'
}

export interface GeneratedDocument {
    id: string
    type: DocumentType
    content: string
    language: 'fr' | 'mg'
    status: 'brouillon' | 'final'
    generated_in: string
    warnings?: string[]
}
