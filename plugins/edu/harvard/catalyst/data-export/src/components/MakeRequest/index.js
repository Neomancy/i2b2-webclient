import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import "../../css/modals.scss";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    Backdrop,
    Card,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import "./MakeRequest.scss";
import {
    makeRequest, makeRequestStatusConfirmed,
    updateRequestComments,
    updateRequestEmail,
    updateRequestPatientSet
} from "../../reducers/makeRequestSlice";

export const MakeRequest = ({}) => {
    const dispatch = useDispatch();
    const makeRequestDetails = useSelector((state) => state.makeRequestDetails);
    const [isEmailNotValid, setIsEmailNotValid] = useState(false);
    const [emailNotValidError, setEmailNotValidError] = useState("");
    const [isPatientSetNotValid, setIsPatientSetNotValid] = useState(false);
    const [patientSetNotValidError, setPatientSetNotValidError] = useState("");
    //const [isSubmitting, setIsSubmitting] = useState(false);

    const updatePatientSet = (value) => {
        dispatch(updateRequestPatientSet(value));
    }

    const updateEmail = (value) => {
        dispatch(updateRequestEmail(value));
    }

    const updateComments = (value) => {
        dispatch(updateRequestComments(value));
    }

    const handleMakeRequest = () => {
        if(isValidRequest()) {
            dispatch(makeRequest());
        }
    }

    const isValidRequest = () => {
        let isValid = true;

        /*if(!makeRequestDetails.patientSet || Object.keys(makeRequestDetails.patientSet).length === 0){
            setIsPatientSetNotValid(true);
            setPatientSetNotValidError("Patient Set is required");
            isValid = false;
        }
        else{
            setIsPatientSetNotValid(false);
            setPatientSetNotValidError("");
        }*/

        const emailRegex = /\S+@\S+\.\S+/;
        if((makeRequestDetails.email && makeRequestDetails.email.length > 0) && emailRegex.test(makeRequestDetails.email)){
            setIsEmailNotValid(false);
            setEmailNotValidError("");
        }
        else{
            setIsEmailNotValid(true);
            setEmailNotValidError("Enter a valid email");
            isValid = false;
        }

        return isValid;
    }

    const handleConfirmStatus = () => {
        console.log("dispatching status confirmed");
        dispatch(makeRequestStatusConfirmed());
    };



    return (
        <Stack
            className={"MakeRequest"}
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={3}
            useFlexGap
        >
            <TextField
                required
                className="inputField"
                label="Patient Set"
                variant="standard"
                fullWidth
                error={isPatientSetNotValid}
                helperText={patientSetNotValidError}
                onChange={(event) => updatePatientSet(event.target.value)}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                required
                disabled={true}
                className="inputField"
                label="Table"
                defaultValue={"Table specifications from Define Table tab"}
                variant="standard"
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                className="inputField"
                label="Email"
                variant="standard"
                fullWidth
                value={makeRequestDetails.email}
                onChange={(event) => updateEmail(event.target.value)}
                error={isEmailNotValid}
                helperText={emailNotValidError}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                className="inputField"
                label="Comments"
                variant="standard"
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
            <div className={"MakeRequestSubmitMain"}>
                <Button className={"MakeRequestSubmit"} onClick={handleMakeRequest} variant="outlined">Submit</Button>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={makeRequestDetails.isSubmitting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
                open={makeRequestDetails.statusInfo.status === "SUCCESS"}
                onClose={handleConfirmStatus}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Data Request"}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                       A data export request has been submitted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleConfirmStatus}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}
