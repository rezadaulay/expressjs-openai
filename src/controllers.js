import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});

export const travelGuideController = async (req, res) => {
    if (!req.body.destination_preferences || !req.body.travel_interests || !req.body.min_budget || !req.body.max_budget || !req.body.travel_dates || !req.body.period_in_days ) {
      return res.status(400).json({message: "Please fill the required fields"})
    }
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        // model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You are a Travel Guide"
          },
          {
            "role": "assistant",
            "content": "Given recomendations for user. The recommendations should consider the user's preferences and constraints to suggest suitable destinations, activities, accommodations, and transportation options. Additionally, provide information on local attractions, events, and dining options that align with the user's interests. The goal is to create a tailored travel itinerary that maximizes the user's enjoyment and fits within their specified budget and travel dates. Please generate text as Simple HTML tags only with the following <h1>,<h2>,<h3>,<h4> or <h5> for the header section, <p> for paragraphs and <ul> for list."
          },
          {
            "role": "user",
            "content": `Destination Preferences: ${req.body.destination_preferences}\nTravel Interests: ${req.body.travel_interests.join(',')}\nrange of budget: USD ${req.body.min_budget}-${req.body.max_budget}\nTravel Dates: ${req.body.travel_dates}\nPeriod: ${req.body.period_in_days} days`}
        ],
        temperature: 1,
        max_tokens: 1000,
    });
    if (completion.choices.length) {
      res.json({
        answer: completion.choices[0].message.content
      });
    } else {
      res.json(null);
    }
};