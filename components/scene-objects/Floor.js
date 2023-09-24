import {
	Box,
	Environment,
	PerspectiveCamera,
	useFBO,
	useVideoTexture,
} from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import {
	LinearSRGBColorSpace,
	MeshStandardMaterial,
	Scene,
	Vector2,
} from "three";
import { useLayoutEffect, useRef, useMemo, useState, useEffect } from "react";

import CSM from "three-custom-shader-material";
import { patchShaders } from "gl-noise";
import { useControls, button } from "leva";
import gsap from "gsap";
import { render } from "react-dom";

export default function Floor() {
	// const texture = useTexture("./textures/checkerboard-8x8.png", (t) => {
	// 	t.magFilter = NearestFilter;
	// 	t.wrapS = t.wrapT = MirroredRepeatWrapping;
	// 	t.center.set(0.5, 0.5);
	// 	t.repeat.set(20, 20);
	// });

	// const { visible, scale, position, rotation } = useTransformControls();

	// useFrame(({ clock }, delta) => {
	// 	texture.rotation += delta * 0.1;
	// 	texture.center.x = Math.sin(clock.elapsedTime * 0.1);
	// 	texture.center.y = Math.cos(clock.elapsedTime * 0.1);
	// });
	const texture = useVideoTexture("./textures/vid.mp4");
	const { width, height } = useThree((state) => state.viewport);

	useLayoutEffect(() => {
		texture.colorSpace = LinearSRGBColorSpace;
	}, []);

	return (
		// <mesh position-y={-2} rotation-x={-Math.PI / 2}>
		// <mesh position={[-0.25, 0.95, 0.7]} scale={[0.11, 0.085, 1]}>
		<mesh scale={[width, height, 1]}>
			<planeGeometry />
			{/* <meshBasicMaterial map={texture} toneMapped={false} /> */}
			<FloorMaterial />
		</mesh>
	);
}

function animateShader(uniform1, uniform2) {
	gsap.to(uniform1, {
		value: 0.2,
		duration: 1,
		repeat: 1,
		yoyo: true,
		ease: "power3.inOut",
	});

	gsap.to(uniform2, {
		value: 1,
		duration: 1,
		repeat: 1,
		yoyo: true,
		ease: "power3.inOut",
	});
}

