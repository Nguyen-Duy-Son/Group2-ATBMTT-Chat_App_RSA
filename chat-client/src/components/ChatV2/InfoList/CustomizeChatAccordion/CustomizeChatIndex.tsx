import { observer } from 'mobx-react';
import React, { memo } from 'react';
import { useStore } from "src/stores";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";

function CustomizeChatIndex(props: any) {
    const { expanded, handleChangeStateAccordion } = props;

    return (
        <Accordion
            className="w-100"
            expanded={expanded === 'panel1'}
            onChange={handleChangeStateAccordion('panel1')}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Customzie Chat</Typography>
            </AccordionSummary>
            <AccordionDetails className="m-0 p-0">
                <button
                    className="w-100 m-0 p-2"
                >
                    Change conversation name
                </button>
                <button
                    className="w-100 m-0 p-2"
                >
                    Change conversation theme
                </button>
                <button
                    className="w-100 m-0 p-2"
                >
                    Change conversation photo
                </button>
            </AccordionDetails>
        </Accordion>
    );
}

export default memo(observer(CustomizeChatIndex));