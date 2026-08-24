'use client'
import React, { createContext, useContext, useState, useRef, useCallback } from 'react'

const LoadingContext = createContext(undefined)

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const visitedPagesRef = useRef(new Set())
    const loadingTimeoutRef = useRef(null)

    const setLoading = useCallback((loading) => {
        if (loading) {
            // Only show loader after a delay to avoid flicker for cached pages
            loadingTimeoutRef.current = setTimeout(() => {
                setIsLoading(true)
            }, 150) // 150ms delay
        } else {
            // Cancel showing loader if page loads quickly
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current)
                loadingTimeoutRef.current = null
            }
            setIsLoading(false)
        }
    }, [])

    const isPageVisited = useCallback((path) => {
        return visitedPagesRef.current.has(path)
    }, [])

    const markPageAsVisited = useCallback((path) => {
        visitedPagesRef.current.add(path)
    }, [])

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading, isPageVisited, markPageAsVisited }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext)
    if (context === undefined) {
        throw new Error('useLoading must be used within LoadingProvider')
    }
    return context
}

