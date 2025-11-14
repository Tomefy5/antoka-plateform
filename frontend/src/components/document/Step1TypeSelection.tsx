import { Card, CardContent } from '@/components/ui/card'
import { FileText, Briefcase, Home, ScrollText, Store } from 'lucide-react'
import type { DocumentType } from '@/types/document.types'

interface Step1Props {
    selectedType: DocumentType | null
    onSelect: (type: DocumentType) => void
}

const documentTypes = [
    {
        type: 'contrat_location' as DocumentType,
        icon: Home,
        title: 'Contrat de location',
        description: 'Bail résidentiel ou appartement'
    },
    {
        type: 'contrat_travail' as DocumentType,
        icon: Briefcase,
        title: 'Contrat de travail',
        description: 'CDI, CDD ou stage'
    },
    {
        type: 'acte_vente' as DocumentType,
        icon: FileText,
        title: 'Acte de vente',
        description: 'Vente de bien immobilier ou mobilier'
    },
    {
        type: 'procuration' as DocumentType,
        icon: ScrollText,
        title: 'Procuration',
        description: 'Mandat de représentation'
    },
    {
        type: 'bail_commercial' as DocumentType,
        icon: Store,
        title: 'Bail commercial',
        description: 'Location de local professionnel'
    }
]

export default function Step1TypeSelection({ selectedType, onSelect }: Step1Props) {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-heading font-bold mb-2">
                    Quel type de document souhaitez-vous créer ?
                </h2>
                <p className="text-muted-foreground">
                    Sélectionnez le type de document légal adapté à votre besoin
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentTypes.map((doc) => {
                    const Icon = doc.icon
                    const isSelected = selectedType === doc.type

                    return (
                        <Card
                            key={doc.type}
                            className={`cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 ${isSelected ? 'border-2 border-primary bg-primary/5' : 'border-2 border-transparent'
                                }`}
                            onClick={() => onSelect(doc.type)}
                        >
                            <CardContent className="pt-6 pb-4 text-center space-y-3">
                                <div className={`inline-flex p-4 rounded-2xl ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-primary'
                                    }`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-semibold">{doc.title}</h3>
                                <p className="text-sm text-muted-foreground">{doc.description}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
