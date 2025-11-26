import { NextResponse } from "next/server";
import axios from "axios";

const createPrompt = (name: string, sanitizedRule: string) => {
    return `You are a CRM assistant helping to write personalized promotional messages for users. Based on the campaign details below, generate a short, friendly marketing message for each user. The message should include the user's name (placeholder as {name}) and feel personal but concise.

### Campaign Details:
- Campaign Name: ${name}
- Segment Rules: ${sanitizedRule}

### Message Style:
- Friendly and informal tone
- 1-2 sentences
- Include a benefit or incentive (e.g., discount, special offer)
- Keep it personalized with the user’s name (e.g., "Hi {name}, …")

### Example:
If the campaign name is "Loyalty Booster" and segment rule is "spend > 1000 AND visits < 20", the output could be:
"Hi {name}, thanks for being awesome! Here's 10% off your next order just for you."

### OUTPUT style:
just the message, no other text. Do not include any other information or context.
### Example:
"Hi {name}, thanks for being awesome! Here's 10% off your next order just for you."

### Now generate a message:`;
};

export async function POST(req: Request) {
    try {
        const { name, sanitizedRule } = await req.json();
        const prompt = createPrompt(name, sanitizedRule);

        const response = await axios.post(
            "https://api.together.ai/v1/chat/completions",
            {
                model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: 200,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const generatedMessage =
            response.data.choices[0]?.message?.content || "No message generated.";

        console.log("Together AI response:", generatedMessage);

        return NextResponse.json({
            success: true,
            message: generatedMessage,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: "Failed to generate message",
        });
    }
}
