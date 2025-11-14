import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthCallback() {
    const navigate = useNavigate()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('Vérification en cours...')

    useEffect(() => {
        handleCallback()
    }, [])

    const handleCallback = async () => {
        try {
            // Récupérer les tokens depuis le hash fragment (#)
            const hashParams = new URLSearchParams(window.location.hash.substring(1))

            const access_token = hashParams.get('access_token')
            const refresh_token = hashParams.get('refresh_token')
            const type = hashParams.get('type') // 'signup', 'recovery', 'invite', etc.
            const error = hashParams.get('error')
            const error_description = hashParams.get('error_description')

            console.log('Callback params:', {
                access_token: access_token ? '✅' : '❌',
                refresh_token: refresh_token ? '✅' : '❌',
                type,
                error
            })

            // Gestion des erreurs Supabase
            if (error) {
                setStatus('error')
                setMessage(error_description || 'Erreur de vérification')
                setTimeout(() => navigate('/login'), 3000)
                return
            }

            // Sauvegarder les tokens
            if (access_token && refresh_token) {
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token)

                setStatus('success')

                // Message selon le type
                if (type === 'signup') {
                    setMessage('Email vérifié avec succès ! Redirection...')
                } else if (type === 'recovery') {
                    setMessage('Mot de passe réinitialisé ! Redirection...')
                } else {
                    setMessage('Authentification réussie ! Redirection...')
                }

                // Redirection vers dashboard après 2 secondes
                setTimeout(() => navigate('/dashboard'), 2000)
            } else {
                setStatus('error')
                setMessage('Tokens manquants. Veuillez réessayer.')
                setTimeout(() => navigate('/login'), 3000)
            }
        } catch (error) {
            console.error('Erreur callback:', error)
            setStatus('error')
            setMessage('Une erreur est survenue')
            setTimeout(() => navigate('/login'), 3000)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-muted/20 to-background p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    {status === 'loading' && (
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </div>
                    )}
                    {status === 'success' && (
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                            <XCircle className="w-10 h-10 text-red-600" />
                        </div>
                    )}

                    <CardTitle className="text-2xl">
                        {status === 'loading' && 'Vérification...'}
                        {status === 'success' && 'Succès !'}
                        {status === 'error' && 'Erreur'}
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-center">
                    <p className="text-muted-foreground">{message}</p>
                </CardContent>
            </Card>
        </div>
    )
}
