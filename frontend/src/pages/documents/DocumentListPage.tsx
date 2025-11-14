import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import DocumentCard from '@/components/document/DocumentCard'
import {
    Plus,
    Search,
    Filter,
    Grid3x3,
    List,
    FileText,
    Loader2,
    LogOut
} from 'lucide-react'
import axios from 'axios'

interface Document {
    id: string
    type: string
    status: 'brouillon' | 'final' | 'signé'
    created_at: string
    updated_at: string
}

export default function DocumentListPage() {
    const navigate = useNavigate()
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState<string>('all')
    const [filterStatus, setFilterStatus] = useState<string>('all')

    useEffect(() => {
        fetchDocuments()
    }, [])

    const fetchDocuments = async () => {
        try {
            // MODE DÉMO avec données mockées
            const mockDocuments: Document[] = [
                {
                    id: 'doc-001',
                    type: 'contrat_location',
                    status: 'brouillon',
                    created_at: '2025-11-10T10:00:00Z',
                    updated_at: '2025-11-10T10:00:00Z'
                },
                {
                    id: 'doc-002',
                    type: 'contrat_travail',
                    status: 'final',
                    created_at: '2025-11-08T14:30:00Z',
                    updated_at: '2025-11-09T09:00:00Z'
                },
                {
                    id: 'doc-003',
                    type: 'acte_vente',
                    status: 'signé',
                    created_at: '2025-11-05T16:45:00Z',
                    updated_at: '2025-11-06T11:20:00Z'
                },
                {
                    id: 'doc-004',
                    type: 'procuration',
                    status: 'brouillon',
                    created_at: '2025-11-12T08:15:00Z',
                    updated_at: '2025-11-12T08:15:00Z'
                },
                {
                    id: 'doc-005',
                    type: 'bail_commercial',
                    status: 'final',
                    created_at: '2025-11-01T12:00:00Z',
                    updated_at: '2025-11-02T15:30:00Z'
                }
            ]

            setTimeout(() => {
                setDocuments(mockDocuments)
                setLoading(false)
            }, 500)

            // VRAI APPEL API (décommente quand backend prêt)
            /*
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'
            const response = await axios.get(`${API_URL}/documents`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            })
            setDocuments(response.data.documents)
            setLoading(false)
            */
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    const handleDelete = (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
            setDocuments(documents.filter(doc => doc.id !== id))
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    // Filtrage
    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.type.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = filterType === 'all' || doc.type === filterType
        const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
        return matchesSearch && matchesType && matchesStatus
    })

    // Stats
    const stats = {
        total: documents.length,
        brouillon: documents.filter(d => d.status === 'brouillon').length,
        final: documents.filter(d => d.status === 'final').length,
        signé: documents.filter(d => d.status === 'signé').length
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/">
                                <img src="/antoka-logo.jpg" alt="Antoka" className="w-12 h-12 object-contain" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-heading font-bold">Mes Documents</h1>
                                <p className="text-sm text-muted-foreground">{stats.total} documents</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button onClick={() => navigate('/documents/create')}>
                                <Plus className="w-4 h-4 mr-2" />
                                Nouveau document
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleLogout}>
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-card rounded-lg p-4 border">
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border">
                        <p className="text-sm text-muted-foreground mb-1">Brouillons</p>
                        <p className="text-2xl font-bold text-gray-500">{stats.brouillon}</p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border">
                        <p className="text-sm text-muted-foreground mb-1">Finalisés</p>
                        <p className="text-2xl font-bold text-blue-500">{stats.final}</p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border">
                        <p className="text-sm text-muted-foreground mb-1">Signés</p>
                        <p className="text-2xl font-bold text-green-500">{stats.signé}</p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher un document..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter Type */}
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-full md:w-48">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="contrat_location">Contrat location</SelectItem>
                            <SelectItem value="contrat_travail">Contrat travail</SelectItem>
                            <SelectItem value="acte_vente">Acte de vente</SelectItem>
                            <SelectItem value="procuration">Procuration</SelectItem>
                            <SelectItem value="bail_commercial">Bail commercial</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Filter Status */}
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full md:w-40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous statuts</SelectItem>
                            <SelectItem value="brouillon">Brouillon</SelectItem>
                            <SelectItem value="final">Final</SelectItem>
                            <SelectItem value="signé">Signé</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* View Toggle */}
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid3x3 className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => setViewMode('list')}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Documents Grid */}
                {filteredDocuments.length > 0 ? (
                    <div className={
                        viewMode === 'grid'
                            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                            : 'space-y-4'
                    }>
                        {filteredDocuments.map(doc => (
                            <DocumentCard
                                key={doc.id}
                                id={doc.id}
                                type={doc.type}
                                status={doc.status}
                                createdAt={doc.created_at}
                                updatedAt={doc.updated_at}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="text-center py-16">
                        <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Aucun document trouvé</h3>
                        <p className="text-muted-foreground mb-6">
                            {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                                ? 'Essayez de modifier vos filtres'
                                : 'Commencez par créer votre premier document'}
                        </p>
                        <Button onClick={() => navigate('/documents/create')}>
                            <Plus className="w-4 h-4 mr-2" />
                            Créer un document
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
