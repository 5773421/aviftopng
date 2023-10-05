import { TranslateBody } from '@/types/types';
import { OpenAIStream } from '@/utils';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { inputLanguage, keyWords, model, type} =
      (await req.json()) as TranslateBody;

    const stream = await OpenAIStream(
      inputLanguage,
      keyWords,
      model,
      // 'sk-JI95p4JkfgfyGYJF2d80E8BfE63c4fE58b92192dC7A1F1E8',
      'sk-JI95p4JkfgfyGYJF2d80E8BfE63c4fE58b92192dC7A1F1E8',
      type,
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
