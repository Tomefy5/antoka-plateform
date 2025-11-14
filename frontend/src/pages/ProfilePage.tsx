import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    Bell,
    Globe,
    Shield,
    Trash2,
    Save,
    CheckCircle2,
    AlertTriangle,
    Camera
} from 'lucide-react'

export default function ProfilePage() {
    const navigate = useNavigate()

    // User data (mock)
    const [userData, setUserData] = useState({
        fullName: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        phone: '+261 34 12 345 67',
        address: 'Antananarivo, Madagascar',
        company: 'Antoka Technologies',
        role: 'Utilisateur'
    })

    // Preferences
    const [preferences, setPreferences] = useState({
        language: 'fr',
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: false,
        twoFactor: false
    })

    // Password change
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [saveSuccess, setSaveSuccess] = useState(false)
    const [activeTab, setActiveTab] = useState('profile')

    const handleSaveProfile = () => {
        // Simulate API call
        setTimeout(() => {
            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), 3000)
        }, 500)
    }

    const handleChangePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Les mots de passe ne correspondent pas')
            return
        }
        // Simulate API call
        alert('Mot de passe changé avec succès')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    }

    const handleDeleteAccount = () => {
        if (confirm('⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
            // Simulate account deletion
            localStorage.removeItem('access_token')
            navigate('/signup')
        }
    }

    const stats = {
        documents: 12,
        analyses: 8,
        signatures: 3,
        storage: '2.4 GB'
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container max-w-5xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex-1">
                            <h1 className="text-2xl font-heading font-bold">Mon profil</h1>
                            <p className="text-sm text-muted-foreground">Gérez vos informations personnelles</p>
                        </div>
                        <Link to="/">
                            <img src="/antoka-logo.jpg" alt="Antoka" className="w-10 h-10 object-contain" />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container max-w-5xl mx-auto px-4 py-8">

                {/* Profile Header Card */}
                <Card className="mb-8">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="relative group">
                                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                                        {userData.fullName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold mb-1">{userData.fullName}</h2>
                                <p className="text-muted-foreground mb-3">{userData.email}</p>
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    <Badge variant="secondary">{userData.role}</Badge>
                                    <Badge variant="outline">{userData.company}</Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-primary">{stats.documents}</div>
                                    <div className="text-xs text-muted-foreground">Documents</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-secondary">{stats.analyses}</div>
                                    <div className="text-xs text-muted-foreground">Analyses</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="profile">
                            <User className="w-4 h-4 mr-2" />
                            Profil
                        </TabsTrigger>
                        <TabsTrigger value="security">
                            <Lock className="w-4 h-4 mr-2" />
                            Sécurité
                        </TabsTrigger>
                        <TabsTrigger value="preferences">
                            <Bell className="w-4 h-4 mr-2" />
                            Préférences
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Profile Info */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations personnelles</CardTitle>
                                <CardDescription>
                                    Mettez à jour vos informations de profil
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Nom complet</Label>
                                        <Input
                                            id="fullName"
                                            value={userData.fullName}
                                            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input
                                            id="phone"
                                            value={userData.phone}
                                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Entreprise</Label>
                                        <Input
                                            id="company"
                                            value={userData.company}
                                            onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Adresse</Label>
                                    <Input
                                        id="address"
                                        value={userData.address}
                                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                    />
                                </div>

                                <div className="flex items-center gap-3 pt-4">
                                    <Button onClick={handleSaveProfile}>
                                        <Save className="w-4 h-4 mr-2" />
                                        Enregistrer les modifications
                                    </Button>
                                    {saveSuccess && (
                                        <span className="flex items-center gap-2 text-green-600 text-sm">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Enregistré !
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistiques</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-lg bg-muted text-center">
                                        <div className="text-2xl font-bold">{stats.documents}</div>
                                        <div className="text-sm text-muted-foreground">Documents</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-muted text-center">
                                        <div className="text-2xl font-bold">{stats.analyses}</div>
                                        <div className="text-sm text-muted-foreground">Analyses</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-muted text-center">
                                        <div className="text-2xl font-bold">{stats.signatures}</div>
                                        <div className="text-sm text-muted-foreground">Signatures</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-muted text-center">
                                        <div className="text-2xl font-bold">{stats.storage}</div>
                                        <div className="text-sm text-muted-foreground">Stockage</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab 2: Security */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Changer le mot de passe</CardTitle>
                                <CardDescription>
                                    Assurez-vous d'utiliser un mot de passe fort
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    />
                                </div>
                                <Button onClick={handleChangePassword}>
                                    Mettre à jour le mot de passe
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Authentification à deux facteurs</CardTitle>
                                <CardDescription>
                                    Ajoutez une couche de sécurité supplémentaire
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="font-medium">2FA {preferences.twoFactor ? 'activée' : 'désactivée'}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Protection par SMS ou application
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={preferences.twoFactor}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, twoFactor: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-destructive/50">
                            <CardHeader>
                                <CardTitle className="text-destructive">Zone de danger</CardTitle>
                                <CardDescription>
                                    Actions irréversibles
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-medium mb-1">Supprimer mon compte</p>
                                        <p className="text-sm text-muted-foreground">
                                            Une fois supprimé, il n'y a aucun retour en arrière
                                        </p>
                                    </div>
                                    <Button variant="destructive" onClick={handleDeleteAccount}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Supprimer
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab 3: Preferences */}
                    <TabsContent value="preferences" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Langue</CardTitle>
                                <CardDescription>
                                    Choisissez la langue de l'interface
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Select value={preferences.language} onValueChange={(val) => setPreferences({ ...preferences, language: val })}>
                                    <SelectTrigger className="w-full md:w-64">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fr">Français</SelectItem>
                                        <SelectItem value="mg">Malgache</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>
                                    Gérez vos préférences de notifications
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Notifications par email</p>
                                        <p className="text-sm text-muted-foreground">
                                            Recevez des mises à jour par email
                                        </p>
                                    </div>
                                    <Switch
                                        checked={preferences.emailNotifications}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Notifications push</p>
                                        <p className="text-sm text-muted-foreground">
                                            Notifications dans le navigateur
                                        </p>
                                    </div>
                                    <Switch
                                        checked={preferences.pushNotifications}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Emails marketing</p>
                                        <p className="text-sm text-muted-foreground">
                                            Nouveautés et offres spéciales
                                        </p>
                                    </div>
                                    <Switch
                                        checked={preferences.marketingEmails}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, marketingEmails: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
