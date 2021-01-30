import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type MOD_STATE = "InModpack" | "NotInModpack" | "Adding";

const SendForAllTabs = (message: any) =>
	new Promise((res) => {
		chrome.tabs.query({}, (tabs) => {
			tabs.forEach((tab) => {
				if (tab.id) chrome.tabs.sendMessage(tab.id, message, res);
			});
		});
	});

const Popup = () => {
	const SetInModpack = async () => {
		SendForAllTabs({ id: "ModUpdate", data: [{ modState: "InModpack" }] });
	};

	const SetNotInModpack = async () => {
		SendForAllTabs({ id: "ModUpdate", data: [{ modState: "NotInModpack" }] });
	};

	const SetAdding = async () => {
		SendForAllTabs({ id: "ModUpdate", data: [{ modState: "Adding" }] });
	};

	return (
		<>
			<h2>Modpack</h2>
			<button onClick={() => SetInModpack()}>SetInModpack</button>
			<button onClick={() => SetNotInModpack()}>SetNotInModpack</button>
			<button onClick={() => SetAdding()}>SetAdding</button>
			<div>
				<h3>Mods</h3>
				<ul></ul>
			</div>
		</>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>,
	document.getElementById("root")
);
