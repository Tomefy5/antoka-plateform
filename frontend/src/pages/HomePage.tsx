import HeroSection from "@/components/sections/HeroSection"
import ValueProposition from "@/components/sections/ValueProposition"
import FeaturesSection from "@/components/sections/FeaturesSection"
import HowItWorks from "@/components/sections/HowItWorks"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function HomePage() {

    return (
        <div className="min-h-screen">

            <Navbar isAuthenticated={false} />

            <HeroSection />
            <ValueProposition />
            <FeaturesSection />
            <HowItWorks />

            {/* CTA Final */}
            <section className="py-20 px-4 bg-linear-to-r from-primary to-secondary text-white">
                <div className="container max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold">
                        Prêt à simplifier vos documents légaux ?
                    </h2>
                    <p className="text-xl opacity-90">
                        Rejoignez des centaines d'utilisateurs qui font confiance à Antoka
                    </p>
                    <Button size="lg" variant="secondary" className="text-lg px-8">
                        Commencer gratuitement
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </section>
            <Footer />
        </div>
    )
}
