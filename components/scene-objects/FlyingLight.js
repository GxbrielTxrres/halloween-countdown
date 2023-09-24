import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function FlyingLight() {
	const light = useRef();

	useFrame(({ clock }) => {
		const time = clock.elapsedTime * 0.5;
		light.current.position.x = Math.sin(time) * 6;
		light.current.position.z = Math.cos(time) * 6;
	});
	return <pointLight ref={light} />;
}
