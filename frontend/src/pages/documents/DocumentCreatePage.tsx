import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Loader2, FileCheck } from 'lucide-react'

import Step1TypeSelection from '@/components/document/Step1TypeSelection'
import Step2Parties from '@/components/document/Step2Parties'
import Step3Clauses from '@/components/document/Step3Clauses'
import { documentService } from '@/services/document.service'

import type { DocumentType, Party, DocumentClause } from '@/types/document.types'

export default function DocumentCreatePage() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Form state
    const [documentType, setDocumentType] = useState<DocumentType | null>(null)
    const [parties, setParties] = useState<Party[]>([
        { role: '', nom: '', adresse: '' },
        { role: '', nom: '', adresse: '' }
    ])
    const [clauses, setClauses] = useState<DocumentClause[]>([])
    const [language, setLanguage] = useState<'fr' | 'mg'>('fr')

    const totalSteps = 3
    const progress = (currentStep / totalSteps) * 100

    const canProceed = () => {
        if (currentStep === 1) return documentType !== null
        if (currentStep === 2) {
            return parties.every(p => p.role && p.nom && p.adresse)
        }
        return true
    }

    const handleNext = () => {
        if (canProceed() && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleGenerate = async () => {
        if (!documentType) return

        setIsLoading(true)
        setError('')

        try {
            const result = await documentService.generateDocument({
                type: documentType,
                lang: language,
                parties,
                clauses
            })

            // Rediriger vers la page de visualisation
            navigate(`/documents/${result.id}`)
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erreur lors de la génération')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
            <div className="container max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/documents')}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                    </Button>

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-heading font-bold">
                                Créer un document
                            </h1>
                            <p className="text-muted-foreground">
                                Étape {currentStep} sur {totalSteps}
                            </p>
                        </div>
                        <img src="/antoka-logo.jpg" alt="Antoka" className="w-16 h-16 object-contain" />
                    </div>

                    {/* Progress bar */}
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                        {error}
                    </div>
                )}

                {/* Steps */}
                <div className="bg-card rounded-2xl shadow-xl p-8 mb-8">
                    {currentStep === 1 && (
                        <Step1TypeSelection
                            selectedType={documentType}
                            onSelect={setDocumentType}
                        />
                    )}

                    {currentStep === 2 && documentType && (
                        <Step2Parties
                            parties={parties}
                            onChange={setParties}
                            documentType={documentType}
                        />
                    )}

                    {currentStep === 3 && documentType && (
                        <Step3Clauses
                            clauses={clauses}
                            onChange={setClauses}
                            documentType={documentType}
                            language={language}
                            onLanguageChange={setLanguage}
                        />
                    )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Précédent
                    </Button>

                    {currentStep < totalSteps ? (
                        <Button
                            onClick={handleNext}
                            disabled={!canProceed()}
                        >
                            Suivant
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleGenerate}
                            disabled={isLoading || !canProceed()}
                            size="lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Génération...
                                </>
                            ) : (
                                <>
                                    <FileCheck className="w-5 h-5 mr-2" />
                                    Générer le document
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
