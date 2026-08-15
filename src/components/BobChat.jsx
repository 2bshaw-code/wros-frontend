import React, { useState } from 'react'
import { Bot, ImagePlus, Loader, Send, Volume2, X } from 'lucide-react'
import { useAuthStore } from '../state/authStore'
import { askBob, getBobSpeech, uploadBobImage } from '../services/api'

export const BobChat = ({ embedded = false, onClose, quickActions = [], context = null }) => {
  const user = useAuthStore((state) => state.user)
  const [history, setHistory] = useState([])
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [speaking, setSpeaking] = useState('')
  const [error, setError] = useState('')

  const getPageContext = () => {
    if (context) return context
    const heading = document.querySelector('main h1, main h2, h1, h2')?.textContent?.trim() || ''
    const consoleType = window.location.pathname.startsWith('/founder') ? 'founder' : window.location.pathname.startsWith('/console/owner') ? 'owner' : window.location.pathname.startsWith('/console/merchant') ? 'merchant' : 'public'
    return { pageUrl: window.location.href, pageTitle: document.title, sectionHeading: heading, consoleType, actionContext: 'bob-chat-prompt' }
  }

  const sendPrompt = async (nextPrompt = prompt) => {
    const text = nextPrompt.trim()
    if (!text || loading || uploading) return

    setPrompt('')
    setError('')
    setHistory((items) => [...items, { role: 'user', text }])
    setLoading(true)

    try {
      const reply = await askBob(text, user?.id, getPageContext())
      setHistory((items) => [...items, { role: 'bob', text: reply }])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  const playBobVoice = async (messageId, text) => {
    if (speaking) return
    setError('')
    setSpeaking(messageId)
    try {
      const audio = new Audio(await getBobSpeech(text))
      audio.addEventListener('error', () => setError('BOB voice playback failed'), { once: true })
      await audio.play()
    } catch (voiceError) {
      setError(voiceError.message)
    } finally {
      setSpeaking('')
    }
  }

  const uploadImage = async (event) => {
    const file = event.target.files?.[0]
    if (!file || uploading) return

    const imageId = `image-${Date.now()}`
    const previewUrl = URL.createObjectURL(file)
    setError('')
    setUploadProgress(0)
    setUploading(true)
    setHistory((items) => [...items, { id: imageId, role: 'user', image: previewUrl, uploading: true }])

    try {
      const url = await uploadBobImage(file, setUploadProgress)
      setHistory((items) => [...items.map((item) => item.id === imageId ? { ...item, image: url, uploading: false } : item), { role: 'bob', text: 'Image uploaded successfully. Tell me what you would like me to look at.' }])
    } catch (uploadError) {
      setHistory((items) => items.map((item) => item.id === imageId ? { ...item, uploading: false, uploadError: uploadError.message } : item))
      setError(uploadError.message)
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <section className={embedded ? 'bob-chat bob-chat-embedded' : 'bob-chat'}>
      <header className="bob-chat-header">
        <div className="flex items-center gap-2"><Bot size={20} /><strong>BOB AI Assistant</strong></div>
        {onClose && <button type="button" onClick={onClose} className="p-1 text-white" aria-label="Close BOB chat"><X size={18} /></button>}
      </header>
      {quickActions.length > 0 && (
        <div className="bob-quick-actions">
          {quickActions.map((action) => <button key={action.label} type="button" onClick={() => sendPrompt(action.prompt)}>{action.label}</button>)}
        </div>
      )}
      <div className="bob-history" aria-live="polite">
        {history.length === 0 && <p className="text-sm text-gray-500">Ask about products, inventory, sales, or WhatsApp messaging.</p>}
        {history.map((message, index) => message.role === 'bob' ? (
          <div key={`${message.role}-${index}`} className="bob-reply-row bob-message-enter">
            <span className="bob-avatar" aria-hidden="true"><span className="bob-avatar-ear bob-avatar-ear-left" /><span className="bob-avatar-ear bob-avatar-ear-right" /><Bot size={14} /></span>
            <div className="bob-message bob-message-bob"><span>{message.text}</span><button type="button" className="bob-voice-button" onClick={() => playBobVoice(`bob-${index}`, message.text)} disabled={speaking === `bob-${index}`} aria-label="Play BOB voice">{speaking === `bob-${index}` ? <Loader className="animate-spin" size={15} /> : <Volume2 size={15} />}</button></div>
          </div>
        ) : message.image ? <div key={message.id} className="bob-image-message bob-message-enter"><img src={message.image} alt="Uploaded chat attachment" />{message.uploading && <span>Uploading {uploadProgress}%</span>}{message.uploadError && <span className="text-red-600">{message.uploadError}</span>}</div> : <p key={`${message.role}-${index}`} className="bob-message bob-message-user">{message.text}</p>)}
        {loading && <div className="bob-reply-row bob-message-enter"><span className="bob-avatar" aria-hidden="true"><span className="bob-avatar-ear bob-avatar-ear-left" /><span className="bob-avatar-ear bob-avatar-ear-right" /><Bot size={14} /></span><p className="bob-message bob-message-bob flex items-center gap-2"><Loader className="animate-spin" size={16} /> BOB is thinking...</p></div>}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <form className="bob-composer" onSubmit={(event) => { event.preventDefault(); sendPrompt() }}>
        <label className="bob-file-picker" aria-label="Upload image"><ImagePlus size={18} /><input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadImage} disabled={uploading} /></label>
        <input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask BOB anything" aria-label="Ask BOB" />
        <button type="submit" disabled={!prompt.trim() || loading || uploading} className="bg-whatsapp-green text-white" aria-label="Send prompt"><Send size={18} /></button>
      </form>
    </section>
  )
}