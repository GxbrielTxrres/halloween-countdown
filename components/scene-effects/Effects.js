import { Bloom, EffectComposer, GodRays } from "@react-three/postprocessing";
import Backlight from "./Backlight";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Drunk from "./Drunk";
import { useThree } from "@react-three/fiber";

export default function Effects() {
	const [material, set] = useState();

	const { camera } = useThree();

	const godrays = useRef();
	const customEffect = useRef();
	let index = useRef(0);

	const positions = [
		[2.165, -3.181, 3.192],
		[-4.389, -0.0301, 2.3935],
		[0, 0, 5],
	];
	const rotations = [
		[0.783, 0.447, -0.407],
		[0.0125, -1.0715, 0.011],
		[0, 0, 5],
	];

	useEffect(() => {
		let timeout;
		const interval = setInterval(() => {
			//reset rotation
			camera.rotation.set(0, 0, 0);

			//animate shader
			gsap.to(customEffect.current.uniforms.get("progress"), {
				value: 1,
				duration: 2,
				ease: "sine.out",
				repeat: 1,
				yoyo: true,
			});

			//set camera position
			timeout = setTimeout(() => {
				camera.position.set(...positions[index.current]);
				camera.rotation.set(...rotations[index.current]);
				//increase index until it needs to be reset
				index.current >= positions.length - 1
					? (index.current = 0)
					: index.current++;
			}, 2000);
		}, 10000);

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, []);

	useEffect(() => {
		//intro animation
		if (customEffect.current) {
			gsap.to(customEffect.current.uniforms.get("progress"), {
				value: 0,
				duration: 2,
				ease: "sine.out",
			});
		}

		if (material) {
			animateGodRays(godrays.current);
		}
	}, [material]);

	return (
		<>
			<Backlight ref={set} />
			{material && (
				<EffectComposer disableNormalPass multisampling={0}>
					<Bloom
						mipmapBlur
						luminanceThreshold={0}
						intensity={4}
						levels={2}
					/>
					<GodRays
						ref={godrays}
						sun={material}
						exposure={0}
						decay={0}
						blur
					/>
					<Drunk ref={customEffect} progress={1} />
				</EffectComposer>
			)}
		</>
	);
}

function animateGodRays(ref) {
	gsap.to(ref.godRaysMaterial.uniforms.decay, {
		value: 0.8,
		duration: 4,
		ease: "power3.inOut",
	});

	gsap.to(ref.godRaysMaterial.uniforms.exposure, {
		value: 0.6,
		duration: 4,
		ease: "power3.inOut",
	});

	gsap.to(ref.godRaysMaterial.uniforms.weight, {
		value: 0.6,
		duration: 4,
		ease: "power3.inOut",
	});
}
