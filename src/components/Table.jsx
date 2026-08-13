import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Table = ({
  columns,
  data,
  loading = false,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
  onRowClick,
  actions
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F0F2F5] border-b border-[#E4E6EB]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className="border-b border-[#E4E6EB] hover:bg-[#F0F2F5] transition cursor-pointer"
                >
                  {columns.map((col) => (
                    <td
                      key={`${idx}-${col.key}`}
                      className="px-6 py-4 text-sm text-gray-800"
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-[#E4E6EB] flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
