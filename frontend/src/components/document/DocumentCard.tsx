import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    FileText,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    Download,
    Clock
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'

interface DocumentCardProps {
    id: string
    type: string
    status: 'brouillon' | 'final' | 'signé'
    createdAt: string
    updatedAt?: string
    onDelete?: (id: string) => void
}

export default function DocumentCard({
    id,
    type,
    status,
    createdAt,
    onDelete
}: DocumentCardProps) {
    const navigate = useNavigate()

    const getStatusColor = () => {
        if (status === 'signé') return 'bg-green-500'
        if (status === 'final') return 'bg-blue-500'
        return 'bg-gray-500'
    }

    const getTypeIcon = () => {
        return <FileText className="w-12 h-12 text-primary" />
    }

    return (
        <Card className="group hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                        {getTypeIcon()}
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/documents/${id}`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/documents/${id}/edit`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Éditer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onDelete?.(id)}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent onClick={() => navigate(`/documents/${id}`)}>
                <h3 className="font-semibold text-lg mb-2">
                    {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
            </CardContent>

            <CardFooter>
                <Badge variant={status === 'signé' ? 'default' : 'secondary'}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            </CardFooter>
        </Card>
    )
}
