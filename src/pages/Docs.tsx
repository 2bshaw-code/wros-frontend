import { BookOpen, FileText } from 'lucide-react';

const docs = [
  { title: 'Getting Started', updated: '2 days ago', category: 'Guide' },
  { title: 'API Reference', updated: '1 week ago', category: 'Reference' },
  { title: 'Authentication', updated: '3 days ago', category: 'Guide' },
  { title: 'Webhooks', updated: '5 days ago', category: 'Reference' },
];

export default function Docs() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-fg">Documentation</h2>
        <p className="mt-1 text-sm text-muted">Browse guides, references, and API docs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <div
            key={doc.title}
            className="rounded-xl border border-border bg-card p-5 shadow-sm flex items-start gap-4 hover:border-accent transition-colors cursor-pointer"
          >
            <div className="mt-0.5 p-2 rounded-lg bg-accent/10 text-accent flex-shrink-0">
              {doc.category === 'Guide' ? (
                <BookOpen size={18} />
              ) : (
                <FileText size={18} />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-fg">{doc.title}</p>
              <p className="text-xs text-muted mt-0.5">
                {doc.category} · Updated {doc.updated}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
