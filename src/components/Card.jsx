import React from 'react'

export const Card = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue',
  description = '',
  onClick,
  className = ''
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-[#E7F5F3] text-[#0C6A60]',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm p-7 cursor-pointer hover:shadow-md transition ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
          {description && <p className="text-gray-500 text-xs mt-1">{description}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  )
}
