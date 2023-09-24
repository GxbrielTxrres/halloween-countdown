import {
	Environment,
	MeshPortalMaterial,
	Lightformer,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3, Color } from "three";
import { InfectedModel } from "../scene-objects/Happy_halloween";
import Halloween from "../scene-objects/Halloween";
import Countdown from "../scene-objects/Countdown";
export default function CursorMask({ vec = new Vector3() }) {
	const { viewport } = useThree();
	const cursor = useRef();

	useFrame((state, delta) => {
		cursor.current.position.lerp(
			vec.set(
				(state.mouse.x * viewport.width) / 2.65,
				(state.mouse.y * viewport.height) / 2.65,
				1.2,
			),
			0.05,
		);
	});
	return (
		<mesh ref={cursor}>
			<circleGeometry />
			<MeshPortalMaterial blend={0} worldUnits>
				<InfectedModel />
				<Environment preset="night">
					<Lightformer
						position={[-1, 0, -2]}
						color={new Color(2, 0, 2)}
						scale={[5, 10, 1]}
					/>
				</Environment>
				<Halloween
					scale={0.8}
					happyPosition={[-4, 0, 0]}
					halloweenPosition={[4, 0, 0]}
				/>
				<Countdown />
				<color args={["black"]} attach={"background"} />
			</MeshPortalMaterial>
		</mesh>
	);
}
