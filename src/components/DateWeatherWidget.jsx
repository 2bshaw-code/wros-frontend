import React, { useEffect, useState } from 'react'
import api from '../services/api'

const weatherLabel = (code) => code === 0 ? 'Clear' : code <= 3 ? 'Cloudy' : code <= 67 ? 'Rain' : code <= 77 ? 'Snow' : 'Showers'

export const DateWeatherWidget = () => {
  const [now, setNow] = useState(new Date())
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        try {
          const response = await api.get('/system/weather', { params: { latitude: coords.latitude, longitude: coords.longitude } })
          setWeather(response.data.data)
        } catch {
          setWeather(null)
        }
      })
    }
    return () => clearInterval(timer)
  }, [])

  return <div className="date-weather-widget"><span>{now.toLocaleDateString()}</span><strong>{now.toLocaleTimeString()}</strong>{weather && <span>{weather.temperature}{weather.unit} · {weatherLabel(weather.code)}</span>}</div>
}