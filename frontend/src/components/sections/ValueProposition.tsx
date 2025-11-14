import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Shield, Clock } from "lucide-react"

const values = [
    {
        icon: Sparkles,
        title: "Génération IA",
        description: "Des contrats rédigés automatiquement par l'IA Gemini, conformes au Code civil malgache.",
        color: "text-secondary"
    },
    {
        icon: Shield,
        title: "Blockchain certifiée",
        description: "Chaque document est horodaté et sécurisé sur Hedera pour une authenticité garantie.",
        color: "text-primary"
    },
    {
        icon: Clock,
        title: "En quelques minutes",
        description: "Plus besoin d'attendre des jours. Créez, vérifiez et signez en moins de 10 minutes.",
        color: "text-teal"
    }
]

export default function ValueProposition() {
    return (
        <section className="py-20 px-4 bg-muted/30">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Pourquoi choisir Antoka ?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Une plateforme pensée pour simplifier l'accès aux documents légaux à Madagascar
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                            <CardContent className="pt-8 pb-6 text-center space-y-4">
                                <div className={`inline-flex p-4 rounded-2xl bg-muted ${value.color}`}>
                                    <value.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold">
                                    {value.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {value.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
