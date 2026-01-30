'use client'

import { logoutAdmin } from '@/actions/admin/auth.actions'

export default function LogoutButton() {
  return (
    <button
      onClick={() => logoutAdmin()}
      className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-sm"
    >
      Logout
    </button>
  )
}
