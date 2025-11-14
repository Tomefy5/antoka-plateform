import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import EditorToolbar from '@/components/editor/EditorToolbar'
import {
    ArrowLeft,
    Users,
    Clock,
    MessageSquare,
    History,
    Eye,
    CheckCircle2,
    Loader2,
    WifiOff
} from 'lucide-react'
import axios from 'axios'

export default function DocumentEditPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [content, setContent] = useState('')
    const [originalContent, setOriginalContent] = useState('')
    const [title, setTitle] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [loading, setLoading] = useState(true)

    // Collaborative editing indicators (mock)
    const [activeUsers] = useState([
        { name: 'Marie Rabe', color: '#10B981' },
        { name: 'Paul Andria', color: '#3B82F6' }
    ])

    useEffect(() => {
        fetchDocument()

        // Auto-save every 30s
        const autoSaveInterval = setInterval(() => {
            if (hasUnsavedChanges) {
                handleSave()
            }
        }, 30000)

        return () => clearInterval(autoSaveInterval)
    }, [hasUnsavedChanges])

    const fetchDocument = async () => {
        try {
            // MOCK DATA
            const mockDocument = {
                id: id || 'doc-001',
                type: 'Contrat de location',
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
à la signature du présent contrat.`,
                status: 'brouillon'
            }

            setTitle(mockDocument.type)
            setContent(mockDocument.content)
            setOriginalContent(mockDocument.content)
            setLoading(false)

            // REAL API (uncomment when ready)
            /*
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'
            const response = await axios.get(`${API_URL}/documents/${id}`, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
            })
            setTitle(response.data.document.type)
            setContent(response.data.document.content)
            setOriginalContent(response.data.document.content)
            setLoading(false)
            */
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    const handleContentChange = (newContent: string) => {
        setContent(newContent)
        setHasUnsavedChanges(newContent !== originalContent)
    }

    const handleSave = async () => {
        if (!hasUnsavedChanges) return

        setIsSaving(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800))

            // REAL API (uncomment when ready)
            /*
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'
            await axios.put(`${API_URL}/documents/${id}`, 
              { content },
              { headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}
            )
            */

            setOriginalContent(content)
            setHasUnsavedChanges(false)
            setLastSaved(new Date())
        } catch (err) {
            console.error('Save error:', err)
        } finally {
            setIsSaving(false)
        }
    }

    const handlePreview = () => {
        navigate(`/documents/${id}`)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header */}
            <header className="border-b bg-background sticky top-0 z-50 shadow-sm">
                <div className="container max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* Left */}
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                                <ArrowLeft className="w-5 h-5" />
                            </Button>

                            <div className="hidden md:block">
                                <h1 className="font-semibold">{title}</h1>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    {lastSaved ? (
                                        <>
                                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                                            <span>Enregistré à {lastSaved.toLocaleTimeString('fr-FR')}</span>
                                        </>
                                    ) : hasUnsavedChanges ? (
                                        <>
                                            <Clock className="w-3 h-3" />
                                            <span>Modifications non enregistrées</span>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Center - Active users */}
                        <div className="hidden lg:flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <div className="flex -space-x-2">
                                {activeUsers.map((user, idx) => (
                                    <Avatar key={idx} className="w-8 h-8 border-2 border-background">
                                        <AvatarFallback style={{ backgroundColor: user.color }}>
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {activeUsers.length} en ligne
                            </span>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handlePreview}>
                                <Eye className="w-4 h-4 mr-2" />
                                Aperçu
                            </Button>
                            <Button size="sm" onClick={handleSave} disabled={!hasUnsavedChanges || isSaving}>
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Enregistrement...
                                    </>
                                ) : (
                                    'Enregistrer'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Toolbar */}
            <EditorToolbar onSave={handleSave} isSaving={isSaving} />

            {/* Main Editor */}
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-auto">
                    <div className="container max-w-4xl mx-auto p-8">
                        <Card className="shadow-lg">
                            <CardContent className="p-0">
                                <Textarea
                                    value={content}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                    className="min-h-[800px] border-0 rounded-none font-mono text-sm leading-relaxed resize-none focus-visible:ring-0"
                                    placeholder="Commencez à taper votre document..."
                                    spellCheck
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Sidebar - Comments & History */}
                <aside className="hidden xl:block w-80 border-l bg-muted/20 overflow-auto">
                    <div className="p-4 space-y-4">
                        {/* Comments */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Commentaires (0)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    Aucun commentaire pour le moment
                                </p>
                            </CardContent>
                        </Card>

                        {/* Version History */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <History className="w-4 h-4" />
                                    Historique
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <Badge variant="outline" className="text-xs">v1.2</Badge>
                                        <div className="flex-1">
                                            <p className="font-medium">Version actuelle</p>
                                            <p className="text-xs text-muted-foreground">Il y a 5 min</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Badge variant="secondary" className="text-xs">v1.1</Badge>
                                        <div className="flex-1">
                                            <p className="font-medium">Ajout Article 4</p>
                                            <p className="text-xs text-muted-foreground">Il y a 2h</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Badge variant="secondary" className="text-xs">v1.0</Badge>
                                        <div className="flex-1">
                                            <p className="font-medium">Création</p>
                                            <p className="text-xs text-muted-foreground">Hier</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips */}
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="pt-4">
                                <p className="text-xs text-muted-foreground">
                                    💡 <strong>Astuce:</strong> Utilisez Ctrl+S pour enregistrer rapidement
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </aside>
            </div>

            {/* Status bar */}
            <footer className="border-t bg-muted/30 px-4 py-2">
                <div className="container max-w-7xl mx-auto flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <span>{content.length} caractères</span>
                        <span>•</span>
                        <span>{content.split(/\s+/).filter(Boolean).length} mots</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {hasUnsavedChanges && (
                            <Badge variant="outline" className="text-xs">
                                Non enregistré
                            </Badge>
                        )}
                        <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Connecté
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
