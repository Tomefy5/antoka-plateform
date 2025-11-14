import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, User } from 'lucide-react'
import type { Party } from '@/types/document.types'

interface Step2Props {
    parties: Party[]
    onChange: (parties: Party[]) => void
    documentType: string
}

export default function Step2Parties({ parties, onChange, documentType }: Step2Props) {
    const addParty = () => {
        onChange([...parties, { role: '', nom: '', adresse: '' }])
    }

    const removeParty = (index: number) => {
        onChange(parties.filter((_, i) => i !== index))
    }

    const updateParty = (index: number, field: keyof Party, value: string) => {
        const updated = [...parties]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    // Rôles suggérés selon le type de document
    const getRoleSuggestions = () => {
        if (documentType === 'contrat_location') return ['Bailleur', 'Locataire']
        if (documentType === 'contrat_travail') return ['Employeur', 'Employé']
        if (documentType === 'acte_vente') return ['Vendeur', 'Acheteur']
        return ['Partie 1', 'Partie 2']
    }

    const roleSuggestions = getRoleSuggestions()

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-heading font-bold mb-2">
                    Qui sont les parties concernées ?
                </h2>
                <p className="text-muted-foreground">
                    Renseignez les informations de toutes les personnes impliquées
                </p>
            </div>

            <div className="space-y-4">
                {parties.map((party, index) => (
                    <Card key={index} className="relative">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Partie {index + 1}
                                {parties.length > 2 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-auto text-destructive hover:text-destructive"
                                        onClick={() => removeParty(index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Rôle */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Rôle *</Label>
                                    <Input
                                        placeholder={roleSuggestions[index] || 'Ex: Vendeur'}
                                        value={party.role}
                                        onChange={(e) => updateParty(index, 'role', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Nom */}
                                <div className="space-y-2">
                                    <Label>Nom complet *</Label>
                                    <Input
                                        placeholder="Jean Dupont"
                                        value={party.nom}
                                        onChange={(e) => updateParty(index, 'nom', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Adresse */}
                            <div className="space-y-2">
                                <Label>Adresse complète *</Label>
                                <Input
                                    placeholder="123 Rue de l'Indépendance, Antananarivo"
                                    value={party.adresse}
                                    onChange={(e) => updateParty(index, 'adresse', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Téléphone & Email (optionnel) */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Téléphone (optionnel)</Label>
                                    <Input
                                        type="tel"
                                        placeholder="+261 34 12 345 67"
                                        value={party.telephone || ''}
                                        onChange={(e) => updateParty(index, 'telephone', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email (optionnel)</Label>
                                    <Input
                                        type="email"
                                        placeholder="email@exemple.com"
                                        value={party.email || ''}
                                        onChange={(e) => updateParty(index, 'email', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Bouton ajouter partie */}
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={addParty}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une partie
                </Button>
            </div>
        </div>
    )
}
