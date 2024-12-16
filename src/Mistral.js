const { HfInference } = require("@huggingface/inference");

const client = new HfInference("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");

async function main() {
  const chatCompletion = await client.chatCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.3",
    messages: [
      {
        role: "user",
        content: "Take the following promts as input and talk like me,1)Yo!man whatsup?how is your day,huh 2)Huh son of a ! the day sucks man 3)Yoo! how are you buddy, cool man; this is how i talk, so frame 4 sentences like me"
      }
    ],
    max_tokens: 500
  });

  console.log(chatCompletion.choices[0].message);
}

main().catch(console.error);
