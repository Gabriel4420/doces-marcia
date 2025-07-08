"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import { Cookie, Shield, CheckCircle, AlertCircle } from "lucide-react"

export function CookieNotification() {
  const { toast } = useToast()
  const { consent, isLoading } = useCookieConsent()

  useEffect(() => {
    if (isLoading || !consent) return

    // Mostra notificação baseada na escolha do usuário
    const showNotification = () => {
      const { preferences } = consent
      
      if (preferences.analytics && preferences.marketing) {
        toast({
          title: "Cookies Aceitos",
          description: "Todos os cookies foram aceitos. Obrigado por nos ajudar a melhorar sua experiência!",
          duration: 4000,
        })
      } else if (preferences.analytics) {
        toast({
          title: "Cookies de Análise Aceitos",
          description: "Cookies de análise foram aceitos. Marketing foi recusado.",
          duration: 4000,
        })
      } else {
        toast({
          title: "Cookies Essenciais Apenas",
          description: "Apenas cookies essenciais foram aceitos. Algumas funcionalidades podem ser limitadas.",
          duration: 4000,
        })
      }
    }

    // Aguarda um pouco para não mostrar imediatamente após a escolha
    const timer = setTimeout(showNotification, 500)
    return () => clearTimeout(timer)
  }, [consent, isLoading, toast])

  return null
} 