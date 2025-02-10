import OpenAI from 'openai';
import type { TextAnalysis } from '../types/analysis';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeText(content: string): Promise<TextAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a professional writing assistant. Analyze the following text and provide feedback on:
            - Emotional tone
            - Show vs tell ratio
            - Character development
            - Pacing
            - Writing style
            Respond in a structured JSON format.`
        },
        {
          role: 'user',
          content
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const analysis = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      emotionalTone: {
        primary: analysis.emotionalTone?.primary || 'neutral',
        secondary: analysis.emotionalTone?.secondary || 'neutral',
        intensity: analysis.emotionalTone?.intensity || 0
      },
      showVsTell: {
        showing: analysis.showVsTell?.showing || 50,
        telling: analysis.showVsTell?.telling || 50
      },
      characterTraits: analysis.characterTraits || [],
      suggestions: analysis.suggestions || [],
      readabilityScore: analysis.readabilityScore || 0,
      paceAnalysis: {
        score: analysis.paceAnalysis?.score || 0,
        feedback: analysis.paceAnalysis?.feedback || ''
      }
    };
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw error;
  }
}