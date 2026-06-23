'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

import {
  getProjects,
  getProjectBySlug,
} from '@/lib/data-service';

/* -------------------------------------------------------------------------- */
/*                               INPUT SCHEMA                                 */
/* -------------------------------------------------------------------------- */

const ChatInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.array(
        z.object({
          text: z.string(),
        })
      ),
    })
  ),
  message: z.string(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

/* -------------------------------------------------------------------------- */
/*                               BIO TOOL                                     */
/* -------------------------------------------------------------------------- */

const getMichelleBio = ai.defineTool(
  {
    name: 'getMichelleBio',
    description:
      'Returns Michelle’s background, skills, internship experience, and philosophy.',
    inputSchema: z.void(),
    outputSchema: z.string(),
  },
  async () => {
    return `
Michelle T. Fernandez is a Bachelor of Science in Information Technology (BSIT) student at Universidad de Dagupan (2022-2026) and currently serves as a Technical Intern at Makerspace Innovhub OPC.

She holds a certification in Information Communication Technology - CSS from Mangaldan National High School (2020-2022).

She specializes in frontend and full-stack web development, UI/UX design, responsive systems, and collaborative web applications.

Technical Skills:

Frontend:
• React.js
• Next.js
• HTML
• CSS
• JavaScript
• TypeScript
• Tailwind CSS

Backend:
• Node.js
• MongoDB
• Firebase
• PHP Laravel

Design & Tools:
• Figma
• GitHub
• Responsive Design
• UI/UX Design

Other Technologies:
• Java
• REST APIs
• Socket.IO
• Authentication Systems
• SEO Optimization

Michelle believes in:
• Code with Purpose
• Continuous Learning
• User-Centered Design
• Building scalable digital experiences
`;
  }
);

/* -------------------------------------------------------------------------- */
/*                             LIST PROJECTS TOOL                             */
/* -------------------------------------------------------------------------- */

const listProjects = ai.defineTool(
  {
    name: 'listProjects',
    description: 'Returns all projects Michelle has worked on.',
    inputSchema: z.void(),
    outputSchema: z.array(
      z.object({
        title: z.string(),
        category: z.string(),
        slug: z.string(),
      })
    ),
  },
  async () => {
    const projects = await getProjects(); // ← await added
    return projects.map((project) => ({
      title: project.title,
      category: project.category,
      slug: project.slug,
    }));
  }
);

/* -------------------------------------------------------------------------- */
/*                           PROJECT DETAILS TOOL                             */
/* -------------------------------------------------------------------------- */

const getProjectDetails = ai.defineTool(
  {
    name: 'getProjectDetails',
    description: 'Returns detailed information about a project.',
    inputSchema: z.object({
      slug: z.string(),
    }),
    outputSchema: z.any(),
  },
  async ({ slug }) => {
    const project = await getProjectBySlug(slug); // ← await added
    if (!project) {
      return 'Project not found.';
    }
    return {
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription,
      techStack: project.techStack,
      impact:
        'Focused on scalable systems, responsive interfaces, modern UI/UX, and optimized user experience.',
    };
  }
);

/* -------------------------------------------------------------------------- */
/*                                SKILLS TOOL                                 */
/* -------------------------------------------------------------------------- */

const getSkills = ai.defineTool(
  {
    name: 'getSkills',
    description: 'Returns Michelle’s technical skills.',
    inputSchema: z.void(),
    outputSchema: z.object({
      frontend: z.array(z.string()),
      backend: z.array(z.string()),
      design: z.array(z.string()),
      other: z.array(z.string()),
    }),
  },
  async () => {
    return {
      frontend: [
        'React.js',
        'Next.js',
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'Tailwind CSS',
      ],
      backend: ['Node.js', 'MongoDB', 'Firebase', 'PHP Laravel'],
      design: ['Figma', 'UI/UX Design', 'Responsive Design'],
      other: [
        'GitHub',
        'Java',
        'REST APIs',
        'Socket.IO',
        'Authentication Systems',
      ],
    };
  }
);

/* -------------------------------------------------------------------------- */
/*                         INTERNSHIP SUMMARY TOOL                            */
/* -------------------------------------------------------------------------- */

const getInternshipSummary = ai.defineTool(
  {
    name: 'getInternshipSummary',
    description: 'Returns a summary of Michelle’s internship.',
    inputSchema: z.void(),
    outputSchema: z.string(),
  },
  async () => {
    return `
Michelle completed a 14-week internship at Makerspace Innovhub OPC where she gained hands-on experience in frontend systems, backend integrations, UI/UX design, responsive dashboards, SEO-focused automotive pages, and collaborative platforms.

During the internship, she contributed to projects such as:

• FlowState  
• SyncSnap  
• Automotive comparison landing pages  
• Makerspace Innovhub Website  

Her responsibilities included:

• Frontend and backend development  
• Dashboard systems  
• MongoDB integration  
• Real-time messaging using Socket.IO  
• Authentication systems  
• Task and workflow management  
• Responsive UI optimization  
• AI analytics integration  

This experience strengthened her expertise in full-stack development, scalable application architecture, collaborative systems, and AI-integrated platforms.
`;
  }
);

/* -------------------------------------------------------------------------- */
/*                              EDUCATION TOOL                              */
/* -------------------------------------------------------------------------- */

const getEducation = ai.defineTool(
  {
    name: 'getEducation',
    description: 'Returns Michelle’s educational background.',
    inputSchema: z.void(),
    outputSchema: z.object({
      tertiary: z.string(),
      secondary: z.string(),
    }),
  },
  async () => {
    return {
      tertiary: 'Bachelor of Science in Information Technology, Universidad de Dagupan (2022-2026)',
      secondary: 'Information Communication Technology - CSS, Mangaldan National High School (2020-2022)',
    };
  }
);

/* -------------------------------------------------------------------------- */
/*                       SEMINARS & CERTIFICATIONS TOOL                       */
/* -------------------------------------------------------------------------- */

const getSeminarsAndCertifications = ai.defineTool(
  {
    name: 'getSeminarsAndCertifications',
    description: 'Returns a list of Michelle’s seminars and certifications.',
    inputSchema: z.void(),
    outputSchema: z.array(z.string()),
  },
  async () => {
    return [
      'Computer Hardware Servicing NC II - TESDA',
      'Salesforce VIP Program - SMARTBRIDGE',
      'ORACLE Academy - Database Programming with SQL',
      'CCNA: Enterprise Networking, Security, and Automation',
      'Cybersecurity Essentials',
      'Introduction to Cybersecurity',
      'CCNA: Switching, Routing, and Wireless Essentials (SRWE)',
      'CCNA: Introduction to Networks (CCNAv7)',
      'Knowledge Festival 2023 - Fundamentals of Data Mining and Robotics',
      'Knowledge Festival 2024 - The Future InSite: AI Transforming Vision and Education',
      'Knowledge Festival 2025 - Emerging Technologies: Shaping the Future of Digital Innovation',
      'Build Based IRL Workshop',
      'A(I) Hybrid Collaboration and Agentic AI Development Within Governance',
    ];
  }
);


/* -------------------------------------------------------------------------- */
/*                          FALLBACK MODEL LIST                               */
/* -------------------------------------------------------------------------- */

// Try Gemini 2.5 first (best quality), then fall back to 2.0 Flash, then 1.5 Flash
const MODEL_FALLBACKS = [
  'googleai/gemini-2.5-flash',  // Gemini 2.5 Pro (experimental)
  'googleai/gemini-2.0-flash',          // Gemini 2.0 Flash
  'googleai/gemini-1.5-flash',          // Gemini 1.5 Flash
];

/* -------------------------------------------------------------------------- */
/*                                MAIN FLOW                                   */
/* -------------------------------------------------------------------------- */

export async function chatWithMishAI(input: ChatInput) {
  const { history, message } = input;

  // Try each model until one succeeds
  for (let i = 0; i < MODEL_FALLBACKS.length; i++) {
    const modelName = MODEL_FALLBACKS[i];
    try {
      const response = await ai.generate({
        model: modelName,
        system: `
You are MishAI, the AI Portfolio Assistant of Michelle T. Fernandez.

Your role is to professionally introduce Michelle’s background, technical skills, internship experience, and software development projects.

Response Style Rules:
- Keep responses clean, modern, and professional.
- Do NOT use markdown formatting like **bold**, ### headings, or excessive symbols.
- Use clean paragraph spacing.
- Keep responses conversational and natural.
- Use bullet points only for skills, technologies, or responsibilities.
- Keep answers concise but informative.
- Avoid robotic wording.
- Avoid repeating information.
- Always refer to Michelle in the third person.
- Never invent information not provided by the tools.

Michelle Information:
- BSIT student at Universidad de Dagupan
- Technical Intern at Makerspace Innovhub OPC
- Focused on frontend systems, UI/UX, full-stack development, and collaborative platforms

Guidelines:
- If users ask about projects, use listProjects first and then getProjectDetails.
- If users ask about internship experience, use getInternshipSummary.
- If users ask about technical expertise, use getSkills.
- If users ask about education, use getEducation.
- If users ask about seminars or certifications, use getSeminarsAndCertifications.
- Mention technologies, responsibilities, and achievements naturally.
- If information is unavailable, politely suggest contacting Michelle through the Contact page.

Example Response Style:

Michelle completed a 14-week internship at Makerspace Innovhub OPC where she contributed to frontend systems, backend integrations, UI/UX design, and collaborative productivity platforms.

During the internship, she worked on projects such as FlowState, SyncSnap, and automotive comparison landing pages.

Her responsibilities included:

• Developing responsive dashboard systems
• Implementing MongoDB integrations
• Building real-time messaging using Socket.IO
• Improving UI/UX consistency and workflow systems
• Creating SEO-focused automotive pages

This experience strengthened her skills in full-stack development, scalable application architecture, and modern collaborative systems.
`,
        messages: [
          ...history,
          {
            role: 'user',
            content: [{ text: message }],
          },
        ],
        tools: [
          getMichelleBio,
          listProjects,
          getProjectDetails,
          getSkills,
          getInternshipSummary,
          getEducation,
          getSeminarsAndCertifications,
        ],
      });

      return response.text || "Sorry, I couldn't generate a response right now.";
    } catch (error: any) {
      const errorMessage = error?.message || '';
      const isQuotaError =
        errorMessage.includes('429') ||
        errorMessage.includes('RESOURCE_EXHAUSTED') ||
        errorMessage.includes('Quota exceeded') ||
        errorMessage.includes('quota');

      if (isQuotaError && i < MODEL_FALLBACKS.length - 1) {
        console.warn(`Model ${modelName} quota exceeded, falling back to next model`);
        continue;
      }

      console.error(`Error with model ${modelName}:`, error);

      if (isQuotaError) {
        return `
I'm currently receiving too many requests right now.

Please wait a few moments before trying again.

Possible reasons:
• Gemini API free-tier limit reached
• Too many requests in a short time
• Temporary API quota exhaustion
`;
      }

      return `
Sorry, something went wrong while processing your request.

Please try again later.
`;
    }
  }

  return "Unable to process your request at this time. Please try again later.";
}
