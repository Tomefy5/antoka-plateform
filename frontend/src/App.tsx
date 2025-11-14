import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header avec logo */}
        <div className="text-center space-y-4">
          <img 
            src="/antoka-logo.jpg" 
            alt="Antoka" 
            className="w-32 h-32 mx-auto object-contain"
          />
          <h1 className="text-4xl font-heading text-primary">
            Antoka Legal Tech
          </h1>
          <p className="text-muted-foreground">
            Plateforme de documents légaux pour Madagascar
          </p>
        </div>

        {/* Palette de couleurs */}
        <Card>
          <CardHeader>
            <CardTitle>Palette de couleurs Antoka</CardTitle>
            <CardDescription>Navy (#0A2342) et Teal (#0D8A8D)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Couleurs directes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="bg-navy h-20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">Navy Primary</span>
                </div>
                <p className="text-sm text-muted-foreground">#0A2342</p>
              </div>
              <div className="space-y-2">
                <div className="bg-teal h-20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">Teal Secondary</span>
                </div>
                <p className="text-sm text-muted-foreground">#0D8A8D</p>
              </div>
            </div>

            {/* Boutons Shadcn */}
            <div className="space-y-3">
              <h3 className="font-heading text-lg">Boutons</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Primary (Navy)</Button>
                <Button variant="secondary">Secondary (Teal)</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Dégradés Navy */}
            <div className="space-y-3">
              <h3 className="font-heading text-lg">Dégradé Navy</h3>
              <div className="flex gap-2">
                <div className="bg-navy-100 h-16 flex-1 rounded"></div>
                <div className="bg-navy-300 h-16 flex-1 rounded"></div>
                <div className="bg-navy-500 h-16 flex-1 rounded"></div>
                <div className="bg-navy-700 h-16 flex-1 rounded"></div>
                <div className="bg-navy-900 h-16 flex-1 rounded"></div>
              </div>
            </div>

            {/* Dégradés Teal */}
            <div className="space-y-3">
              <h3 className="font-heading text-lg">Dégradé Teal</h3>
              <div className="flex gap-2">
                <div className="bg-teal-100 h-16 flex-1 rounded"></div>
                <div className="bg-teal-300 h-16 flex-1 rounded"></div>
                <div className="bg-teal-500 h-16 flex-1 rounded"></div>
                <div className="bg-teal-700 h-16 flex-1 rounded"></div>
                <div className="bg-teal-900 h-16 flex-1 rounded"></div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Exemple carte avec les couleurs */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-navy">
            <CardHeader className="bg-navy text-white">
              <CardTitle>Contrat de location</CardTitle>
              <CardDescription className="text-gray-200">
                Document généré automatiquement
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Créez des contrats conformes au droit malgache en quelques clics.
              </p>
              <Button className="w-full mt-4">Créer un document</Button>
            </CardContent>
          </Card>

          <Card className="border-teal">
            <CardHeader className="bg-teal text-white">
              <CardTitle>Analyse de clauses</CardTitle>
              <CardDescription className="text-gray-200">
                IA pour détecter les clauses abusives
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Protégez-vous contre les clauses dangereuses grâce à l'IA.
              </p>
              <Button variant="secondary" className="w-full mt-4">
                Analyser
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default App
