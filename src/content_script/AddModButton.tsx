import { Button } from "grommet";
import React, { useState } from "react";
import EventHandler from "./EventHandler";
import { Tasks } from "./Tasks";
import { GetDocumentInfo } from "./utils/ModInfoGetter";
import $ from "jquery";

type MOD_STATE = "InModpack" | "NotInModpack" | "Adding";
type BUTTON_LABELS = "Add Mod" | "Remove Mod" | "Adding..." | "Loading...";

const ModStateAndButtonLabels: Record<MOD_STATE, BUTTON_LABELS> = {
	InModpack: "Remove Mod",
	NotInModpack: "Add Mod",
	Adding: "Adding...",
};

export const AddModButton = () => {
	const [buttonLabel, SetButtonLabel] = useState<BUTTON_LABELS>("Loading...");

	EventHandler.on("ModUpdate", ({ modState }: { modState: MOD_STATE }) => {
		if (modState) SetButtonLabel(ModStateAndButtonLabels[modState]);
	});

	const OnClick = () => {
		if (buttonLabel == "Add Mod") Tasks.AddMod(GetDocumentInfo($()));
		if (buttonLabel == "Remove Mod") Tasks.RemoveMod(GetDocumentInfo($()));
	};

	return (
		<>
			<Button onClick={OnClick} primary label={buttonLabel} />
		</>
	);
};
