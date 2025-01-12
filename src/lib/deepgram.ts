import { Deepgram } from '@deepgram/sdk';

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;

if (!DEEPGRAM_API_KEY) {
  throw new Error('Missing Deepgram API key');
}

const deepgram = new Deepgram(DEEPGRAM_API_KEY);

export interface TranscriptionOptions {
  utterances?: boolean;
  smartFormat?: boolean;
  diarization?: boolean;
  punctuation?: boolean;
  keywords?: string[];
}

export interface TranscriptionResult {
  transcript: string;
  confidence: number;
  words: Array<{
    word: string;
    start: number;
    end: number;
    confidence: number;
    speaker?: number;
  }>;
  speakers?: Array<{
    id: number;
    name?: string;
  }>;
}

export async function transcribeAudio(
  audioFile: File,
  options: TranscriptionOptions = {}
): Promise<TranscriptionResult> {
  try {
    // Convert File to ArrayBuffer
    const buffer = await audioFile.arrayBuffer();

    const source = {
      buffer,
      mimetype: audioFile.type,
    };

    const response = await deepgram.transcription.preRecorded(source, {
      smart_format: options.smartFormat,
      diarize: options.diarization,
      utterances: options.utterances,
      punctuate: options.punctuation,
      keywords: options.keywords,
    });

    return {
      transcript: response.results.channels[0].alternatives[0].transcript,
      confidence: response.results.channels[0].alternatives[0].confidence,
      words: response.results.channels[0].alternatives[0].words,
      speakers: response.results.channels[0].alternatives[0].speaker_labels,
    };
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
}