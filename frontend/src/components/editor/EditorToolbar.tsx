import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Undo,
    Redo,
    Save
} from 'lucide-react'

interface EditorToolbarProps {
    onSave: () => void
    isSaving?: boolean
}

export default function EditorToolbar({ onSave, isSaving }: EditorToolbarProps) {
    return (
        <div className="border-b bg-muted/30 px-4 py-2">
            <div className="flex items-center gap-2 flex-wrap">
                {/* Format buttons */}
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" title="Gras">
                        <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Italique">
                        <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Souligné">
                        <Underline className="w-4 h-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Lists */}
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" title="Liste">
                        <List className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Liste numérotée">
                        <ListOrdered className="w-4 h-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Alignment */}
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" title="Aligner à gauche">
                        <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Centrer">
                        <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Aligner à droite">
                        <AlignRight className="w-4 h-4" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6" />

                {/* Undo/Redo */}
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" title="Annuler">
                        <Undo className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Rétablir">
                        <Redo className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex-1" />

                {/* Save button */}
                <Button size="sm" onClick={onSave} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
            </div>
        </div>
    )
}
