import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img src="/favicon/favicon.svg" alt="Antoka" className="w-10 h-10" />
                            <span className="font-heading font-bold text-xl">Antoka</span>
                        </div>
                        <p className="text-sm opacity-80">
                            Documents légaux intelligents pour Madagascar
                        </p>
                        <div className="flex gap-3">
                            <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                                <Facebook className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                                <Twitter className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                                <Linkedin className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                                <Mail className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold mb-4">Produit</h3>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><Link to="/features" className="hover:opacity-100">Fonctionnalités</Link></li>
                            <li><Link to="/pricing" className="hover:opacity-100">Tarifs</Link></li>
                            <li><Link to="/templates" className="hover:opacity-100">Templates</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Entreprise</h3>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><Link to="/about" className="hover:opacity-100">À propos</Link></li>
                            <li><Link to="/contact" className="hover:opacity-100">Contact</Link></li>
                            <li><Link to="/careers" className="hover:opacity-100">Carrières</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold mb-4">Légal</h3>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><Link to="/privacy" className="hover:opacity-100">Confidentialité</Link></li>
                            <li><Link to="/terms" className="hover:opacity-100">CGU</Link></li>
                            <li><Link to="/cookies" className="hover:opacity-100">Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
                    <p>© 2025 Antoka Legal Tech. Tous droits réservés. 🇲🇬</p>
                </div>
            </div>
        </footer>
    )
}
