import React, { useState, useEffect } from 'react'
import { User, Bell, Lock, Eye, EyeOff } from 'lucide-react'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/auth'
import { getCurrencyOverride, setCurrencyOverride } from '../utils/formatResponse'

export default function Settings() {
  const { user, logout } = useAuth()
  const [profile, setProfile] = useState(user || {})
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [activeTab, setActiveTab] = useState('profile')
  const [currency, setCurrency] = useState(getCurrencyOverride())

  useEffect(() => {
    setProfile(user || {})
  }, [user])

  const handleSaveProfile = () => {
    setSaveMessage('Profile updated successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleChangePassword = () => {
    if (password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    setSaveMessage('Password changed successfully!')
    setPassword('')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleCurrencyChange = (event) => {
    const nextCurrency = event.target.value
    setCurrency(nextCurrency)
    setCurrencyOverride(nextCurrency)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex gap-4 px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-4 font-medium border-b-2 whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-whatsapp-green text-whatsapp-green'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <User className="inline mr-2" size={18} />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-4 font-medium border-b-2 whitespace-nowrap ${
                  activeTab === 'notifications'
                    ? 'border-whatsapp-green text-whatsapp-green'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <Bell className="inline mr-2" size={18} />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-4 font-medium border-b-2 whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'border-whatsapp-green text-whatsapp-green'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <Lock className="inline mr-2" size={18} />
                Security
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {saveMessage && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    {saveMessage}
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-whatsapp-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {profile.name?.[0] || 'U'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{profile.name}</h3>
                    <p className="text-gray-600">{profile.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profile.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.email || ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={currency}
                      onChange={handleCurrencyChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                    >
                      <option value="">Automatic (browser location)</option>
                      <option value="GBP">British Pound (GBP)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="ZAR">South African Rand (ZAR)</option>
                      <option value="AUD">Australian Dollar (AUD)</option>
                      <option value="CAD">Canadian Dollar (CAD)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="bg-whatsapp-green text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive order updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-whatsapp-green rounded" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">SMS Notifications</h3>
                    <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-whatsapp-green rounded" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Marketing Emails</h3>
                    <p className="text-sm text-gray-600">Receive promotions and offers</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-whatsapp-green rounded" />
                </div>

                <button className="w-full bg-whatsapp-green text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
                  Save Preferences
                </button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                {saveMessage && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    {saveMessage}
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Change Password</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green"
                    />
                  </div>

                  <button
                    onClick={handleChangePassword}
                    className="bg-whatsapp-green text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
                  >
                    Update Password
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Active Sessions</h3>
                  <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">Current Session</p>
                      <p className="text-sm text-gray-600">This browser</p>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        window.location.href = '/console/login'
                      }}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
