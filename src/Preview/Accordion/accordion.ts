import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from '@material-ui/core/styles';

export const Accordion = withStyles({
    root: {
        borderRadius: '10px',
        boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.25)',
        marginBottom: '10px',
        '&:last-child': {
            borderRadius: '10px',
        },
        '&:first-child': {
            borderRadius: '10px',
            boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.25)',
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            width: '100%',
            marginBottom: '10px',
            borderRadius: '10px',
        },
    },
    expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
    root: {
        borderBottom: '1px solid transparent',
        borderRadius: '10px',
        transition: 'border-radius 0.6s',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            borderRadius: '10px 10px 0px 0px',
            transition: 'border-radius 0.1s',
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '0'
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export const AccordionSummaryGreenExpand = withStyles({
    root: {
        borderBottom: '1px solid transparent',
        borderRadius: '10px',
        transition: 'border-radius 0.6s',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            borderRadius: '10px 10px 0px 0px',
            transition: 'border-radius 0.1s',
            minHeight: 56,
            backgroundColor: '#73C120',
            color: 'white'
        },
    },
    content: {
        '&$expanded': {
            margin: '0'
        },
    },
    expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles((theme) => ({
    root: {
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column'
    }
}))(MuiAccordionDetails);