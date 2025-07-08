"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Cookie, Shield, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCookieConsent } from "@/hooks/use-cookie-consent"

interface CookieConsentProps {
  className?: string
}

export function CookieConsent({ className }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { hasConsented, acceptAll, declineAll } = useCookieConsent()

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    if (!hasConsented) {
      // Aguarda um pouco para não aparecer imediatamente
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [hasConsented])

  const handleAccept = () => {
    acceptAll()
    setIsVisible(false)
  }

  const handleDecline = () => {
    declineAll()
    setIsVisible(false)
  }

  const handleSettings = () => {
    setIsExpanded(!isExpanded)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto",
        className
      )}
    >
      <div className="bg-background border border-border rounded-lg shadow-lg p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-sm">Cookies e Permissões</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
            personalizar conteúdo e analisar o tráfego do site. Ao continuar navegando, 
            você concorda com nossa política de privacidade.
          </p>

          {isExpanded && (
            <div className="space-y-3 p-3 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Cookies Essenciais</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Necessários para o funcionamento básico do site. Incluem autenticação, 
                segurança e preferências básicas.
              </p>

              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Cookies de Análise</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Nos ajudam a entender como você usa o site para melhorar nossos serviços.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSettings}
            className="flex-1"
          >
            <Settings className="h-4 w-4 mr-2" />
            {isExpanded ? "Ocultar Detalhes" : "Ver Detalhes"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="flex-1"
          >
            Recusar
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex-1"
          >
            Aceitar Todos
          </Button>
        </div>

        {/* Footer */}
        <div className="text-xs text-muted-foreground text-center">
          Ao continuar, você concorda com nossa{" "}
          <a 
            href="/politica-privacidade" 
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  )
} 