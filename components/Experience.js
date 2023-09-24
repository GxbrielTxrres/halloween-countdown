import { Cloud, OrbitControls, Stars } from "@react-three/drei";
import Env from "./scene-effects/Environment";
import { Perf } from "r3f-perf";
import { Model } from "./scene-objects/Happy_halloween";
import Effects from "./scene-effects/Effects";
import CursorMask from "./scene-effects/CursorMask";
import { useRef } from "react";

export default function Experience() {
	const ref = useRef();
	return (
		<>
			<Perf />
			<Env />
			<Effects />
			<color attach="background" args={["black"]} />
			<OrbitControls
				ref={ref}
				onEnd={() => {
					console.log(ref.current.object.position);
					console.log(ref.current.object.rotation);
				}}
			/>
			<Cloud depthTest={false} opacity={0.3} scale={2} />
			<Stars fade saturation={0.2} factor={0.2} />
			<Model />
			<CursorMask />
		</>
	);
}
