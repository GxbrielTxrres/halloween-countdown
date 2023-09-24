import { Text } from "@react-three/drei";
import { forwardRef } from "react";
import { Color } from "three";

const Backlight = forwardRef((props, ref) => {
	return (
		<mesh
			{...props}
			ref={ref}
			scale={[7.5, 10, 1]}
			position={[0.5, -1, -5]}
		>
			<planeGeometry />
			<meshBasicMaterial color={new Color(3, 1, 0.2)} />
		</mesh>
	);
});

Backlight.displayName = "Backlight";
export default Backlight;
