import type { ComponentSection } from '../types/Component';
import type { ComponentParameter } from '../types/ComponentParameter';

export const componentsData: ComponentSection[] = [
  {
    section: 'Cards',
    components: [
      {
        name: 'Holographic Ticket',
        type: 'card',
        description:
          'A visually rich, interactive ticket card with a dynamic holographic effect. Features animated metal and rainbow layers, a glowing ticket background, and a 3D tilting effect based on mouse movement. All effects are rendered using canvas and CSS.',
        props: [
          {
            property: 'ticket',
            type: 'string',
            default: 'Ticket image',
            description: 'Main ticket image URL.',
            inputType: 'text',
          },
          {
            property: 'ticketBG',
            type: 'string',
            default: 'Ticket background image',
            description: 'Ticket background image URL.',
            inputType: 'text',
          },
        ] as ComponentParameter[],
        dependencies: ['gsap'],
        example: `<TicketHolographicCard />`,
        source: `import TicketHolographicCard from './library/cards/HolographicTicket/TicketHolographicCard';`,
      },
      {
        name: 'Contact Card',
        type: 'card',
        description:
          "A modern contact card component displaying a user's avatar, name, role, followers, and posts. Includes a follow button and smooth hover effects. All props have sensible defaults but can be overridden.",
        props: [
          {
            property: 'name',
            type: 'string',
            default: 'John Doe',
            description: 'Full name of the contact.',
          },
          {
            property: 'role',
            type: 'string',
            default: 'Software Engineer with a long title that might wrap',
            description: 'Role or title of the contact.',
          },
          {
            property: 'followers',
            type: 'string',
            default: '1.2K',
            description: 'Number of followers.',
          },
          {
            property: 'posts',
            type: 'string',
            default: '150',
            description: 'Number of posts.',
          },
          {
            property: 'avatar',
            type: 'string',
            default: 'studentAvatar',
            description:
              "URL for the contact's avatar image (defaults to studentAvatar image).",
          },
        ],
        dependencies: ['react', 'lucide-react'],
        example: `<ContactCard name="Jane Doe" role="Designer" followers="2.3K" posts="210" avatar="/avatar.jpg" />`,
        source: `import ContactCard from './library/cards/ContactCard/ContactCard';`,
      },
    ],
  },
  {
    section: 'Cursors',
    components: [
      {
        name: 'Black Hole Cursor',
        type: 'cursor',
        description:
          'A 3D black hole cursor effect using Three.js and a custom shader. Includes a toggle, animated distortion, and a custom cursor that expands on click.',
        props: [
          {
            property: 'backgroundUrl',
            type: 'string',
            default: 'Background Image',
            description: 'Background image URL for the effect.',
            inputType: 'text',
          },
          {
            property: 'force',
            type: 'number',
            default: '0.08',
            description: 'Distortion force for the black hole effect.',
            inputType: 'number',
            min: 0,
            max: 1,
            step: 0.01,
          },
          {
            property: 'showBlackHole',
            type: 'boolean',
            default: 'true',
            description: 'Show the black hole cursor.',
            inputType: 'checkbox',
          },
        ] as ComponentParameter[],
        dependencies: ['react', 'three', 'gsap'],
        example: `<BlackHoleCursor />`,
        source: `import BlackHoleCursor from './library/cursors/BlackHoleCursor/BlackHoleCursor';`,
      },
      {
        name: 'Magic Cursor',
        type: 'cursor',
        description:
          'A cursor that emits animated particles as you move the mouse. Highly customizable color, size, and particle count. Includes magic color variants.',
        props: [
          {
            property: 'particleCount',
            type: 'number',
            default: '1',
            description: 'Number of particles emitted per frame.',
            inputType: 'number',
            min: 1,
            max: 10,
            step: 1,
          },
          {
            property: 'particleSize',
            type: 'number',
            default: '5',
            description: 'Size of each particle in px.',
            inputType: 'number',
            min: 2,
            max: 20,
            step: 1,
          },
        ] as ComponentParameter[],
        dependencies: ['react', 'gsap'],
        example: `<ParticleCursor color="magicBlue" particleCount={1} particleSize={5} />`,
        source: `import ParticleCursor from './library/cursors/ParticleCursor/ParticleCursor';`,
      },
    ],
  },
  {
    section: 'Buttons',
    components: [
      {
        name: 'Comic Button',
        type: 'button',
        description:
          'A comic-style button component with blue, yellow, green, and red variants.',
        props: [
          {
            property: 'label',
            type: 'string',
            default: 'Button',
            description: 'Text to display on the button.',
          },
          {
            property: 'variant',
            type: '"blue" | "yellow" | "green" | "red"',
            default: '"blue"',
            description: 'Button color variant.',
            inputType: 'select',
            options: ['blue', 'yellow', 'green', 'red'],
          },
        ] as ComponentParameter[],
        dependencies: ['react'],
        example: `<ComicButton label="Click me" variant="blue" />`,
        source: `import ComicButton from './library/buttons/ComicButton';`,
      },
    ],
  },
  {
    section: 'Text Animations',
    components: [],
  },
  {
    section: 'Backgrounds',
    components: [],
  },
  {
    section: 'Effects',
    components: [
      {
        name: 'Water Mask Reveal',
        type: 'effect',
        description:
          'A customizable effect component that reveals content with a watercolor drop animation. Props allow control of radius speed, noise scale, and softness variation.',
        props: [
          {
            property: 'radiusSpeed',
            type: 'number',
            default: '0.5',
            description: 'Speed at which the reveal radius grows.',
          },
          {
            property: 'noiseScale',
            type: 'number',
            default: '6.0',
            description: 'Scale of the noise pattern for the mask edge.',
          },
          {
            property: 'softnessVariation',
            type: 'number',
            default: '0.5',
            description: 'Variation in the softness of the mask edge.',
          },
          {
            property: 'imageWidth',
            type: 'number',
            default: '9',
            description: 'Width of the revealed image plane.',
          },
          {
            property: 'imageHeight',
            type: 'number',
            default: '7',
            description: 'Height of the revealed image plane.',
          },
        ],
        dependencies: ['react', 'three', '@react-three/fiber'],
        example: `<WaterMaskReveal radiusSpeed={0.7} noiseScale={8.0} softnessVariation={0.7} imageWidth={10} imageHeight={8} />`,
        source: `import WaterMaskReveal from './library/effects/WaterMaskReveal/WaterMaskReveal';`,
      },
    ],
  },
];
