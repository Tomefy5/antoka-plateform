import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, ArrowLeft, Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { authService } from '@/services/auth.service'

// Schéma de validation avec confirmation password
const signupSchema = z.object({
    fullName: z.string()
        .trim()
        .min(2, 'Nom complet requis (min 2 caractères)')
        .max(100, 'Nom trop long (max 100 caractères)'),

    email: z.string()
        .email('Email invalide')
        .transform(val => val.toLowerCase()), // normalizeEmail équivalent

    password: z.string()
        .min(8, 'Mot de passe min 8 caractères')  // ⚠️ Note: backend dit "min 12" dans le message mais check min 8
        .regex(/[a-z]/, 'Doit contenir une minuscule')
        .regex(/[A-Z]/, 'Doit contenir une majuscule')
        .regex(/[0-9]/, 'Doit contenir un chiffre')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Doit contenir un caractère spécial'),

    passwordConfirm: z.string()
        .min(1, 'Confirmation du mot de passe requise'),

    organizationId: z.string()
        .uuid('ID organisation invalide')
        .optional()
        .or(z.literal('')) // Permet une chaîne vide
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm']
})


type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema)
    })

    const password = watch('password')

    // Password strength indicators
    const passwordChecks = {
        length: password?.length >= 8,
        uppercase: /[A-Z]/.test(password || ''),
        number: /[0-9]/.test(password || '')
    }

    const onSubmit = async (data: SignupFormData) => {
        setError('')

        try {
            const result = await authService.signup(data)

            if (result.success) {
                navigate(`/verify-email-pending?email=${encodeURIComponent(data.email)}`)
            } else {
                setError("Erreur lors de l'inscription");
            }
        } catch {
            setError("Un problème réseau est survenu, veuillez réessayer plus tard.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-muted/20 to-background p-4">
            <Link
                to="/"
                className="absolute top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
            </Link>

            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-secondary/20 via-secondary/40 to-secondary/20 shadow-lg ring-2 ring-secondary/40 ring-offset-2 ring-offset-background">
                        <img
                            src="/favicon/favicon.svg"
                            alt="Antoka"
                            className="h-[98%] w-[98%] object-contain"
                        />
                    </div>

                    <CardTitle className="text-2xl font-heading">Créer un compte</CardTitle>
                    <CardDescription>
                        Rejoignez Antoka et simplifiez vos documents légaux
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nom complet</Label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="Jean Dupont"
                                autoComplete="name"
                                autoFocus
                                aria-invalid={!!errors.fullName}
                                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                                {...register('fullName')}
                                className={errors.fullName ? 'border-destructive' : ''}
                            />
                            {errors.fullName && (
                                <p className="text-sm text-destructive">{errors.fullName.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="votre@email.com"
                                autoComplete="email"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                {...register('email')}
                                className={errors.email ? 'border-destructive' : ''}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    aria-invalid={!!errors.password}
                                    aria-describedby={errors.password ? 'password-error' : undefined}
                                    autoComplete="new-password"
                                    {...register('password')}
                                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Password strength indicators */}
                            {password && (
                                <div className="space-y-1.5 text-xs">
                                    <div className={`flex items-center gap-2 ${passwordChecks.length ? 'text-green-600' : 'text-muted-foreground'}`}>
                                        {passwordChecks.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                        <span>Au moins 8 caractères</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${passwordChecks.uppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                                        {passwordChecks.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                        <span>Au moins une majuscule</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${passwordChecks.number ? 'text-green-600' : 'text-muted-foreground'}`}>
                                        {passwordChecks.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                        <span>Au moins un chiffre</span>
                                    </div>
                                </div>
                            )}

                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Password Confirm */}
                        <div className="space-y-2">
                            <Label htmlFor="passwordConfirm">Confirmer le mot de passe</Label>
                            <div className="relative">
                                <Input
                                    id="passwordConfirm"
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    {...register('passwordConfirm')}
                                    className={errors.passwordConfirm ? 'border-destructive pr-10' : 'pr-10'}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                    aria-label={showPassword ? "Masquer la confirmation de mot de passe" : "Afficher la confirmation de mot de passe"}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPasswordConfirm ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.passwordConfirm && (
                                <p className="text-sm text-destructive">{errors.passwordConfirm.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                            Créer mon compte
                        </Button>

                        {/* Terms */}
                        <p className="text-xs text-muted-foreground text-center">
                            En vous inscrivant, vous acceptez nos{' '}
                            <Link to="/terms" className="text-secondary hover:underline">
                                Conditions d'utilisation
                            </Link>
                            {' '}et notre{' '}
                            <Link to="/privacy" className="text-secondary hover:underline">
                                Politique de confidentialité
                            </Link>
                        </p>

                        {/* Login link */}
                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Vous avez déjà un compte ?{' '}
                            <Link to="/login" className="text-secondary hover:underline font-medium">
                                Se connecter
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
