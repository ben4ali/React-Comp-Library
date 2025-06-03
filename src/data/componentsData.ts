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
				name: "Alert",
				type: "alert",
				description: "A simple alert message box.",
				props: [
					{ property: "message", type: "string", default: '""', description: "Alert message." },
					{ property: "type", type: '"success" | "error"', default: '"success"', description: "Alert type." }
				] as ComponentParameter[],
				dependencies: ["react"],
				example: `<Alert message="Success!" type="success" />`,
				source: `export const Alert = ({ message, type = 'success' }) => (<div className={type}>{message}</div>);`
			},
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
	}
];
