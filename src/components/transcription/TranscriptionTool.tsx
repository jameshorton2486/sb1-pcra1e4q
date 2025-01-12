import React, { useState, useRef } from 'react';
import { Upload, Settings, FileAudio, Users, Gavel, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { transcribeAudio, type TranscriptionResult } from '../../lib/deepgram';
import { TranscriptEditor } from './TranscriptEditor';
import { exportTranscript } from '../../lib/export';

// ... (previous interfaces remain the same)

export function TranscriptionTool() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null);
  const [caseDetails, setCaseDetails] = useState<CaseDetails>({
    styling: '',
    causeNumber: '',
    courtInfo: '',
    proceedingDate: '',
    proceedingType: 'deposition'
  });
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [settings, setSettings] = useState<TranscriptionSettings>({
    utterances: true,
    smartFormat: true,
    diarization: true,
    punctuation: true,
    keywords: []
  });
  const [outputPrefs, setOutputPrefs] = useState<OutputPreferences>({
    format: 'docx',
    speakerLabels: true,
    customHeader: '',
    customFooter: ''
  });
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'upload' | 'details' | 'transcribe' | 'edit'>('upload');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['.mp3', '.wav', '.mp4', '.flac'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!validTypes.includes(fileExtension)) {
        alert('Please select a valid audio/video file (MP3, WAV, MP4, or FLAC)');
        return;
      }
      setSelectedFile(file);
      setAudioUrl(URL.createObjectURL(file));
      setStep('details');
    }
  };

  const handleParticipantAdd = () => {
    setParticipants([...participants, {
      name: '',
      role: 'other'
    }]);
  };

  const handleParticipantRemove = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleTranscribe = async () => {
    if (!selectedFile) {
      alert('Please select a file to transcribe');
      return;
    }

    setProcessing(true);
    try {
      // Extract keywords from case details and participants
      const keywords = [
        caseDetails.styling,
        ...participants.map(p => p.name),
        ...participants.map(p => p.firm || '').filter(Boolean)
      ];

      // Start transcription
      const result = await transcribeAudio(selectedFile, {
        ...settings,
        keywords: [...settings.keywords, ...keywords]
      });

      setTranscriptionResult(result);
      setStep('edit');
    } catch (error) {
      console.error('Transcription error:', error);
      alert('An error occurred during transcription');
    } finally {
      setProcessing(false);
    }
  };

  const handleSaveTranscript = async (words: TranscriptionResult['words']) => {
    if (!transcriptionResult) return;

    try {
      await exportTranscript(
        words,
        transcriptionResult.speakers || [],
        caseDetails,
        outputPrefs
      );
    } catch (error) {
      console.error('Export error:', error);
      alert('An error occurred while saving the transcript');
    }
  };

  // Render different steps based on current state
  const renderStep = () => {
    switch (step) {
      case 'upload':
        return (
          <section className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".mp3,.wav,.mp4,.flac"
                className="hidden"
              />
              <div>
                <FileAudio className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Audio File</h3>
                <p className="text-sm text-gray-500 mb-4">
                  We accept over 40 common audio file formats including MP3, WAV, FLAC, M4A, and more.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Select File
                </button>
              </div>
            </div>
          </section>
        );

      case 'details':
        return (
          <>
            {/* Previous case details and participants sections remain the same */}
            {/* Add navigation buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep('upload')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep('transcribe')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        );

      case 'transcribe':
        return (
          <>
            {/* Previous transcription settings and output preferences sections */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep('details')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleTranscribe}
                disabled={processing}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Start Transcription'
                )}
              </button>
            </div>
          </>
        );

      case 'edit':
        return transcriptionResult && (
          <TranscriptEditor
            words={transcriptionResult.words}
            speakers={transcriptionResult.speakers || []}
            audioUrl={audioUrl}
            onSave={handleSaveTranscript}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Transcription Tool</h2>
        {renderStep()}
      </div>
    </div>
  );
}