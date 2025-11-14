import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react'
import axios from 'axios'

export default function EmailVerificationPending() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email') || 'votre email'

    const [resending, setResending] = useState(false)
    const [resent, setResent] = useState(false)

    const handleResendEmail = async () => {
        setResending(true)

        try {
            // Appel API pour renvoyer l'email
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost'
            const API_PORT = import.meta.env.VITE_API_PORT || '3001'

            await axios.post(`${API_URL}:${API_PORT}/api/auth/resend-verification`, {
                email
            })

            setResent(true)
            setTimeout(() => setResent(false), 5000)
        } catch (error) {
            console.error('Erreur renvoi email:', error)
        } finally {
            setResending(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
            {/* Back button */}
            <Button
                variant="ghost"
                className="absolute top-4 left-4"
                onClick={() => navigate('/login')}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
            </Button>

            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Vérifiez votre email</CardTitle>
                    <CardDescription className="text-base">
                        Un email de confirmation a été envoyé à
                    </CardDescription>
                    <p className="font-semibold text-primary mt-2">{email}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Instructions */}
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">1</span>
                            </div>
                            <p>Ouvrez votre boîte email</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">2</span>
                            </div>
                            <p>Cherchez un email de <strong>Antoka</strong></p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">3</span>
                            </div>
                            <p>Cliquez sur le lien de vérification</p>
                        </div>
                    </div>

                    {/* Resend email */}
                    <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-3 text-center">
                            Vous n'avez pas reçu l'email ?
                        </p>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleResendEmail}
                            disabled={resending || resent}
                        >
                            {resending ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Envoi en cours...
                                </>
                            ) : resent ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                                    Email renvoyé !
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Renvoyer l'email
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Help text */}
                    <div className="text-xs text-center text-muted-foreground space-y-2">
                        <p>💡 Vérifiez aussi vos spams</p>
                        <p>
                            Besoin d'aide ? {' '}
                            <a href="mailto:support@antoka.mg" className="text-primary hover:underline">
                                Contactez-nous
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
