import { styles } from "@/styles/styles";
import { Canvas } from "@react-three/fiber";
import Experience from "../../components/Experience";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Canvas style={{ ...styles }} gl={{ antialias: false }}>
				<Experience />
			</Canvas>
			<Component {...pageProps} />
		</>
	);
}
