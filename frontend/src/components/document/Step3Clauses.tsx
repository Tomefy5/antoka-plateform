import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { DocumentClause, DocumentType } from '@/types/document.types'

interface Step3Props {
    clauses: DocumentClause[]
    onChange: (clauses: DocumentClause[]) => void
    documentType: DocumentType
    language: 'fr' | 'mg'
    onLanguageChange: (lang: 'fr' | 'mg') => void
}

export default function Step3Clauses({
    clauses,
    onChange,
    documentType,
    language,
    onLanguageChange
}: Step3Props) {

    const updateClause = (label: string, value: string) => {
        const existing = clauses.find(c => c.label === label)
        if (existing) {
            onChange(clauses.map(c => c.label === label ? { ...c, value } : c))
        } else {
            onChange([...clauses, { label, value }])
        }
    }

    const getClauseValue = (label: string) => {
        return clauses.find(c => c.label === label)?.value || ''
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-heading font-bold mb-2">
                    Détails spécifiques du contrat
                </h2>
                <p className="text-muted-foreground">
                    Renseignez les clauses importantes de votre document
                </p>
            </div>

            <div className="space-y-4">
                {/* Langue */}
                <div className="space-y-2">
                    <Label>Langue du document</Label>
                    <Select value={language} onValueChange={(v) => onLanguageChange(v as 'fr' | 'mg')}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="mg">Malgache</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Clauses selon le type */}
                {documentType === 'contrat_location' && (
                    <>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Durée du bail *</Label>
                                <Input
                                    placeholder="12 mois"
                                    value={getClauseValue('durée')}
                                    onChange={(e) => updateClause('durée', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Loyer mensuel (MGA) *</Label>
                                <Input
                                    type="number"
                                    placeholder="500000"
                                    value={getClauseValue('loyer')}
                                    onChange={(e) => updateClause('loyer', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Caution (nombre de mois)</Label>
                            <Input
                                type="number"
                                placeholder="2"
                                value={getClauseValue('caution')}
                                onChange={(e) => updateClause('caution', e.target.value)}
                            />
                        </div>
                    </>
                )}

                {documentType === 'contrat_travail' && (
                    <>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Type de contrat *</Label>
                                <Select
                                    value={getClauseValue('type_contrat')}
                                    onValueChange={(v) => updateClause('type_contrat', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CDI">CDI</SelectItem>
                                        <SelectItem value="CDD">CDD</SelectItem>
                                        <SelectItem value="Stage">Stage</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Salaire mensuel (MGA) *</Label>
                                <Input
                                    type="number"
                                    placeholder="800000"
                                    value={getClauseValue('salaire')}
                                    onChange={(e) => updateClause('salaire', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Poste occupé *</Label>
                            <Input
                                placeholder="Développeur Full-Stack"
                                value={getClauseValue('poste')}
                                onChange={(e) => updateClause('poste', e.target.value)}
                            />
                        </div>
                    </>
                )}

                {/* Clauses additionnelles (pour tous types) */}
                <div className="space-y-2">
                    <Label>Clauses additionnelles (optionnel)</Label>
                    <Textarea
                        placeholder="Ajoutez des clauses spécifiques ou conditions particulières..."
                        rows={4}
                        value={getClauseValue('clauses_additionnelles')}
                        onChange={(e) => updateClause('clauses_additionnelles', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
