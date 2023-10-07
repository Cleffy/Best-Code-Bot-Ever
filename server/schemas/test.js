import OpenAI from 'openai'
import dotenv  from 'dotenv'
dotenv.config()

const openai = new OpenAI({
    apiKey:process.env.OPEN_AI_APIKEY, // defaults to process.env["OPENAI_API_KEY"]
  });
  
  async function main() {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'what is 1 + 4?' }],
      model: 'gpt-3.5-turbo',
    });
  
    console.log(chatCompletion.choices);
  }
  
  main();


// async function example() {
//     const api = new ChatGPTAPI({
//       apiKey: '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'
//     })
  
//     const res = await api.sendMessage('Hello World!')
//     console.log(res.text)
//   }

//   example()