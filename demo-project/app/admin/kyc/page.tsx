'use client';

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Loader2,
    Eye,
    CheckCircle,
    XCircle,
    Filter,
    Building2,
    Calendar,
    Briefcase,
    ShieldCheck,
    Download
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";

interface KYCRequest {
    id: string;
    fullName: string;
    contact: string;
    companyName?: string; // We'll add this to the request object in API if needed, or it's implied
    industryType: string;
    businessNature: string;
    panNumber: string;
    websiteLink: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
}

export default function KYCAdminPage() {
    const [requests, setRequests] = useState<KYCRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState<KYCRequest | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [updating, setUpdating] = useState<string | null>(null);

    useEffect(() => {
        fetchRequests();
    }, [filterStatus]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const url = filterStatus ? `/api/admin/kyc?status=${filterStatus}` : '/api/admin/kyc';
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setRequests(data);
        } catch (error) {
            toast.error('Failed to load KYC requests');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        setUpdating(id);
        try {
            const res = await fetch(`/api/admin/kyc/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (!res.ok) throw new Error('Update failed');
            toast.success(`Request ${newStatus.toLowerCase()} successfully`);
            fetchRequests();
            if (selectedRequest?.id === id) setSelectedRequest(null);
        } catch (error) {
            toast.error('Failed to update status');
        } finally {
            setUpdating(null);
        }
    };

    const handleExport = () => {
        if (requests.length === 0) {
            toast.error('No data to export');
            return;
        }

        const headers = [
            'ID', 'Full Name', 'Email', 'Company Name', 'Contact',
            'Industry', 'Business Nature', 'PAN', 'Website',
            'Status', 'Created At'
        ];

        const csvRows = [
            headers.join(','),
            ...requests.map(req => [
                req.id,
                `"${req.fullName || ''}"`,
                `"${req.user?.email || 'N/A'}"`,
                `"${req.companyName || ''}"`,
                req.contact,
                `"${req.industryType || ''}"`,
                `"${req.businessNature || ''}"`,
                req.panNumber,
                `"${req.websiteLink || ''}"`,
                req.status,
                new Date(req.createdAt).toLocaleDateString()
            ].join(','))
        ];

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `kyc_requests_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Data exported successfully');
    };

    if (loading && requests.length === 0) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                        KYC & Onboarding Requests
                    </h1>
                    <p className="text-gray-500 font-medium">Manage and verify business merchant applications.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleExport}
                        variant="outline"
                        className="flex items-center gap-2 border-gray-100 shadow-sm rounded-xl h-10 font-bold text-gray-600 hover:bg-gray-50"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>

                    <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                        <Filter className="w-4 h-4 ml-2 text-gray-400" />
                        <select
                            className="bg-transparent border-none text-sm font-bold text-gray-600 focus:ring-0 cursor-pointer pr-8"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">All Applications</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-gray-100">
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Business Details</TableHead>
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Industry & Nature</TableHead>
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">PAN Status</TableHead>
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Current Status</TableHead>
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="py-20 text-center">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No applications found</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            requests.map((req) => (
                                <TableRow key={req.id} className="hover:bg-gray-50/30 transition-colors group">
                                    <TableCell className="px-8 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                                                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                                                {req.companyName || req.fullName}
                                            </span>
                                            <span className="text-[11px] font-medium text-gray-400 capitalize">{req.fullName} • {req.user?.email || 'Guest User'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 py-5 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tighter bg-blue-50/50 border-blue-100/50 text-blue-600">
                                                {req.industryType}
                                            </Badge>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{req.businessNature}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-8 py-5 text-center">
                                        <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200 uppercase tracking-widest">
                                            {req.panNumber}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-8 py-5 text-center">
                                        <Badge className={`
                                            text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full
                                            ${req.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                req.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                                    'bg-amber-50 text-amber-600 border border-amber-100'}
                                        `}>
                                            {req.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-9 w-9 p-0 rounded-full hover:bg-blue-50 text-blue-600"
                                                onClick={() => setSelectedRequest(req)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            {req.status === 'PENDING' && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-9 w-9 p-0 rounded-full hover:bg-emerald-50 text-emerald-600"
                                                        onClick={() => updateStatus(req.id, 'APPROVED')}
                                                        disabled={updating === req.id}
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-9 w-9 p-0 rounded-full hover:bg-rose-50 text-rose-600"
                                                        onClick={() => updateStatus(req.id, 'REJECTED')}
                                                        disabled={updating === req.id}
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Application Detail Dialog */}
            <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
                <DialogContent className="max-w-xl rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight">Application Review</DialogTitle>
                        </div>
                        <p className="text-blue-100 font-medium">Verify all submitted business information for onboarding.</p>
                    </div>

                    <div className="p-8 space-y-8">
                        {selectedRequest && (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Name</p>
                                    <p className="font-bold text-gray-900">{selectedRequest.companyName || 'N/A'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</p>
                                    <p className="font-bold text-gray-900">{selectedRequest.fullName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</p>
                                    <p className="font-bold text-gray-900">{selectedRequest.contact}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Industry</p>
                                    <p className="font-bold text-gray-900">{selectedRequest.industryType}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Business Nature</p>
                                    <p className="font-bold text-gray-900">{selectedRequest.businessNature}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PAN Number</p>
                                    <p className="font-mono font-bold text-blue-600 uppercase tracking-widest">{selectedRequest.panNumber}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Website</p>
                                    <p className="font-bold text-gray-900 truncate">{selectedRequest.websiteLink || 'Not provided'}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="bg-gray-50 p-6 flex gap-3 sm:justify-start border-t border-gray-100">
                        {selectedRequest?.status === 'PENDING' ? (
                            <>
                                <Button
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl h-12 flex-1 shadow-lg shadow-emerald-200"
                                    onClick={() => updateStatus(selectedRequest.id, 'APPROVED')}
                                    disabled={updating === selectedRequest.id}
                                >
                                    Approve Merchant
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-rose-200 text-rose-600 hover:bg-rose-50 font-black uppercase tracking-widest text-[10px] rounded-xl h-12 flex-1"
                                    onClick={() => updateStatus(selectedRequest.id, 'REJECTED')}
                                    disabled={updating === selectedRequest.id}
                                >
                                    Reject Application
                                </Button>
                            </>
                        ) : (
                            <Button
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] rounded-xl h-12"
                                onClick={() => setSelectedRequest(null)}
                            >
                                Close Details
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
