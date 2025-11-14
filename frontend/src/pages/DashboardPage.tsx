import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import QuickActionCard from '@/components/dashboard/QuickActionCard'
import {
    FileText,
    Search,
    PenTool,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertTriangle,
    BarChart3,
    Settings,
    LogOut,
    Plus,
    Eye,
    Download
} from 'lucide-react'

export default function DashboardPage() {
    const navigate = useNavigate()
    const [userName] = useState('Jean Dupont') // Mock user
    const [userEmail] = useState('jean.dupont@email.com')

    // Mock data
    const stats = {
        totalDocuments: 12,
        documentsMonth: 5,
        analyses: 8,
        signatures: 3
    }

    const recentDocuments = [
        {
            id: 'doc-001',
            type: 'Contrat de location',
            status: 'brouillon',
            date: '2025-11-13',
            progress: 75
        },
        {
            id: 'doc-002',
            type: 'Contrat de travail',
            status: 'final',
            date: '2025-11-12',
            progress: 100
        },
        {
            id: 'doc-003',
            type: 'Acte de vente',
            status: 'signé',
            date: '2025-11-10',
            progress: 100
        }
    ]

    const activities = [
        {
            type: 'created',
            document: 'Contrat de location',
            time: 'Il y a 2 heures',
            icon: FileText
        },
        {
            type: 'analyzed',
            document: 'Contrat de travail',
            time: 'Il y a 5 heures',
            icon: Search
        },
        {
            type: 'signed',
            document: 'Acte de vente',
            time: 'Hier à 14:30',
            icon: PenTool
        }
    ]

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/">
                                <img src="/favicon/favicon.svg" alt="Antoka" className="w-12 h-12 object-contain" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-heading font-bold">Tableau de bord</h1>
                                <p className="text-sm text-muted-foreground">Bienvenue, {userName}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button onClick={() => navigate('/documents/create')}>
                                <Plus className="w-4 h-4 mr-2" />
                                Nouveau
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {userName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleLogout}>
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container max-w-7xl mx-auto px-4 py-8">

                {/* Welcome Banner */}
                <Card className="mb-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-heading font-bold mb-2">
                                    Bonjour {userName.split(' ')[0]} ! 👋
                                </h2>
                                <p className="text-primary-foreground/90">
                                    Vous avez {stats.documentsMonth} documents créés ce mois-ci. Continuez comme ça !
                                </p>
                            </div>
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={() => navigate('/documents/create')}
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Créer un document
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Documents
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">{stats.totalDocuments}</div>
                                <FileText className="w-8 h-8 text-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                +{stats.documentsMonth} ce mois
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Analyses IA
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">{stats.analyses}</div>
                                <Search className="w-8 h-8 text-secondary" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Clauses vérifiées
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Signatures
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">{stats.signatures}</div>
                                <PenTool className="w-8 h-8 text-green-500" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Certifiées blockchain
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Progression
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">+24%</div>
                                <TrendingUp className="w-8 h-8 text-blue-500" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                vs mois dernier
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Left Column - 2/3 */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Quick Actions */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <QuickActionCard
                                    icon={FileText}
                                    title="Créer un document"
                                    description="Générez un contrat en quelques clics"
                                    href="/documents/create"
                                    color="bg-primary"
                                />
                                <QuickActionCard
                                    icon={Search}
                                    title="Analyser des clauses"
                                    description="Détectez les risques avec l'IA"
                                    href="/analyzer"
                                    color="bg-secondary"
                                />
                                <QuickActionCard
                                    icon={BarChart3}
                                    title="Voir mes documents"
                                    description="Accédez à tous vos fichiers"
                                    href="/documents"
                                    color="bg-blue-500"
                                />
                                <QuickActionCard
                                    icon={Settings}
                                    title="Paramètres"
                                    description="Gérez votre compte"
                                    href="/settings"
                                    color="bg-gray-500"
                                />
                            </div>
                        </div>

                        {/* Recent Documents */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Documents récents</CardTitle>
                                    <Button variant="ghost" size="sm" onClick={() => navigate('/documents')}>
                                        Voir tout
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentDocuments.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                            onClick={() => navigate(`/documents/${doc.id}`)}
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="p-2 rounded-lg bg-primary/10">
                                                    <FileText className="w-5 h-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{doc.type}</p>
                                                    <p className="text-sm text-muted-foreground">{doc.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant={
                                                    doc.status === 'signé' ? 'default' :
                                                        doc.status === 'final' ? 'secondary' : 'outline'
                                                }>
                                                    {doc.status}
                                                </Badge>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - 1/3 */}
                    <div className="space-y-6">

                        {/* Activity Feed */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Activité récente</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {activities.map((activity, idx) => {
                                        const Icon = activity.icon
                                        return (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="p-2 rounded-lg bg-muted">
                                                    <Icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{activity.document}</p>
                                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips Card */}
                        <Card className="border-secondary/50 bg-secondary/5">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-secondary" />
                                    Conseil du jour
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Utilisez l'analyse IA pour détecter les clauses abusives avant de signer
                                    un contrat. C'est rapide et gratuit !
                                </p>
                                <Button variant="secondary" size="sm" className="mt-4 w-full">
                                    Essayer maintenant
                                </Button>
                            </CardContent>
                        </Card>

                        {/* User Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Mon compte</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                                            {userName.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-medium">{userName}</p>
                                        <p className="text-sm text-muted-foreground">{userEmail}</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                                    Voir mon profil
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
