'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@prisma/client';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2, Shield, ShieldAlert, User as UserIcon } from 'lucide-react';

interface UserTableProps {
    initialUsers: User[];
}

export function UserTable({ initialUsers }: UserTableProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const toggleRole = async (userId: string, currentStatus: boolean) => {
        setUpdatingId(userId);
        try {
            const response = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isAdmin: !currentStatus }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map(u => u.id === userId ? updatedUser : u));
                toast.success(`User role updated to ${!currentStatus ? 'Admin' : 'General User'}`);
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to update role');
            }
        } catch (error) {
            toast.error('Connection error while updating role');
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-gray-100">
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">User Profile</TableHead>
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Contact Info</TableHead>
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status & Role</TableHead>
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Admin Access</TableHead>
                            <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Join Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                <TableCell className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                                                <AvatarImage src={user.image || ''} />
                                                <AvatarFallback className={`${user.isAdmin ? 'bg-blue-600' : 'bg-gray-100'} text-white font-black text-sm`}>
                                                    {user.name?.[0]?.toUpperCase() || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-white shadow-sm ${user.isAdmin ? 'bg-blue-600' : 'bg-gray-400'}`}>
                                                {user.isAdmin ? <Shield className="w-2.5 h-2.5 text-white" /> : <UserIcon className="w-2.5 h-2.5 text-white" />}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{user.name || 'Anonymous User'}</span>
                                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Member Since 2024</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-5 text-center">
                                    <span className="text-sm font-semibold text-gray-600 lowercase bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">{user.email}</span>
                                </TableCell>
                                <TableCell className="px-8 py-5 text-center">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.isAdmin
                                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                        : 'bg-slate-50 text-slate-500 border border-slate-200'
                                        }`}>
                                        {user.isAdmin ? <ShieldAlert className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                                        {user.isAdmin ? 'Administrator' : 'Customer'}
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-5 text-center">
                                    <div className="flex justify-center items-center gap-3">
                                        {updatingId === user.id ? (
                                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                        ) : (
                                            <Switch
                                                checked={user.isAdmin}
                                                onCheckedChange={() => toggleRole(user.id, user.isAdmin)}
                                                className="data-[state=checked]:bg-blue-600"
                                            />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="px-8 py-5 text-right font-mono text-xs font-bold text-gray-400">
                                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
