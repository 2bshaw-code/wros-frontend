import { Scale, FileText } from 'lucide-react';

const documents = [
  { title: 'Terms of Service', version: 'v2.1', date: 'Jan 2025' },
  { title: 'Privacy Policy', version: 'v1.4', date: 'Mar 2025' },
  { title: 'Data Processing Agreement', version: 'v1.0', date: 'Jun 2024' },
  { title: 'Cookie Policy', version: 'v1.2', date: 'Feb 2025' },
];

export default function Legal() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-fg">Legal</h2>
        <p className="mt-1 text-sm text-muted">
          Access legal documents, policies, and compliance information.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm divide-y divide-border overflow-hidden">
        {documents.map((doc) => (
          <div
            key={doc.title}
            className="flex items-center justify-between px-5 py-4 hover:bg-hover transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Scale size={18} className="text-accent flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-fg">{doc.title}</p>
                <p className="text-xs text-muted mt-0.5">
                  {doc.version} · {doc.date}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs text-accent hover:underline">
              <FileText size={14} />
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
