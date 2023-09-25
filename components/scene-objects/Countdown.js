import { Html } from "@react-three/drei";
import { useState, useEffect, useLayoutEffect } from "react";
import styles from "../../src/styles/Counter.module.css";
export default function Countdown() {
	const [timeRemaining, setTimeRemaining] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useLayoutEffect(() => {
		const targetDate = new Date("2023-10-31T00:00:00");

		// The function that updates the countdown
		const updateCountdown = () => {
			const now = new Date().getTime();
			const timeDifference = targetDate - now;

			let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			let hours = Math.floor(
				(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			let minutes = Math.floor(
				(timeDifference % (1000 * 60 * 60)) / (1000 * 60),
			);

			let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			days < 10 ? (days = `0${days}`) : null;
			hours < 10 ? (hours = `0${hours}`) : null;
			minutes < 10 ? (minutes = `0${minutes}`) : null;
			seconds < 10 ? (seconds = `0${seconds}`) : null;

			setTimeRemaining({ days, hours, minutes, seconds });
		};

		//initiate countdown
		if (timeRemaining.days === 0) {
			updateCountdown();
		}

		// Set up the interval to update the countdown every second
		const interval = setInterval(updateCountdown, 1000);

		// Cleanup the interval when the component is unmounted
		return () => clearInterval(interval);
	}, []);

	return (
		<Html
			style={{
				pointerEvents: "none",
				userSelect: "none",
				touchAction: "none",
				position: "relative",
			}}
			center
		>
			<div
				className={styles.container}
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<div className={styles.days}>
					<div className={`${styles.child}`}>
						{timeRemaining.days}
					</div>
					<span className={styles.label}>days</span>
				</div>

				<div className={styles.days}>
					<div className={`${styles.child}`}>
						{timeRemaining.hours}
					</div>
					<span className={styles.label}>hrs</span>
				</div>

				<div className={styles.days}>
					<div className={`${styles.child}`}>
						{timeRemaining.minutes}
					</div>
					<span className={styles.label}>mins</span>
				</div>
				<div className={styles.days}>
					<div className={`${styles.child}`}>
						{timeRemaining.seconds}
					</div>
					<span className={styles.label}>secs</span>
				</div>
			</div>
		</Html>
	);
}
