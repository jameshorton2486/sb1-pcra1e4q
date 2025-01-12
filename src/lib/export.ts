import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

interface ExportOptions {
  format: 'docx' | 'text' | 'json';
  speakerLabels: boolean;
  customHeader?: string;
  customFooter?: string;
}

interface Word {
  word: string;
  start: number;
  end: number;
  confidence: number;
  speaker?: number;
}

interface Speaker {
  id: number;
  name?: string;
}

export async function exportTranscript(
  words: Word[],
  speakers: Speaker[],
  caseDetails: any,
  options: ExportOptions
) {
  switch (options.format) {
    case 'docx':
      return exportToWord(words, speakers, caseDetails, options);
    case 'text':
      return exportToText(words, speakers, caseDetails, options);
    case 'json':
      return exportToJson(words, speakers, caseDetails);
    default:
      throw new Error(`Unsupported format: ${options.format}`);
  }
}

async function exportToWord(words: Word[], speakers: Speaker[], caseDetails: any, options: ExportOptions) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          children: [
            new TextRun({
              text: options.customHeader || `${caseDetails.styling}\nCause No. ${caseDetails.causeNumber}`,
              bold: true,
              size: 24,
            }),
          ],
        }),
        // Content
        ...words.map((word, index) => {
          const speaker = speakers.find(s => s.id === word.speaker);
          return new Paragraph({
            children: [
              options.speakerLabels && speaker ? new TextRun({
                text: `${speaker.name || `Speaker ${speaker.id}`}: `,
                bold: true,
              }) : new TextRun({ text: '' }),
              new TextRun({ text: word.word + ' ' }),
            ],
          });
        }),
        // Footer
        new Paragraph({
          children: [
            new TextRun({
              text: options.customFooter || '',
              size: 20,
            }),
          ],
        }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  saveAs(blob, `${caseDetails.styling.replace(/[^a-z0-9]/gi, '_')}_transcript.docx`);
}

function exportToText(words: Word[], speakers: Speaker[], caseDetails: any, options: ExportOptions) {
  let text = options.customHeader ? options.customHeader + '\n\n' : '';
  text += `${caseDetails.styling}\nCause No. ${caseDetails.causeNumber}\n\n`;

  words.forEach((word) => {
    if (options.speakerLabels && word.speaker) {
      const speaker = speakers.find(s => s.id === word.speaker);
      text += `${speaker?.name || `Speaker ${word.speaker}`}: `;
    }
    text += word.word + ' ';
  });

  if (options.customFooter) {
    text += '\n\n' + options.customFooter;
  }

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${caseDetails.styling.replace(/[^a-z0-9]/gi, '_')}_transcript.txt`);
}

function exportToJson(words: Word[], speakers: Speaker[], caseDetails: any) {
  const data = {
    caseDetails,
    speakers,
    words,
    metadata: {
      exportDate: new Date().toISOString(),
      wordCount: words.length,
      duration: words[words.length - 1]?.end || 0,
    },
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  saveAs(blob, `${caseDetails.styling.replace(/[^a-z0-9]/gi, '_')}_transcript.json`);
}