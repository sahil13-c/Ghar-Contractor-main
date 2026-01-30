'use client'

import { useState } from 'react'
import { loginAdmin } from '@/actions/admin/auth.actions'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await loginAdmin(email, password)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
      
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
      </div>

      <Card
        className="relative w-full max-w-xl overflow-hidden
                   border border-orange-100
                   shadow-2xl hover:shadow-orange-200/50
                   transition-all duration-300 hover:-translate-y-1"
      >
        <CardHeader className="text-center pb-6 pt-8">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center
                       rounded-full bg-orange-100 text-4xl shadow-inner"
          >
            🏗️
          </div>

          <CardTitle className="text-3xl font-bold text-gray-900">
            Admin Login
          </CardTitle>

          <CardDescription className="text-gray-600">
            Ghar Contractor Dashboard Access
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@gharcontractor.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           focus:border-orange-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           focus:border-orange-500 transition"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base font-semibold text-white
                         bg-gradient-to-r from-orange-500 to-orange-600
                         hover:from-orange-600 hover:to-orange-700
                         shadow-lg hover:shadow-orange-500/40 transition
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>
          </form>

          <p className="mt-8 text-xs text-center text-gray-400">
            Authorized admins only
          </p>
        </CardContent>
      </Card>
    </div>
  )
}