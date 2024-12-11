
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { IconButton } from "@mui/material";

import TransformEngineService from "services/TransformEngineService";
import PlayCircleFilledTwoToneIcon from "@mui/icons-material/PlayCircleFilledTwoTone";
import MDButton from "components/MDButton";

import XMLViewer from "react-xml-viewer";

import CustomizedSteppers from "base-components/Stepper";
import Spinner from "../../../../base-components/Spinners";
import MDBox from "components/MDBox";

function MessageBox({ message, transformAll }) {
  const [open, setOpen] = React.useState(false);
  const { getMessageTransformation } = TransformEngineService();

  const [openSrcMsg, setOpenSrcMsg] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [transformedMessage, setTransformedMessage] = useState("");
  const [transformErrors, setTransformErrors] = useState(null);
  const [messageId, setMessgeId] = useState("");
  const [transformErrorCode, setTransformErrorCode] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [isVisible, setSpinner] = useState(false);

  const [stepActiveCounter, setActiveCounter] = useState(-1);

  const handleClickOpenSrcMsg = () => {
    setOpenSrcMsg(true);
  };

  const handleCloseSrcMsg = () => {
    setOpenSrcMsg(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenErrorDialog = () => {
    setOpenErrorDialog(true);
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const trigger = (
    eventReferenceId,
    inputType,
    outputType,
    messageContent,
    validatorType
  ) => {
    setSpinner(true);

    getMessageTransformation(
      eventReferenceId,
      inputType,
      outputType,
      validatorType,
      messageContent
    ).then((response) => {
      setTimeout(() => {
        setTimeout(() => {
          setActiveCounter(0);

          setTimeout(() => {
            setActiveCounter(1);

            setTimeout(() => {
              setMessgeId(response.eventReferenceId);
              setTransformedMessage(response.transformedMessage);
              setTransformErrorCode(response.errorCode);
              setTransformErrors(response.error);
              setStatusCode(response.statusCode);
              setActiveCounter(2);

              setSpinner(false);
            }, 1500);
          }, 1000);
        }, 2000);
      }, 2000);
    });
  };

  useEffect(() => {
    if (transformAll) {
      trigger(
        message.eventReferenceId,
        message.inputType,
        message.outputType,
        message.messageContent,
        message.validatorType
      );
    }
  }, [transformAll]);

  return (
    
    <tr key={message.eventReferenceId}>
      <td>
      <MDBox
              component="ul"
              display="flex"
              flexDirection="column"
              p={0}
              m={0}
            >
        <IconButton
          aria-label="delete"
          size="large"
          color="info"
          onClick={() =>
            trigger(
              message.eventReferenceId,
              message.inputType,
              message.outputType,
              message.messageContent,
              message.validatorType
            )
          }
        >
          <PlayCircleFilledTwoToneIcon fontSize="inherit" />
        </IconButton>
        </MDBox>
      </td>
      <td>{message.eventReferenceId}</td>

      <td>
        <MDButton
          variant="text"
          color="success"
          onClick={handleClickOpenSrcMsg}
        >
          Show message
        </MDButton>
        <Dialog
          open={openSrcMsg}
          onClose={handleCloseSrcMsg}
          aria-labelledby="alert-dialog-msg-src"
          aria-describedby="alert-dialog-description-msg-src"
        >
          <DialogTitle id="alert-dialog-msg-src">Input Message</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description-msg-src">
              {atob(message.messageContent)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSrcMsg} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </td>
      <td>{message.validatorType}</td>
      <td>
        <CustomizedSteppers
          activeStepCounter={stepActiveCounter}
          statusCode={statusCode}
        ></CustomizedSteppers>
        <Spinner type={"progressBar"} visibility={isVisible}></Spinner>
      </td>
      <td>
        {statusCode != null && transformedMessage != null ? (
          <>
            <MDButton variant="text" color="success" onClick={handleClickOpen}>
              Show message
            </MDButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-msg"
              aria-describedby="alert-dialog-description-msg"
            >
              <DialogTitle id="alert-dialog-msg">
                Transformed Message
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description-msg">
                  <XMLViewer xml={transformedMessage}></XMLViewer>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          "NA"
        )}
      </td>
      <td>
        {statusCode != "200" && statusCode != null ? (
          <>
            <MDButton
              variant="text"
              color="error"
              onClick={handleClickOpenErrorDialog}
            >
              Show errors
            </MDButton>
            <Dialog
              open={openErrorDialog}
              onClose={handleCloseErrorDialog}
              aria-labelledby="alert-dialog-error"
              aria-describedby="alert-dialog-description-error"
            >
              <DialogTitle id="alert-dialog-error">
                Transformation errors
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description-error">
                  {transformErrors}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseErrorDialog} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          "NA"
        )}
      </td>
    </tr>
  );
}

export default MessageBox;
