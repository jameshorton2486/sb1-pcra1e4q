import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, Clock, DollarSign, Users, 
  Gavel, Mic, Video, Edit3,
  CheckCircle, Award, Lock, FileText
} from 'lucide-react';

interface RoleCardProps {
  icon: React.ElementType;
  title: string;
  features: string[];
  role: string;
}

function RoleCard({ icon: Icon, title, features, role }: RoleCardProps) {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => navigate(`/roles/${role}`)}
    >
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-blue-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Legal Practice with AI-Powered Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Professional court reporting, transcription, and deposition management
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Solutions for Legal Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <RoleCard
            icon={Gavel}
            title="Attorneys"
            role="attorney"
            features={[
              "Instant transcript access",
              "Advanced search capabilities",
              "Exhibit management tools",
              "Case management integration"
            ]}
          />
          <RoleCard
            icon={Mic}
            title="Court Reporters"
            role="court_reporter"
            features={[
              "AI-enhanced transcripts",
              "Real-time editing tools",
              "Custom dictionary support",
              "Post deposition processing"
            ]}
          />
          <RoleCard
            icon={Video}
            title="Videographers"
            role="videographer"
            features={[
              "Automatic video sync",
              "Multi-camera support",
              "Enhanced audio processing",
              "Cloud storage integration"
            ]}
          />
          <RoleCard
            icon={Edit3}
            title="Scopists"
            role="scopist"
            features={[
              "AI Assistance",
              "Collaboration tools",
              "Quality assurance tools"
            ]}
          />
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      {/* Trust Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Legal Professionals</h2>
            <p className="text-gray-600">Industry-leading security and compliance standards</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600">Secure data handling and storage</p>
            </div>
            <div className="text-center">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600">Your data is always protected</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Platform</h3>
              <p className="text-gray-600">Meeting industry standards</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}