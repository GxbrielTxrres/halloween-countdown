import { Center, Float, Text } from "@react-three/drei";

export default function Halloween({
	color,
	happyPosition,
	halloweenPosition,
	...props
}) {
	const font = "./Nosifer/Nosifer-Regular.ttf";
	return (
		<Center position={[1, 0, 0]}>
			<Float>
				<group {...props}>
					<Text position={happyPosition} font={font}>
						Happy
						<meshBasicMaterial toneMapped={false} color={color} />
					</Text>
					<Text position={halloweenPosition} font={font}>
						Halloween
						<meshBasicMaterial toneMapped={false} color={color} />
					</Text>
				</group>
			</Float>
		</Center>
	);
}
