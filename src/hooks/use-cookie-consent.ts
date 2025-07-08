"use client"

import { useState, useEffect } from "react"

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export interface CookieConsent {
  hasConsented: boolean
  preferences: CookiePreferences
  timestamp: number
}

const COOKIE_CONSENT_KEY = "cookie-consent"
const COOKIE_PREFERENCES_KEY = "cookie-preferences"

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Carrega as preferências salvas
    const loadConsent = () => {
      try {
        const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
        const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
        
        if (savedConsent && savedPreferences) {
          const consentData = JSON.parse(savedConsent)
          const preferences = JSON.parse(savedPreferences)
          setConsent({
            hasConsented: consentData.hasConsented,
            preferences,
            timestamp: consentData.timestamp
          })
        }
      } catch (error) {
        console.error("Erro ao carregar consentimento de cookies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadConsent()
  }, [])

  const acceptAll = () => {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true
    }
    
    const consentData: CookieConsent = {
      hasConsented: true,
      preferences,
      timestamp: Date.now()
    }

    saveConsent(consentData)
    setConsent(consentData)
  }

  const declineAll = () => {
    const preferences: CookiePreferences = {
      essential: true, // Cookies essenciais sempre necessários
      analytics: false,
      marketing: false
    }
    
    const consentData: CookieConsent = {
      hasConsented: true,
      preferences,
      timestamp: Date.now()
    }

    saveConsent(consentData)
    setConsent(consentData)
  }

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    if (!consent) return

    const updatedPreferences = {
      ...consent.preferences,
      ...newPreferences
    }

    const updatedConsent: CookieConsent = {
      ...consent,
      preferences: updatedPreferences,
      timestamp: Date.now()
    }

    saveConsent(updatedConsent)
    setConsent(updatedConsent)
  }

  const saveConsent = (consentData: CookieConsent) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
        hasConsented: consentData.hasConsented,
        timestamp: consentData.timestamp
      }))
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(consentData.preferences))
    } catch (error) {
      console.error("Erro ao salvar consentimento de cookies:", error)
    }
  }

  const clearConsent = () => {
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
      localStorage.removeItem(COOKIE_PREFERENCES_KEY)
      setConsent(null)
    } catch (error) {
      console.error("Erro ao limpar consentimento de cookies:", error)
    }
  }

  const hasConsented = consent?.hasConsented ?? false
  const preferences = consent?.preferences ?? {
    essential: false,
    analytics: false,
    marketing: false
  }

  return {
    consent,
    isLoading,
    hasConsented,
    preferences,
    acceptAll,
    declineAll,
    updatePreferences,
    clearConsent
  }
} 