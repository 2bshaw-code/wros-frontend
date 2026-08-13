export default function Loading({ label = 'Loading WROS...' }: { label?: string }) {
  return <div className="grid min-h-[12rem] place-items-center text-sm text-gray-500" role="status"><span>{label}</span></div>
}