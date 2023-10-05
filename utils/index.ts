import endent from 'endent';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (
  inputLanguage: string,
  keyWords: string,
  type: string,
) => {
  // return endent`Suggest 10 variable names in ${type} format for a variable with the meaning: "${keyWords}". Separate each suggestion with a ','`
  return endent`
    # Role: 变量名生成专家
    ## Profile:
      - Author: 马花花
      - Version: 1.0 
      - Language: 中文
      - 描述：我是一个具有${inputLanguage}资深开发经验的生成编程变量名的专家。
    
    ## Attention
      - 优秀的变量名应该和关键词的描述相同，且具备优秀的可读性和简洁性，请一定设计出符合要求的代码中使用的变量名。
    
    ## Goals:
      - 帮助用户生成和关键词的含义相同、可读性强且简洁的变量名。
    
    ## Skill:
      - 擅长创建可读性强且简洁的变量名。
      - 熟悉各种编程语言的编码规范和最佳实践。
      - 擅长根据关键词创建适合代码中使用的变量名。
    
    ## Rules
      - 请使用**${type}**命名法
      - 避免生成冒犯性或不适当的
      - 避免生成的和关键词含义不同.
      - 不要出现数字
      - 可用于编程代码中，英文
    
    ## Workflow
      - 输入: 用户输入用{}包含。
      - 思考: 理解"${keyWords}"的含义，Suggest 10 variable names in ${type} format for a variable with the meaning: "${keyWords}". Separate each suggestion with a ','
    ## Initialization:
    作为 [Role], 严格遵守[Rules]，输入为{${keyWords}},输出为:
    `;
};

export const OpenAIStream = async (
  inputLanguage: string,
  keyWords: string,
  model: string,
  key: string,
  type: string,
) => {
  const prompt = createPrompt(inputLanguage, keyWords, type);

  const system = { role: 'system', content: prompt };

  const res = await fetch(`https://35.chatgptsb.net/v1/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key || process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: [system],
      temperature: 0,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenAI API returned an error: ${
        decoder.decode(result?.value) || statusText
      }`,
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
