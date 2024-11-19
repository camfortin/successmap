import { Stage } from '../types';

export const stages: Stage[] = [
  {
    id: 1,
    title: 'Identify',
    description: 'Define your current situation and desired outcomes',
    icon: 'search',
    subsections: [
      {
        id: 1,
        title: 'Outcome to achieve',
        prompt: 'What specific outcome are you trying to achieve?'
      },
      {
        id: 2,
        title: 'Goal importance',
        prompt: 'Why is this goal important to you?'
      },
      {
        id: 3,
        title: 'Success vision',
        prompt: 'What would success look like?'
      }
    ]
  },
  {
    id: 2,
    title: 'Uncover',
    description: 'Discover underlying motivations and barriers',
    icon: 'lightbulb',
    subsections: [
      {
        id: 1,
        title: 'Potential obstacles',
        prompt: 'What obstacles might prevent you from achieving this goal?'
      },
      {
        id: 2,
        title: 'Available resources',
        prompt: 'What resources do you currently have?'
      },
      {
        id: 3,
        title: 'Required support',
        prompt: 'What additional support might you need?'
      }
    ]
  },
  {
    id: 3,
    title: 'Validate',
    description: 'Test assumptions and gather feedback',
    icon: 'check-circle',
    subsections: [
      {
        id: 1,
        title: 'Progress metrics',
        prompt: 'How will you measure progress?'
      },
      {
        id: 2,
        title: 'Success indicators',
        prompt: 'What evidence will show you\'re on the right track?'
      },
      {
        id: 3,
        title: 'Feedback sources',
        prompt: 'Who can provide valuable feedback?'
      }
    ]
  },
  {
    id: 4,
    title: 'Understand',
    description: 'Gain deeper insights and patterns',
    icon: 'brain',
    subsections: [
      {
        id: 1,
        title: 'Observed patterns',
        prompt: 'What patterns have you noticed so far?'
      },
      {
        id: 2,
        title: 'Self-discovery',
        prompt: 'What have you learned about yourself?'
      },
      {
        id: 3,
        title: 'Future application',
        prompt: 'How might these insights help you moving forward?'
      }
    ]
  },
  {
    id: 5,
    title: 'Explore',
    description: 'Create action plans and next steps',
    icon: 'compass',
    subsections: [
      {
        id: 1,
        title: 'Next actions',
        prompt: 'What specific actions will you take next?'
      },
      {
        id: 2,
        title: 'Momentum plan',
        prompt: 'How will you maintain momentum?'
      },
      {
        id: 3,
        title: 'Review schedule',
        prompt: 'When will you review and adjust your plan?'
      }
    ]
  }
];