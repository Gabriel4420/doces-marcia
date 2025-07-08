"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Toggle } from "@/components/ui/toggle"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import { useToast } from "@/hooks/use-toast"
import { Cookie, Shield, BarChart3, Megaphone, Settings, Save } from "lucide-react"

export function CookieSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const [tempPreferences, setTempPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  })
  const { preferences, updatePreferences } = useCookieConsent()
  const { toast } = useToast()

  const handleOpen = () => {
    setTempPreferences(preferences)
    setIsOpen(true)
  }

  const handleSave = () => {
    updatePreferences(tempPreferences)
    setIsOpen(false)
    toast({
      title: "Preferências Salvas",
      description: "Suas preferências de cookies foram atualizadas com sucesso.",
      duration: 3000,
    })
  }

  const handleToggle = (key: keyof typeof tempPreferences) => {
    if (key === "essential") return // Cookies essenciais não podem ser desabilitados
    
    setTempPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpen}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Configurar Cookies
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            Configurações de Cookies
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Cookies Essenciais */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium">Cookies Essenciais</span>
              </div>
              <Toggle
                pressed={tempPreferences.essential}
                disabled
                className="opacity-50"
              >
                Sempre Ativo
              </Toggle>
            </div>
            <p className="text-sm text-muted-foreground">
              Necessários para o funcionamento básico do site. Incluem autenticação, 
              segurança e preferências básicas.
            </p>
          </div>

          {/* Cookies de Análise */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Cookies de Análise</span>
              </div>
              <Toggle
                pressed={tempPreferences.analytics}
                onPressedChange={() => handleToggle("analytics")}
              >
                {tempPreferences.analytics ? "Ativo" : "Inativo"}
              </Toggle>
            </div>
            <p className="text-sm text-muted-foreground">
              Nos ajudam a entender como você usa o site para melhorar nossos serviços.
            </p>
          </div>

          {/* Cookies de Marketing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Cookies de Marketing</span>
              </div>
              <Toggle
                pressed={tempPreferences.marketing}
                onPressedChange={() => handleToggle("marketing")}
              >
                {tempPreferences.marketing ? "Ativo" : "Inativo"}
              </Toggle>
            </div>
            <p className="text-sm text-muted-foreground">
              Usados para personalizar anúncios e conteúdo baseado em seus interesses.
            </p>
          </div>

          {/* Ações */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 