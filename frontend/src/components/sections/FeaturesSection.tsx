import { FileText, Search, Users, Lock } from "lucide-react"

const features = [
    {
        icon: FileText,
        title: "Génération de contrats",
        description: "Location, travail, vente... Tous types de documents légaux"
    },
    {
        icon: Search,
        title: "Analyse de clauses",
        description: "Détection automatique des clauses abusives par IA"
    },
    {
        icon: Users,
        title: "Édition collaborative",
        description: "Travaillez à plusieurs en temps réel sur vos documents"
    },
    {
        icon: Lock,
        title: "Signature numérique",
        description: "Signature sécurisée et horodatée sur blockchain"
    }
]

export default function FeaturesSection() {
    return (
        <section className="py-20 px-4">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Fonctionnalités complètes
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-6 rounded-xl border-2 border-transparent hover:border-secondary/50 hover:bg-muted/50 transition-all cursor-pointer">
                            <feature.icon className="w-12 h-12 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
