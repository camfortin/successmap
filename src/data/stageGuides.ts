interface StageGuide {
  description: string;
  questions: string[];
  bestPractices: string[];
  signsOfClarity: string;
  conversation: string[];
}

export const stageGuides: StageGuide[] = [
  {
    description: "The first step focuses on uncovering what you want more of. We'll use the concept of 'the other side of the problem' to help expand perspective.",
    questions: [
      "If the problem were solved, what would you have more of?",
      "What is the goal, and what would achieving it give you more of?"
    ],
    bestPractices: [
      "Avoid SOFA (Suggestions, Opinions, Feedback, or Advice)",
      "Stay curious and refrain from jumping to solutions"
    ],
    signsOfClarity: "Positive shifts in energy, such as relief or excitement",
    conversation: [
      "I want to get out of debt.",
      "If you didn't have debt, what would you have more of?",
      "I'd likely have more freedom.",
      "Freedom sounds really important. What would freedom feel like to you?"
    ]
  },
  {
    description: "Explore past successes where you felt or achieved what you're aiming for. Build connection and inspire confidence.",
    questions: [
      "When have you experienced something similar in the past?",
      "Think of a time you had more [freedom/confidence/etc.]; what did it look like?"
    ],
    bestPractices: [
      "Use past-tense questions to encourage reflection",
      "Focus on specific moments rather than opinions"
    ],
    signsOfClarity: "Clear descriptions of past successes, often accompanied by re-experienced positive emotions",
    conversation: [
      "I wish I had more confidence.",
      "Can you tell me about a time you felt confident recently?",
      "I'm not sure, but I think I felt confident while gardening last week.",
      "That's great! What about gardening makes you feel confident?",
      "It's something I've learned over time, and it just comes naturally."
    ]
  },
  {
    description: "Help identify the actions, steps, and strengths you used in past successes. Recognizing these builds confidence and creates actionable clarity.",
    questions: [
      "What steps did you take to overcome this challenge?",
      "What strengths or skills did you use?"
    ],
    bestPractices: [
      "Encourage articulation of actions, not just outcomes",
      "Avoid jumping to conclusions; let discoveries happen naturally"
    ],
    signsOfClarity: "User articulates detailed actions or skills, often discovering overlooked strengths",
    conversation: [
      "I'm not sure I can do this again.",
      "When you succeeded last time, what was the most important action you took?",
      "I prioritized everything with an envelope system.",
      "That sounds like great organizational skills. How did you make it work so well?"
    ]
  },
  {
    description: "Focus on understanding the impact of past actions. See the improvements you've made in yourself, others, or the world.",
    questions: [
      "Who or what improved because of what you did?",
      "What might have improved in you, others, or the world?"
    ],
    bestPractices: [
      "Give time to reflect; silence can be valuable",
      "Avoid suggesting impacts; let users discover their influence"
    ],
    signsOfClarity: "Users connect their actions to tangible or emotional improvements",
    conversation: [
      "I'm not sure if my efforts were worth it.",
      "What improved the last time you worked on something similar?",
      "I felt less stressed, and my relationships improved.",
      "It sounds like your actions had a big impact on both your life and others around you."
    ]
  },
  {
    description: "Use insights from past successes to build confidence in future actions. Help imagine new possibilities.",
    questions: [
      "Based on what you've done, what can you confidently do now?",
      "What impact could you have, given the impact you've had before?"
    ],
    bestPractices: [
      "Encourage curiosity and imaginative thinking",
      "Avoid providing solutions; let users take ownership of ideas"
    ],
    signsOfClarity: "Positive energy, new ideas, or even relaxation as confidence grows",
    conversation: [
      "I think I'm ready to try something new.",
      "What could you do based on your past successes?",
      "I could create a list system to track my goals like I used to.",
      "That's a great idea! How might that work for your current situation?"
    ]
  }
];