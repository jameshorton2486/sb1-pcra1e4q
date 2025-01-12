import React from 'react';
import { Layout, Grid, Box, Monitor, Smartphone } from 'lucide-react';

export function WireframeDisplay() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Application Wireframes</h1>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md">
              <Monitor className="w-5 h-5 mr-2" />
              Desktop View
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md">
              <Smartphone className="w-5 h-5 mr-2" />
              Mobile View
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Authentication Pages */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Layout className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Authentication Flow</h2>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
                <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-blue-100"></div>
                <div className="h-8 w-3/4 mx-auto mb-4 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-blue-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Layout */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Grid className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Dashboard Layout</h2>
            </div>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="flex space-x-4">
                <div className="w-1/4">
                  <div className="h-8 bg-gray-100 rounded mb-2"></div>
                  <div className="h-8 bg-gray-100 rounded mb-2"></div>
                  <div className="h-8 bg-gray-100 rounded mb-2"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-32 bg-gray-100 rounded"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-gray-100 rounded"></div>
                    <div className="h-24 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deposition Calendar */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Box className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Deposition Calendar</h2>
            </div>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-8 bg-gray-100 rounded"></div>
                ))}
              </div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Transcription Workspace */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Box className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Transcription Workspace</h2>
            </div>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-4">
                <div className="h-24 bg-gray-100 rounded"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-gray-100 rounded"></div>
                  <div className="h-10 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}