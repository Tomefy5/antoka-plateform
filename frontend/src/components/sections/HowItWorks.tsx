import { Badge } from "@/components/ui/badge"

const steps = [
    {
        number: "01",
        title: "Choisissez votre document",
        description: "Sélectionnez le type de contrat dont vous avez besoin"
    },
    {
        number: "02",
        title: "Remplissez les détails",
        description: "L'IA vous guide pour renseigner les informations essentielles"
    },
    {
        number: "03",
        title: "Validez et signez",
        description: "Votre document est vérifié, certifié et prêt à l'emploi"
    }
]

export default function HowItWorks() {
    return (
        <section className="py-20 px-4 bg-primary text-primary-foreground">
            <div className="container max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">Simple et rapide</Badge>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Comment ça marche ?
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="text-6xl font-bold text-secondary/20 mb-4">{step.number}</div>
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-primary-foreground/80">{step.description}</p>

                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-secondary/30"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
