import { Cloud, Stars } from "@react-three/drei";
import Env from "./scene-effects/Environment";
import { Perf } from "r3f-perf";
import { Model } from "./scene-objects/Happy_halloween";
import Effects from "./scene-effects/Effects";
import CursorMask from "./scene-effects/CursorMask";

export default function Experience() {
	return (
		<>
			<Perf />
			<Env />
			<Effects />
			<color attach="background" args={["#00000f"]} />
			<Cloud depthTest={false} opacity={0.3} scale={3} />
			<Stars fade saturation={0.2} factor={0.2} />
			<Model />
			<CursorMask />
		</>
	);
}
