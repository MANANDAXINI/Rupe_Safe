'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6 shadow-sm">
        {/* General Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Company Name</label>
              <Input
                defaultValue="RupeSafe"
                className="bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <Input
                defaultValue="info@rupesafe.com"
                className="bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Phone</label>
              <Input
                defaultValue="+1 (555) 123-4567"
                className="bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Security Settings</h3>
          <div className="space-y-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Change Password
            </Button>
            <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700">
              Two-Factor Authentication
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 pt-6 flex gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-white">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}