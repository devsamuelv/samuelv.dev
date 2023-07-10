import styles from "./Home.module.css";

import Image from "next/image";
import { FC } from "react";
import Head from "next/head";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<div className={styles.container}>
				<Head>
					<title>Samuelv.dev</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main className={styles.main}>
					<h1 className={styles.title}>
						Welcome to{" "}
						<a href="https://www.notion.so/Sams-Weekly-Update-00fa12ec9861426ab638de8108abd6ab">
							Samuelv.dev!
						</a>
					</h1>

					<p className={styles.description}>
						This is my personal website with all my social links.
					</p>

					<div className={styles.grid}>
						<Card
							title="My Twitter"
							desc="This links to my twitter if you want to get in touch or see what im doing come take a look!"
							link="https://twitter.com/DevSamuelV"
						/>

						<Card
							title="My Github"
							desc="This link is for my github page if you want to look at some of my projects or what languages I use or what im working on come take a look!"
							link="https://github.com/devsamuelv"
						/>

						<Card
							title="My Discord"
							desc="Reach out to me on discord!"
							link="https://discord.com/users/459517856154124289"
						/>

						<Card
							title="Dev.to"
							desc="My Dev.to profile there's not much here but I linked it anyways"
							link="https://dev.to/devsamuelv"
						/>
					</div>
				</main>
			</div>
		</main>
	);
}

type CardProps = {
	link: string;
	title: string;
	desc: string;
};

const Card: FC<CardProps> = ({ desc, link, title }) => {
	return (
		<a href={link} className={styles.card}>
			<h2>{title} &rarr;</h2>
			<p>{desc}</p>
		</a>
	);
};
