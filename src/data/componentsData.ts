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
      {
        name: 'Masonry Cards',
        type: 'card',
        description:
          'A Pinterest-style masonry layout displaying images as cards in a responsive grid.',
        props: [],
        dependencies: ['react'],
        example: `<MasonryCards />`,
        source: `import MasonryCards from './library/cards/MasonryCards/MasonryCards';`,
      },
      {
        name: 'Card Swiper',
        type: 'card',
        description:
          'A swipeable card deck. Drag the top card left or right with your mouse to send it to the back of the deck. Built with dnd-kit and supports images from the MasonryCard assets.',
        props: [],
        dependencies: ['react', '@dnd-kit/core'],
        example: `<CardSwiper />`,
        source: `import CardSwiper from './library/cards/CardSwiper/CardSwiper';`,
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
      {
        name: 'Glass Button',
        type: 'button',
        description:
          'A modern glassmorphic button with animated gradients, blur, and interactive shadow effects. Styled with advanced CSS for a frosted glass look.',
        props: [
          {
            property: 'label',
            type: 'string',
            default: 'Glassy',
            description: 'Text to display on the button.',
          },
        ],
        dependencies: ['react'],
        example: `<GlassButton label="Generate" />`,
        source: `import GlassButton from './library/buttons/GlassButton';`,
      },
    ],
  },
  {
    section: 'Text Animations',
    components: [
      {
        name: 'Infinite Loop Text',
        type: 'text-animation',
        description:
          'A text animation component that loops a phrase infinitely along a circular SVG path. The text smoothly animates around the path, creating a seamless infinite loop effect.',
        props: [
          {
            property: 'text',
            type: 'string',
            default: 'Looping text around a path!',
            description: 'The phrase to display looping around the path.',
          },
          {
            property: 'duration',
            type: 'number',
            default: '10',
            description: 'Seconds for a full loop animation.',
          },
        ],
        dependencies: ['react'],
        example: `<InfiniteLoopText text="Looping text around a path!" duration={10} />`,
        source: `import InfiniteLoopText from './library/textAnimations/InfiniteLoopText/InfiniteLoopText';`,
      },
      {
        name: 'Gradient Text',
        type: 'text-animation',
        description:
          'A text component that displays its content with a beautiful CSS gradient. Multiple gradient color variations are available as a prop.',
        props: [
          {
            property: 'text',
            type: 'string',
            default: 'Gradient Text',
            description: 'The text to display with the gradient.',
          },
          {
            property: 'variant',
            type: '"sunset" | "aqua" | "rainbow" | "fire" | "purple"',
            default: 'sunset',
            description: 'The gradient color style to use.',
            inputType: 'select',
            options: ['sunset', 'aqua', 'rainbow', 'fire', 'purple'],
          },
          {
            property: 'animate',
            type: 'boolean',
            default: 'false',
            description: 'Whether the gradient should animate.',
            inputType: 'checkbox',
          },
        ],
        dependencies: ['react'],
        example: `<GradientText text="Gradient Text" variant="sunset" animate={true} />`,
        source: `import GradientText from './library/textAnimations/GradientText/GradientText';`,
      },
    ],
  },
  {
    section: 'Backgrounds',
    components: [
      {
        name: 'Liquid Metal',
        type: 'background',
        description:
          'A canvas-based animated background that simulates a flowing, liquid metal effect. Smooth gradients and metallic blobs move and blend, creating a futuristic, organic look. Fully responsive and lightweight. All parameters are adjustable for live preview.',
        props: [
          {
            property: 'patternScale',
            type: 'number',
            default: '2.5',
            description:
              'Scale of the metallic pattern (higher = more stripes).',
            inputType: 'number',
            min: 0.5,
            max: 8,
            step: 0.1,
          },
          {
            property: 'refraction',
            type: 'number',
            default: '0.015',
            description: 'Amount of metallic refraction/distortion.',
            inputType: 'number',
            min: 0,
            max: 0.1,
            step: 0.001,
          },
          {
            property: 'edge',
            type: 'number',
            default: '0.9',
            description: 'Edge sharpness of the liquid metal effect.',
            inputType: 'number',
            min: 0.1,
            max: 2,
            step: 0.01,
          },
          {
            property: 'patternBlur',
            type: 'number',
            default: '0.0055',
            description: 'Blur amount for the metallic pattern.',
            inputType: 'number',
            min: 0,
            max: 0.05,
            step: 0.0001,
          },
          {
            property: 'liquid',
            type: 'number',
            default: '0.08',
            description: 'Amount of liquid distortion (wobbliness).',
            inputType: 'number',
            min: 0,
            max: 0.2,
            step: 0.001,
          },
          {
            property: 'speed',
            type: 'number',
            default: '0.075',
            description: 'Animation speed of the liquid metal.',
            inputType: 'number',
            min: 0.01,
            max: 2,
            step: 0.01,
          },
        ] as ComponentParameter[],
        dependencies: ['react'],
        example: `<LiquidMetalBackground patternScale={2.5} refraction={0.015} edge={0.9} patternBlur={0.0055} liquid={0.08} speed={0.075} />`,
        source: `import LiquidMetalBackground from './library/backgrounds/LiquidMetal/LiquidMetalBackground';`,
      },
    ],
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
