import type { ComponentSection } from '../types/Component';
import type { ComponentParameter } from '../types/ComponentParameter';

export const componentsData: ComponentSection[] = [
	{
		section: "Text Animations",
		components: [
			{
				name: "Button",
				type: "button",
				description: "A customizable button component.",
				props: [
					{ property: "label", type: "string", default: '"Button"', description: "Text to display on the button." },
					{ property: "onClick", type: "() => void", default: "undefined", description: "Click event handler." },
					{ property: "variant", type: '"primary" | "secondary"', default: '"primary"', description: "Button style variant." }
				] as ComponentParameter[],
				dependencies: ["react"],
				example: `<Button label="Click me" variant="primary" />`,
				source: `export const Button = ({ label, onClick, variant = 'primary' }) => (<button className={variant} onClick={onClick}>{label}</button>);`
			},
			{
				name: "Input",
				type: "input",
				description: "A simple input field.",
				props: [
					{ property: "value", type: "string", default: '""', description: "Input value." },
					{ property: "onChange", type: "(e: React.ChangeEvent<HTMLInputElement>) => void", default: "undefined", description: "Change event handler." }
				] as ComponentParameter[],
				dependencies: ["react"],
				example: `<Input value="" onChange={fn} />`,
				source: `export const Input = ({ value, onChange }) => (<input value={value} onChange={onChange} />);`
			}
		]
	},
	{
		section: "Cards",
		components: [
			{
				name: 'Holographic Ticket',
				type: 'card',
				description: "A visually rich, interactive ticket card with a dynamic holographic effect. Features animated metal and rainbow layers, a glowing ticket background, and a 3D tilting effect based on mouse movement. All effects are rendered using canvas and CSS.",
				props: [
					{
						property: "className",
						type: "string",
						default: "",
						description: "Optional additional class names for the card container."
					}
				],
				dependencies: ["gsap"],
				example: `<TicketHolographicCard />`,
				source: `import TicketHolographicCard from './library/cards/HolographicTicket/TicketHolographicCard';`
			},
			{
				name: 'Contact Card',
				type: 'card',
				description: 'A modern contact card component displaying a user\'s avatar, name, role, followers, and posts. Includes a follow button and smooth hover effects. All props have sensible defaults but can be overridden.',
				props: [
					{ property: 'name', type: 'string', default: 'John Doe', description: 'Full name of the contact.' },
					{ property: 'role', type: 'string', default: 'Software Engineer with a long title that might wrap', description: 'Role or title of the contact.' },
					{ property: 'followers', type: 'string', default: '1.2K', description: 'Number of followers.' },
					{ property: 'posts', type: 'string', default: '150', description: 'Number of posts.' },
					{ property: 'avatar', type: 'string', default: 'studentAvatar', description: 'URL for the contact\'s avatar image (defaults to studentAvatar image).' }
				],
				dependencies: ['react', 'lucide-react'],
				example: `<ContactCard name="Jane Doe" role="Designer" followers="2.3K" posts="210" avatar="/avatar.jpg" />`,
				source: `import ContactCard from './library/cards/ContactCard/ContactCard';`
			}
		]
	},
	{
		section: "Background",
		components: [
			{
				name: "Gradient background",
				type: "background",
				description: "A background component with customizable gradient colors.",
				props: [
					{ property: "colors", type: "string[]", default: '["#fff", "#000"]', description: "Array of gradient colors." },
					{ property: "direction", type: '"to right" | "to left" | "to top" | "to bottom"', default: '"to right"', description: "Gradient direction." }
				] as ComponentParameter[],
				dependencies: ["react"],
				example: `<GradientBackground colors={["#ff7e5f", "#feb47b"]} direction="to right" />`,
				source: `export const GradientBackground = ({ colors, direction = "to right" }) => (<div style={{ background: \`linear-gradient(\${direction}, \${colors.join(", ")})\` }} />);`
			},
			{
				name: "Image background",
				type: "background",
				description: "A background component that displays an image.",
				props: [
					{ property: "src", type: "string", default: '""', description: "Image source URL." },
					{ property: "alt", type: "string", default: '""', description: "Alternative text for the image." }
				] as ComponentParameter[],
				dependencies: ["react"],
				example: `<ImageBackground src="background.jpg" alt="Background" />`,
				source: `export const ImageBackground = ({ src, alt }) => (<div style={{ backgroundImage: \`url(\${src})\`, backgroundSize: "cover" }} aria-label={alt} />);`
			}
		]
	},
	{
		section: "Cursors",
		components: [
			{
				name: 'Black Hole Cursor',
				type: 'cursor',
				description: 'A 3D black hole cursor effect using Three.js and a custom shader. Includes a toggle, animated distortion, and a custom cursor that expands on click.',
				props: [
					{ property: 'backgroundUrl', type: 'string', default: 'Background Image', description: 'Background image URL for the effect.', inputType: 'text' },
					{ property: 'force', type: 'number', default: '0.08', description: 'Distortion force for the black hole effect.', inputType: 'number', min: 0, max: 1, step: 0.01 },
					{ property: 'showBlackHole', type: 'boolean', default: 'true', description: 'Show the black hole cursor.', inputType: 'checkbox' }
				] as ComponentParameter[],
				dependencies: ['react', 'three', 'gsap'],
				example: `<BlackHoleCursor />`,
				source: `import BlackHoleCursor from './library/cursors/BlackHoleCursor/BlackHoleCursor';`
			}
		]
	}
];
