'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Required</h1>
        <p className="text-sm text-gray-500">Complete required organization and security preferences.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
        {/* General Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-gray-900">General Settings</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700">Company Name</label>
              <Input
                defaultValue="Rupexa Private Limited"
                className="h-11 bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <Input
                defaultValue="info@rupexa.in"
                className="h-11 bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Phone</label>
              <Input
                defaultValue="+1 (555) 123-4567"
                className="h-11 bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="border-t border-gray-200 pt-7">
          <h3 className="text-lg font-semibold mb-5 text-gray-900">Security Settings</h3>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-5">
              Change Password
            </Button>
            <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700 rounded-xl px-5">
              Two-Factor Authentication
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 pt-7 flex gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-white rounded-xl px-5">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}