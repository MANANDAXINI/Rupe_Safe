'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, Mail, Phone, Building2, FileText, Camera, Loader2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const { user, refresh } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        bio: '',
    });

    const [joinedDate, setJoinedDate] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/user/profile');
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        company: data.company || '',
                        bio: data.bio || '',
                    });
                    if (data.createdAt) {
                        setJoinedDate(new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
                    }
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                toast.error('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    company: formData.company,
                    bio: formData.bio,
                }),
            });

            if (res.ok) {
                toast.success('Profile updated successfully');
                await refresh(); // Refresh the auth state
            } else {
                toast.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Update profile error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Sidebar - Profile Picture & Summary */}
                        <div className="w-full md:w-1/3 space-y-6">
                            <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden rounded-[2rem]">
                                <CardContent className="p-8 text-center">
                                    <div className="relative inline-block group mb-6">
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-indigo-200 ring-4 ring-white">
                                            {formData.name?.[0]?.toUpperCase() || formData.email[0].toUpperCase()}
                                        </div>
                                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors group-hover:scale-110">
                                            <Camera className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{formData.name || 'User'}</h2>
                                    <p className="text-slate-500 font-medium mb-4">{formData.email}</p>
                                    <div className="flex justify-center gap-2">
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100">
                                            {user?.isAdmin ? 'Administrator' : 'User'}
                                        </span>
                                    </div>
                                </CardContent>
                                <div className="bg-slate-50 p-6 border-t border-slate-100">
                                    <div className="space-y-4 text-sm font-medium">
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            {formData.email}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            Joined {joinedDate || 'Recent'}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem]">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-500 text-sm">No recent activity found.</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Section - Settings Form */}
                        <div className="w-full md:w-2/3">
                            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
                                <CardHeader className="p-10 bg-white border-b border-slate-50">
                                    <CardTitle className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                                        Profile <span className="text-indigo-600">Settings</span>
                                    </CardTitle>
                                    <CardDescription className="text-lg font-medium text-slate-500 mt-2">
                                        Update your personal and business information.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-10">
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <Label className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">
                                                    <User className="w-3 h-3 text-indigo-500" />
                                                    Full Name
                                                </Label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Enter your full name"
                                                    className="bg-slate-50 border-slate-100 h-14 rounded-2xl px-6 focus-visible:ring-indigo-600 focus-visible:bg-white transition-all font-semibold text-slate-700"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">
                                                    <Phone className="w-3 h-3 text-indigo-500" />
                                                    Phone Number
                                                </Label>
                                                <Input
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+91 00000 00000"
                                                    className="bg-slate-50 border-slate-100 h-14 rounded-2xl px-6 focus-visible:ring-indigo-600 focus-visible:bg-white transition-all font-semibold text-slate-700"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">
                                                <Building2 className="w-3 h-3 text-indigo-500" />
                                                Company Name
                                            </Label>
                                            <Input
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                placeholder="Your Business Name"
                                                className="bg-slate-50 border-slate-100 h-14 rounded-2xl px-6 focus-visible:ring-indigo-600 focus-visible:bg-white transition-all font-semibold text-slate-700"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">
                                                <FileText className="w-3 h-3 text-indigo-500" />
                                                Short Bio
                                            </Label>
                                            <Textarea
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                placeholder="Tell us a bit about your business..."
                                                className="bg-slate-50 border-slate-100 min-h-[120px] rounded-2xl p-6 focus-visible:ring-indigo-600 focus-visible:bg-white transition-all font-semibold text-slate-700 resize-none"
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-slate-50">
                                            <Button
                                                type="submit"
                                                disabled={saving}
                                                className="w-full md:w-auto px-10 h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] disabled:opacity-70"
                                            >
                                                {saving ? (
                                                    <div className="flex items-center gap-2">
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Saving Changes...
                                                    </div>
                                                ) : (
                                                    'Save Profile Settings'
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
