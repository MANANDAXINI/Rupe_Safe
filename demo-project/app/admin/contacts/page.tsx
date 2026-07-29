'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Download, Eye, Loader2, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  service: string | null;
  message: string;
  source: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contacts');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setSubmissions(data);
    } catch {
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    setExporting(true);
    try {
      const res = await fetch('/api/admin/contacts/export');
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `contact_submissions_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Excel file downloaded');
    } catch {
      toast.error('Failed to download Excel file');
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (value: string) =>
    new Date(value).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contact Submissions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Leads from the website contact forms. Download as Excel/CSV anytime.
          </p>
        </div>
        <Button
          onClick={downloadExcel}
          disabled={exporting || loading || submissions.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Download Excel
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <MessageSquare className="w-10 h-10 mb-3 opacity-40" />
            <p className="font-medium">No contact submissions yet</p>
            <p className="text-sm mt-1">New form entries will appear here.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Service / Subject</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-slate-900">{item.name}</TableCell>
                  <TableCell>
                    <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline inline-flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {item.email}
                    </a>
                  </TableCell>
                  <TableCell>{item.phone || '—'}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {item.service || item.subject || '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {item.source?.replace('-', ' ') || 'website'}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-slate-500">
                    {formatDate(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelected(item)}
                      className="gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              Submitted {selected ? formatDate(selected.createdAt) : ''}
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Name</p>
                <p className="font-semibold text-slate-900">{selected.name}</p>
              </div>
              <div>
                <p className="text-slate-500">Email</p>
                <p className="font-semibold text-slate-900">{selected.email}</p>
              </div>
              <div>
                <p className="text-slate-500">Phone</p>
                <p className="font-semibold text-slate-900">{selected.phone || '—'}</p>
              </div>
              <div>
                <p className="text-slate-500">Service</p>
                <p className="font-semibold text-slate-900">{selected.service || '—'}</p>
              </div>
              <div>
                <p className="text-slate-500">Subject</p>
                <p className="font-semibold text-slate-900">{selected.subject || '—'}</p>
              </div>
              <div>
                <p className="text-slate-500">Message</p>
                <p className="font-medium text-slate-800 whitespace-pre-wrap bg-slate-50 rounded-xl p-3 border border-slate-100">
                  {selected.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
