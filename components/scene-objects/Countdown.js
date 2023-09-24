import { Text, Center } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Color } from "three";
export default function Countdown() {
	const [timeRemaining, setTimeRemaining] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const targetDate = new Date("2023-10-31T00:00:00");

		// The function that updates the countdown
		const updateCountdown = () => {
			const now = new Date().getTime();
			const timeDifference = targetDate - now;

			const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const minutes = Math.floor(
				(timeDifference % (1000 * 60 * 60)) / (1000 * 60),
			);
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			setTimeRemaining({ days, hours, minutes, seconds });
		};

		// Set up the interval to update the countdown every second
		const interval = setInterval(updateCountdown, 1000);

		// Cleanup the interval when the component is unmounted
		return () => clearInterval(interval);
	}, []);

	return (
		<Center position={[0.75, -2, 0]}>
			<Text
				font="./Nosifer/Nosifer-Regular.ttf"
				material-toneMapped={false}
			>
				{`${timeRemaining.days} ${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
			</Text>
		</Center>
	);
}
