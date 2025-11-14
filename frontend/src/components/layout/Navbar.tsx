import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    Menu,
    Search,
    Bell,
    User,
    Settings,
    LogOut,
    FileText,
    LayoutDashboard,
    Plus,
    HelpCircle
} from 'lucide-react'

interface NavbarProps {
    isAuthenticated?: boolean
    userName?: string
    userEmail?: string
}

export default function Navbar({
    isAuthenticated = false,
    userName = 'Utilisateur',
    userEmail = 'user@email.com'
}: NavbarProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchOpen, setSearchOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const notifications = [
        { id: 1, text: 'Nouveau document généré', time: '5 min', unread: true },
        { id: 2, text: 'Analyse terminée', time: '1h', unread: true },
        { id: 3, text: 'Signature requise', time: '2h', unread: false }
    ]

    const unreadCount = notifications.filter(n => n.unread).length

    const navLinks = [
        { path: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
        { path: '/documents', label: 'Documents', icon: FileText },
        { path: '/documents/create', label: 'Créer', icon: Plus },
    ]

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    const isActivePath = (path: string) => location.pathname === path

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img src="/favicon/web-app-manifest-512x512.png" alt="Antoka" className="w-10 h-10 object-contain" />
                    <span className="font-heading font-bold text-xl hidden sm:inline">Antoka</span>
                </Link>

                {/* Desktop Navigation */}
                {isAuthenticated && (
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon
                            const active = isActivePath(link.path)

                            return (
                                <Button
                                    key={link.path}
                                    variant={active ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => navigate(link.path)}
                                    className="gap-2"
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.label}
                                </Button>
                            )
                        })}
                    </div>
                )}

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">

                    {isAuthenticated ? (
                        <>
                            {/* Search */}
                            <div className="hidden lg:block relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher..."
                                    className="pl-9 w-64"
                                    onFocus={() => setSearchOpen(true)}
                                    onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                                />
                                {searchOpen && (
                                    <div className="absolute top-full mt-2 w-full bg-popover border rounded-lg shadow-lg p-2">
                                        <p className="text-sm text-muted-foreground p-2">Aucun résultat récent</p>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Search */}
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Search className="w-5 h-5" />
                            </Button>

                            {/* Notifications */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative">
                                        <Bell className="w-5 h-5" />
                                        {unreadCount > 0 && (
                                            <Badge
                                                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                                                variant="destructive"
                                            >
                                                {unreadCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80">
                                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {notifications.map((notif) => (
                                        <DropdownMenuItem key={notif.id} className="flex items-start gap-2 p-3">
                                            <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-primary' : 'bg-muted'}`} />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{notif.text}</p>
                                                <p className="text-xs text-muted-foreground">Il y a {notif.time}</p>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="justify-center text-primary">
                                        Voir tout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                                {userName.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{userName}</p>
                                            <p className="text-xs text-muted-foreground">{userEmail}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                                        <User className="w-4 h-4 mr-2" />
                                        Mon profil
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                        Tableau de bord
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('/documents')}>
                                        <FileText className="w-4 h-4 mr-2" />
                                        Mes documents
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                                        <Settings className="w-4 h-4 mr-2" />
                                        Paramètres
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <HelpCircle className="w-4 h-4 mr-2" />
                                        Aide
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Se déconnecter
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Mobile Menu */}
                            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu className="w-5 h-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-80">
                                    <SheetHeader>
                                        <SheetTitle>Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-4 mt-8">
                                        {navLinks.map((link) => {
                                            const Icon = link.icon
                                            const active = isActivePath(link.path)

                                            return (
                                                <Button
                                                    key={link.path}
                                                    variant={active ? 'default' : 'ghost'}
                                                    className="justify-start gap-2"
                                                    onClick={() => {
                                                        navigate(link.path)
                                                        setMobileMenuOpen(false)
                                                    }}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    {link.label}
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </>
                    ) : (
                        // Not authenticated - Login/Signup buttons
                        <>
                            <Button variant="ghost" onClick={() => navigate('/login')}>
                                Se connecter
                            </Button>
                            <Button onClick={() => navigate('/signup')}>
                                S'inscrire
                            </Button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}