function FloorMaterial({ vec2 = new Vector2() }) {
	const material = new MeshStandardMaterial();
	const texture = useVideoTexture("./textures/vid.mp4");

	const mesh = useRef();
	const otherCamera = useRef();

	const otherScene = new Scene();
	const renderTarget = useFBO();

	const { scene } = useThree();
	const renderTarget2 = useFBO();

	useLayoutEffect(() => {
		texture.colorSpace = LinearSRGBColorSpace;
	}, []);

	//intro animation
	useEffect(() => {
		gsap.to(uniforms.current.uEffectFactor, {
			value: 0,
			duration: 4,
			ease: "sine.out",
		});
		gsap.to(uniforms.current.uDispFactor, {
			value: 0,
			duration: 4,
			ease: "sine.out",
		});
	}, []);

	useFrame((state) => {
		const { gl, clock, camera } = state;
		otherCamera.current.matrixWorldInverse.copy(camera.matrixWorldInverse);

		gl.setRenderTarget(renderTarget2);
		gl.render(scene, otherCamera.current);

		gl.setRenderTarget(null);

		gl.setRenderTarget(renderTarget);
		gl.render(otherScene, otherCamera.current);

		uniforms.current.uTexture.value = renderTarget2.texture;
		uniforms.current.uTexture2.value = renderTarget.texture;
		uniforms.current.uTime.value = state.clock.elapsedTime;

		mesh.current.rotation.x = Math.cos(clock.elapsedTime / 2);
		mesh.current.rotation.y = Math.sin(clock.elapsedTime / 2);
		mesh.current.rotation.z = Math.sin(clock.elapsedTime / 2);
		gl.setRenderTarget(null);

		vec2.set(window.innerWidth, window.innerHeight).multiplyScalar(
			Math.min(window.devicePixelRatio, 2),
		);
	});

	const { progress, effectFactor, dispFactor, zoom } = useControls({
		Progress1: button(() => {
			gsap.to(uniforms.current.uProgress, {
				value: 1,
				duration: 1.5,
				ease: "power3.inOut",
			});

			animateShader(
				uniforms.current.uDispFactor,
				uniforms.current.uEffectFactor,
			);
		}),
		Progress0: button(() => {
			gsap.to(uniforms.current.uProgress, {
				value: 0,
				duration: 2,
				ease: "power3.inOut",
			});

			animateShader(
				uniforms.current.uDispFactor,
				uniforms.current.uEffectFactor,
			);
		}),
	});

	const uniforms = useRef({
		uTexture: { value: texture },
		uTexture2: { value: renderTarget.texture },
		uEffectFactor: { value: 0.5 },
		uDispFactor: { value: 1 },
		uProgress: { value: 0 },
		uTime: { value: 0 },
		uWinResolution: {
			value: new Vector2(
				window.innerWidth,
				window.innerHeight,
			).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
		},
	});

	const vertexShader = useMemo(
		() => /* glsl */ `
        varying vec2 custom_vUv;
        uniform float uProgress;
		uniform float uTime;

        void main() {
          custom_vUv = uv;
		  
	

        }
      `,
		[],
	);

	const fragmentShader = useMemo(
		() =>
			patchShaders(/* glsl */ `
          varying vec2 custom_vUv;
          uniform float uProgress;
		  uniform float uEffectFactor;
		  uniform float uDispFactor;
		  uniform sampler2D uTexture;
		  uniform sampler2D uTexture2;
		  uniform vec2 uWinResolution;

		  vec4 fromLinear(vec4 linearRGB) {
			bvec3 cutoff = lessThan(linearRGB.rgb, vec3(0.0031308));
			vec3 higher = vec3(1.055)*pow(linearRGB.rgb, vec3(1.0/2.4)) - vec3(0.055);
			vec3 lower = linearRGB.rgb * vec3(12.92);
		
			return vec4(mix(higher, lower, cutoff), linearRGB.a);
		}

          void main() {
            // generate noise
            gln_tFBMOpts opts = gln_tFBMOpts(1.0, 0.3, 2.0, 5.0, 2.0, 5, false, false);
            float noise = gln_sfbm(custom_vUv, opts);
            noise = gln_normalize(noise);

			vec2 uv = gl_FragCoord.xy / uWinResolution.xy;
			
			vec2 distortedPosition = vec2(custom_vUv.x + uDispFactor * ((noise * noise)*uEffectFactor), custom_vUv.y);
			vec2 distortedPosition2 = vec2(uv.x - (1.0 - uDispFactor) * ((noise * noise)*uEffectFactor), uv.y);

			vec4 t1 = texture2D(uTexture, distortedPosition);
			vec4 t2 = texture2D(uTexture2, distortedPosition2);

            csm_DiffuseColor = mix(t1,t2,uProgress);
          }
        `),
		[],
	);

	return (
		<>
			<CSM
				key={vertexShader + fragmentShader}
				baseMaterial={material}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms.current}
				toneMapped={false}
			/>
			{createPortal(
				<>
					<PerspectiveCamera ref={otherCamera} makeDefault />
					<Environment preset="forest" background blur />
					<mesh
						ref={mesh}
						onClick={() => {
							console.log("s");
						}}
						position={[0, 0, -10]}
					>
						<boxGeometry />
						<meshBasicMaterial color="black" />
					</mesh>
				</>,
				otherScene,
			)}

			{createPortal(
				<>
					<Environment preset="night" background blur />
					<mesh
						ref={mesh}
						onClick={() => {
							console.log("s");
						}}
						position={[0, 0, -10]}
					>
						<sphereGeometry />
					</mesh>
				</>,
				scene,
			)}
		</>
	);
}
