import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, Clock, DollarSign, Users, 
  Gavel, Mic, Video, Edit3,
  CheckCircle, Award, Lock, FileText,
  Wand2, Laptop, Database, Headphones,
  Zap, BookOpen, CloudLightning
} from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
}

interface RoleCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: Feature[];
  role: string;
}

function RoleCard({ icon: Icon, title, description, features, role }: RoleCardProps) {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
      onClick={() => navigate(`/roles/${role}`)}
    >
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-50 rounded-lg mr-4">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex items-center mb-3">
              <feature.icon className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-semibold text-gray-900">{feature.title}</h4>
            </div>
            <p className="text-gray-600 mb-3">{feature.description}</p>
            <ul className="space-y-2">
              {feature.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Explore {title} Tools
        </button>
      </div>
    </div>
  );
}

export function LandingPage() {
  const courtReporterFeatures: Feature[] = [
    {
      icon: Wand2,
      title: "AI-Enhanced Transcripts",
      description: "State-of-the-art AI technology for accurate, efficient transcription",
      benefits: [
        "Real-time speech-to-text with advanced speaker identification",
        "Automatic punctuation and formatting",
        "Technical terminology recognition across multiple fields",
        "Intelligent error detection and correction suggestions"
      ]
    },
    {
      icon: Laptop,
      title: "Real-Time Editing Tools",
      description: "Professional-grade editing interface for maximum efficiency",
      benefits: [
        "Synchronized audio-text alignment",
        "Collaborative editing capabilities",
        "Instant conflict resolution for multiple editors",
        "Live preview of formatting changes"
      ]
    },
    {
      icon: Database,
      title: "Custom Dictionary Support",
      description: "Comprehensive terminology management system",
      benefits: [
        "Personal and team dictionary management",
        "Case-specific terminology databases",
        "Multi-language support",
        "Cloud-synced dictionaries across devices"
      ]
    },
    {
      icon: CloudLightning,
      title: "Post Deposition Processing",
      description: "Advanced tools for final transcript preparation",
      benefits: [
        "Automated exhibit linking and indexing",
        "Built-in quality control checks",
        "Multiple output format support",
        "Secure transcript delivery system"
      ]
    }
  ];

  // Rest of the component remains the same until the roles grid
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Previous hero section remains unchanged */}
      
      {/* Updated Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Solutions for Legal Professionals</h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Comprehensive tools and features designed specifically for each role in the legal process,
          ensuring maximum efficiency and accuracy in every deposition.
        </p>
        
        <div className="grid grid-cols-1 gap-8">
          <RoleCard
            icon={Mic}
            title="Court Reporter"
            description="Empower your practice with cutting-edge AI technology and professional tools"
            role="court_reporter"
            features={courtReporterFeatures}
          />
          {/* Other role cards can be added here */}
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
    </div>
  );
}