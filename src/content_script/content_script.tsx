import React from "react";
import ReactDOM from "react-dom";
import { CreateMenuDiv } from "./CreateMenuDiv";
import { OverlayButtons } from "./OverlayButtons";
import $script from "scriptjs";
import { normalize } from "react-style-reset/string";
import { createGlobalStyle } from "styled-components";
import EventHandler from "./EventHandler";

const ImportJQuery = async () => {
	return new Promise<void>((res) =>
		$script.get("https://code.jquery.com/jquery-3.5.1.min.js", res)
	);
};

const RegisterListeners = async () => {
	EventHandler.Init();
};
const GlobalStyles = createGlobalStyle`
${normalize};
`;
const InitMenu = async () => {
	CreateMenuDiv();
	ReactDOM.render(
		<React.StrictMode>
			<GlobalStyles />
			<OverlayButtons />
		</React.StrictMode>,
		document.getElementById("overlay-buttons")
	);
};

Promise.all([ImportJQuery(), RegisterListeners(), InitMenu()]);
