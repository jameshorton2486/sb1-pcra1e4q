import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Gavel, Mic, Video, Edit3, 
  CheckCircle, Shield, Clock, Users,
  Laptop, FileText, Settings, BookOpen
} from 'lucide-react';

const roleData = {
  attorney: {
    title: "Attorney",
    icon: Gavel,
    description: "Lead and manage legal proceedings with advanced digital tools designed specifically for attorneys.",
    responsibilities: [
      "Conduct remote and in-person depositions",
      "Review and annotate real-time transcripts",
      "Manage case exhibits and documentation",
      "Collaborate with legal team members"
    ],
    features: [
      {
        icon: Clock,
        title: "Real-Time Access",
        description: "View and annotate transcripts in real-time during depositions"
      },
      {
        icon: FileText,
        title: "Advanced Search",
        description: "Powerful search capabilities across all case documents and transcripts"
      },
      {
        icon: Shield,
        title: "Secure Sharing",
        description: "Share exhibits and transcripts securely with team members"
      },
      {
        icon: Users,
        title: "Team Collaboration",
        description: "Seamless collaboration tools for your entire legal team"
      }
    ],
    workflows: [
      {
        title: "Remote Deposition",
        steps: [
          "Schedule deposition through the platform",
          "Upload and organize exhibits",
          "Conduct deposition with real-time transcript",
          "Review and annotate transcript",
          "Share with team members"
        ]
      },
      {
        title: "Document Review",
        steps: [
          "Access case materials",
          "Search across multiple documents",
          "Add annotations and comments",
          "Generate reports and summaries",
          "Export in preferred format"
        ]
      }
    ],
    permissions: [
      "Full access to case management",
      "Exhibit upload and management",
      "Real-time transcript viewing and annotation",
      "Team member collaboration tools",
      "Advanced reporting and analytics"
    ]
  },
  court_reporter: {
    title: "Court Reporter",
    icon: Mic,
    description: "Leverage AI-powered tools to deliver accurate, timely transcripts with enhanced efficiency.",
    responsibilities: [
      "Capture accurate real-time transcription",
      "Manage audio recordings and backups",
      "Process and finalize transcripts",
      "Maintain professional dictionaries"
    ],
    features: [
      {
        icon: Laptop,
        title: "AI-Enhanced Transcription",
        description: "Advanced AI tools to improve accuracy and speed"
      },
      {
        icon: Settings,
        title: "Custom Dictionary",
        description: "Personalized terminology and case-specific dictionaries"
      },
      {
        icon: Clock,
        title: "Real-Time Editing",
        description: "Edit and mark transcripts during live sessions"
      },
      {
        icon: Shield,
        title: "Secure Backup",
        description: "Automatic backup of all recordings and transcripts"
      }
    ],
    workflows: [
      {
        title: "Live Transcription",
        steps: [
          "Set up equipment and test audio",
          "Configure case-specific dictionary",
          "Capture real-time transcription",
          "Mark items for review",
          "Process final transcript"
        ]
      },
      {
        title: "Post-Processing",
        steps: [
          "Review marked segments",
          "Apply AI enhancements",
          "Perform quality checks",
          "Generate final document",
          "Secure delivery to parties"
        ]
      }
    ],
    permissions: [
      "Full transcription tool access",
      "Audio recording management",
      "Dictionary customization",
      "Quality control tools",
      "Direct client communication"
    ]
  },
  videographer: {
    title: "Videographer",
    icon: Video,
    description: "Capture and manage high-quality video recordings with advanced synchronization and processing tools.",
    responsibilities: [
      "Record high-quality deposition video",
      "Manage multiple camera setups",
      "Process and enhance audio/video",
      "Deliver synchronized recordings"
    ],
    features: [
      {
        icon: Settings,
        title: "Multi-Camera Control",
        description: "Manage multiple camera angles seamlessly"
      },
      {
        icon: Clock,
        title: "Auto-Sync",
        description: "Automatic synchronization with transcript"
      },
      {
        icon: Shield,
        title: "Secure Storage",
        description: "Encrypted cloud storage for all recordings"
      },
      {
        icon: FileText,
        title: "Enhanced Processing",
        description: "Professional-grade video processing tools"
      }
    ],
    workflows: [
      {
        title: "Video Recording",
        steps: [
          "Setup and test equipment",
          "Configure recording parameters",
          "Monitor multiple feeds",
          "Process recordings",
          "Generate synchronized output"
        ]
      },
      {
        title: "Post-Production",
        steps: [
          "Import raw footage",
          "Apply enhancements",
          "Sync with transcript",
          "Generate final formats",
          "Secure delivery"
        ]
      }
    ],
    permissions: [
      "Video recording tools access",
      "Multi-camera management",
      "Processing and enhancement tools",
      "Storage management",
      "Delivery system access"
    ]
  },
  scopist: {
    title: "Scopist",
    icon: Edit3,
    description: "Edit and perfect transcripts with AI-assisted tools and quality control features.",
    responsibilities: [
      "Review and edit transcripts",
      "Maintain formatting consistency",
      "Research technical terminology",
      "Ensure accuracy and quality"
    ],
    features: [
      {
        icon: BookOpen,
        title: "AI Assistance",
        description: "Smart suggestions and error detection"
      },
      {
        icon: Shield,
        title: "Quality Control",
        description: "Comprehensive quality assurance tools"
      },
      {
        icon: Users,
        title: "Collaboration",
        description: "Direct communication with reporters"
      },
      {
        icon: Settings,
        title: "Custom Tools",
        description: "Personalized editing environment"
      }
    ],
    workflows: [
      {
        title: "Transcript Editing",
        steps: [
          "Receive transcript assignment",
          "Review AI suggestions",
          "Apply manual corrections",
          "Verify technical terms",
          "Submit for final review"
        ]
      },
      {
        title: "Quality Assurance",
        steps: [
          "Run automated checks",
          "Review flagged segments",
          "Verify formatting",
          "Generate QA report",
          "Submit final version"
        ]
      }
    ],
    permissions: [
      "Full editing tool access",
      "AI assistance features",
      "Quality control tools",
      "Research resources",
      "Reporter communication"
    ]
  }
};

export function RoleDetails() {
  const { role } = useParams<{ role: keyof typeof roleData }>();
  const data = role ? roleData[role] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Role not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Link to="/" className="text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <Icon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 text-lg">{data.description}</p>
            </section>

            {/* Features */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <feature.icon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Workflows */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Workflows</h2>
              <div className="space-y-6">
                {data.workflows.map((workflow, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{workflow.title}</h3>
                    <ol className="space-y-3">
                      {workflow.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-3">
                            {stepIndex + 1}
                          </span>
                          <span className="text-gray-600">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Responsibilities */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Main Responsibilities</h2>
              <ul className="space-y-3">
                {data.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Permissions */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Access & Permissions</h2>
              <ul className="space-y-3">
                {data.permissions.map((permission, index) => (
                  <li key={index} className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{permission}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}