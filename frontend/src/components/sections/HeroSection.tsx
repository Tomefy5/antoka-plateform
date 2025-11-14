import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Shield, Zap } from "lucide-react"

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 pt-20">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="container max-w-6xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                            <Zap className="w-4 h-4" />
                            <span>Propulsé par l'IA et la Blockchain</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                            Documents légaux{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                en quelques minutes
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                            Créez des contrats conformes au droit malgache, vérifiés par l'IA
                            et sécurisés sur la blockchain. Simple, rapide, fiable.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="text-lg px-8">
                                Créer mon document
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8">
                                Voir la démo
                            </Button>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-secondary" />
                                <span>Certifié blockchain</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-secondary" />
                                <span>Conforme droit malgache</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual/Mockup */}
                    <div className="relative">
                        {/* Mockup placeholder - remplace par une vraie capture d'écran */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
                            <div className="relative bg-card border-2 border-border rounded-2xl p-8 shadow-2xl">
                                <img
                                    src="/antoka-logo.jpg"
                                    alt="Antoka Dashboard"
                                    className="w-full h-auto rounded-lg"
                                />
                                {/* Stats overlay */}
                                <div className="absolute -bottom-6 -right-6 bg-background border-2 border-secondary rounded-xl p-4 shadow-xl">
                                    <div className="text-2xl font-bold text-primary">500+</div>
                                    <div className="text-sm text-muted-foreground">Documents créés</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50"></div>
                </div>
            </div>
        </section>
    )
}
