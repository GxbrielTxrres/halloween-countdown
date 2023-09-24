import { useControls } from "leva";

const useTextControls = () => {
	const { fontSize, p, ...textControls } = useControls(
		"Text",
		{
			p: { value: { x: 0, y: 0, z: 0 }, step: 0.1, max: 10, min: -10 },
			color: "#ffffff",

			fontSize: { value: 1, min: 0, max: 2, step: 0.01 },
			maxWidth: { value: 1, min: 0, max: 1000, step: 1 },
			lineHeight: { value: 1, min: 0, max: 32, step: 0.1 },
			letterSpacing: { value: 1, min: 0, max: 10, step: 0.01 },

			textAlign: {
				value: "undefined",
				options: ["center", "left", "right", "justify"],
			},

			// font: "", // Default as empty string for input

			anchorX: {
				value: "center",
				options: ["center", "left", "right"],
			},

			anchorY: {
				value: "middle",
				options: [
					"bottom",
					"top",
					"middle",
					"top-baseline",
					"bottom-baseline",
				],
			},

			clipRect: { value: [0, 0, 0, 0] }, // Default to array of zeros for 4-sided rectangle

			depthOffset: { value: 0, min: -100, max: 100, step: 0.5 },

			direction: {
				value: "auto",
				options: ["auto", "ltr", "rtl"],
			},

			overflowWrap: {
				value: "normal",
				options: ["normal", "break-word"],
			},

			whiteSpace: {
				value: "normal",
				options: ["normal", "nowrap", "overflowWrap"],
			},

			outlineWidth: { value: 0, min: 0, max: 2, step: 0.01 },
			outlineOffsetX: { value: 0, max: 20, min: 0, step: 0.5 },
			outlineOffsetY: { value: 0, max: 20, min: 0, step: 0.5 },
			outlineBlur: { value: 0, max: 20, min: 0, step: 0.5 },
			outlineColor: "#ffffff",
			outlineOpacity: { value: 1, min: 0, max: 1, step: 0.1 },

			strokeWidth: { value: 1, min: 0, max: 50, step: 0.5 },
			strokeColor: "#ffffff",
			strokeOpacity: { value: 1, min: 0, max: 1, step: 0.1 },
			font: "",
			fillOpacity: { value: 1, min: 0, max: 1, step: 0.1 },
		},
		{ collapsed: true },
	);
	return { fontSize, p, ...textControls };
};

const useTransformControls = () => {
	const { visible, scale, position, rotation } = useControls(
		"Transform Model",
		{
			visible: true,
			scale: { value: 1, step: 0.05, max: 1, min: 0 },
			position: {
				value: { x: 0, y: 0, z: 0 },
				step: 0.1,
				max: 20,
				min: -20,
			},
			rotation: {
				value: { x: 0, y: 0, z: 0 },
				step: 0.1,
				max: Math.PI * 20,
				min: -Math.PI * 20,
			},
		},
		{ collapsed: true },
	);

	return { visible, scale, position, rotation };
};

const useTransmissionControls = () => {
	const { text, ...config } = useControls(
		"MeshTransmissionMaterial",
		{
			text: "Inter",
			backside: true,
			backsideThickness: { value: 0.3, min: 0, max: 2 },
			samples: { value: 16, min: 1, max: 32, step: 1 },
			resolution: { value: 1024, min: 64, max: 2048, step: 64 },
			transmission: { value: 1, min: 0, max: 1 },
			clearcoat: { value: 0, min: 0.1, max: 1 },
			clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
			thickness: { value: 0.3, min: 0, max: 5 },
			chromaticAberration: { value: 5, min: 0, max: 5 },
			anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
			roughness: { value: 0, min: 0, max: 1, step: 0.01 },
			distortion: { value: 0.5, min: 0, max: 4, step: 0.01 },
			distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
			temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
			ior: { value: 1.5, min: 0, max: 2, step: 0.01 },
			color: "#ff9cf5",
			gColor: "#ff7eb3",
			screenshot: button(() => {
				// Save the canvas as a *.png
				const link = document.createElement("a");
				link.setAttribute("download", "canvas.png");
				link.setAttribute(
					"href",
					document
						.querySelector("canvas")
						.toDataURL("image/png")
						.replace("image/png", "image/octet-stream"),
				);
				link.click();
			}),
		},
		{ collapsed: true },
	);

	return { text, ...config };
};

function useTiltshiftControls() {
	const { blur, ...otherProps } = useControls(
		"Tiltshift Effect",
		{
			blur: { value: 0, min: 0, max: 5, step: 0.1 },
			taper: { value: 0, min: 0, max: 1, step: 0.1 },
			start: { value: { x: 0.5, y: 0 }, min: 0, max: 1, step: 0.1 },
			end: { value: { x: 0.5, y: 1 }, min: 0, max: 1, step: 0.1 },
			samples: { value: 16, min: 0, max: 32, step: 1 },
			direction: { value: { x: 1, y: 1 }, min: 0, max: 1, step: 0.1 },
		},

		{ collapsed: true },
	);

	return { blur, ...otherProps };
}

export {
	useTextControls,
	useTransformControls,
	useTransmissionControls,
	useTiltshiftControls,
};
