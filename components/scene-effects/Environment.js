import { Environment, Lightformer } from "@react-three/drei";
import { Color } from "three";

export default function Env() {
	return (
		<Environment preset="night" frames={Infinity}>
			<Lightformer
				position={[-1, -2, -2]}
				color={new Color(3, 1, 0.2)}
				scale={[10, 10, 1]}
			/>
		</Environment>
	);
}
