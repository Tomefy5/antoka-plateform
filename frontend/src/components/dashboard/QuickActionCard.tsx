import { Card, CardContent } from '@/components/ui/card'
import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface QuickActionCardProps {
    icon: LucideIcon
    title: string
    description: string
    href: string
    color: string
}

export default function QuickActionCard({
    icon: Icon,
    title,
    description,
    href,
    color
}: QuickActionCardProps) {
    const navigate = useNavigate()

    return (
        <Card
            className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/50"
            onClick={() => navigate(href)}
        >
            <CardContent className="pt-6 pb-5">
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
