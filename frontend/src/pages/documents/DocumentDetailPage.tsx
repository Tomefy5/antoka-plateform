import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    ArrowLeft,
    Download,
    Edit,
    Share2,
    FileText,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    Copy,
    Printer
} from 'lucide-react'
import axios from 'axios'
import type { GeneratedDocument } from '@/types/document.types'

export default function DocumentDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [document, setDocument] = useState<GeneratedDocument | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [copySuccess, setCopySuccess] = useState(false)

    useEffect(() => {
        fetchDocument()
    }, [id])

    //! Vraie fonction de fetch mais commenté pour test
    // const fetchDocument = async () => {
    //     try {
    //         const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'
    //         const response = await axios.get(`${API_URL}/documents/${id}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //             }
    //         })
    //         setDocument(response.data.document)
    //     } catch (err: any) {
    //         setError('Document introuvable')
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    //! fonction fetchDocument pour test
    // src/pages/documents/DocumentDetailPage.tsx

    const fetchDocument = async () => {
        try {
            // DONNÉES DE DÉMO (commente cette section quand tu auras le backend)
            const mockDocument: GeneratedDocument = {
                id: id || 'demo-123',
                type: 'contrat_location',
                content: `CONTRAT DE LOCATION

Entre les soussignés :

Le BAILLEUR
Nom : Jean DUPONT
Adresse : 123 Rue de l'Indépendance, Antananarivo 101
Téléphone : +261 34 12 345 67

Et

Le LOCATAIRE
Nom : Marie RABE
Adresse : 456 Avenue de la République, Antananarivo 101
Téléphone : +261 33 98 765 43

Il a été convenu ce qui suit :

ARTICLE 1 - OBJET
Le bailleur loue au locataire un appartement situé au 789 Boulevard de la Paix, 
Antananarivo, d'une superficie de 80 m², comprenant :
- 2 chambres
- 1 salon
- 1 cuisine équipée
- 1 salle de bain

ARTICLE 2 - DURÉE
Le présent bail est conclu pour une durée de 12 mois, à compter du 1er janvier 2025.

ARTICLE 3 - LOYER
Le loyer mensuel est fixé à 500 000 MGA (Cinq cent mille Ariary), payable 
le 5 de chaque mois par virement bancaire.

ARTICLE 4 - DÉPÔT DE GARANTIE
Un dépôt de garantie égal à 2 mois de loyer, soit 1 000 000 MGA, est versé 
à la signature du présent contrat.

ARTICLE 5 - CHARGES
Les charges suivantes sont à la charge du locataire :
- Eau et électricité
- Entretien courant du logement

ARTICLE 6 - RÉSILIATION
Le présent contrat pourra être résilié par l'une ou l'autre des parties moyennant 
un préavis de 3 mois notifié par lettre recommandée.

ARTICLE 7 - LOI APPLICABLE
Le présent contrat est soumis au droit malgache.

Fait à Antananarivo, le 14 novembre 2025
En deux exemplaires originaux

Signature du Bailleur          Signature du Locataire
____________________          ____________________`,
                language: 'fr',
                status: 'brouillon',
                generated_in: '8.2s',
                warnings: [
                    'Vérifiez que le montant du loyer est conforme au marché local',
                    'Pensez à préciser les modalités de révision du loyer'
                ]
            }

            setDocument(mockDocument)
            setLoading(false)

            // VRAI APPEL API (décommente quand backend prêt)
            /*
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'
            const response = await axios.get(`${API_URL}/documents/${id}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            })
            setDocument(response.data.document)
            */
        } catch (err: any) {
            setError('Document introuvable')
        } finally {
            setLoading(false)
        }
    }


    const handleDownloadPDF = () => {
        // TODO: Implémenter génération PDF côté backend
        const blob = new Blob([document?.content || ''], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${document?.type}_${id}.txt`
        a.click()
    }

    const handleCopyContent = () => {
        navigator.clipboard.writeText(document?.content || '')
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
    }

    const handlePrint = () => {
        window.print()
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error || !document) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center space-y-4">
                        <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
                        <h2 className="text-xl font-semibold">Document introuvable</h2>
                        <p className="text-muted-foreground">{error}</p>
                        <Button onClick={() => navigate('/documents')}>
                            Retour aux documents
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
            <div className="container max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/documents')}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour aux documents
                    </Button>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-heading font-bold mb-2">
                                {document.type.replace('_', ' ').toUpperCase()}
                            </h1>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Généré en {document.generated_in}
                                </span>
                                <span>•</span>
                                <span>Langue: {document.language === 'fr' ? 'Français' : 'Malgache'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Badge variant={document.status === 'final' ? 'default' : 'secondary'}>
                                {document.status === 'brouillon' ? 'Brouillon' : 'Final'}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Contenu du document */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Contenu du document
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="prose prose-sm max-w-none bg-muted/30 rounded-lg p-6 whitespace-pre-wrap font-mono text-sm"
                                    style={{ maxHeight: '600px', overflowY: 'auto' }}
                                >
                                    {document.content}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Warnings si présents */}
                        {document.warnings && document.warnings.length > 0 && (
                            <Card className="mt-4 border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
                                <CardHeader>
                                    <CardTitle className="text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5" />
                                        Avertissements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        {document.warnings.map((warning, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-yellow-600 dark:text-yellow-500">•</span>
                                                <span>{warning}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions rapides</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    className="w-full justify-start"
                                    size="lg"
                                    onClick={handleDownloadPDF}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Télécharger en PDF
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={handleCopyContent}
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    {copySuccess ? 'Copié !' : 'Copier le texte'}
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={handlePrint}
                                >
                                    <Printer className="w-4 h-4 mr-2" />
                                    Imprimer
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => navigate(`/documents/${id}/edit`)}
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Éditer
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Partager
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Prochaines étapes</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Document généré</p>
                                        <p className="text-muted-foreground text-xs">
                                            Vérifié par l'IA Antoka
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 opacity-50">
                                    <div className="w-5 h-5 rounded-full border-2 mt-0.5"></div>
                                    <div>
                                        <p className="font-medium">Analyse de clauses</p>
                                        <p className="text-muted-foreground text-xs">
                                            Détecter les risques potentiels
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 opacity-50">
                                    <div className="w-5 h-5 rounded-full border-2 mt-0.5"></div>
                                    <div>
                                        <p className="font-medium">Signature numérique</p>
                                        <p className="text-muted-foreground text-xs">
                                            Sécurisation blockchain
                                        </p>
                                    </div>
                                </div>

                                <Button variant="secondary" className="w-full mt-4">
                                    Analyser les clauses
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
