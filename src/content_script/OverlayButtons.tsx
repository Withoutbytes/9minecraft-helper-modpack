import { Grommet, Button, dark, Box, grommet } from "grommet";
import React from "react";
import { AddModButton } from "./AddModButton";
import theme from "./theme.json";

export const OverlayButtons = () => {
	return (
		<Grommet theme={grommet} background="transparent">
			<Box margin="medium" background="transparent" color="transparent" pad="none">
				<AddModButton />
			</Box>
		</Grommet>
	);
};
