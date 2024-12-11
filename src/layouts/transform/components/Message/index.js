
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

import React, { useState } from "react";

import XMLViewer from "react-xml-viewer";

import CustomizedSteppers from "base-components/Stepper";
import Spinner from "../../../../base-components/Spinners";

export default function Message(
  transformedMessage1,
  messageId1,
  errorCode,
  error,
  outputType1,
  statusCode1,
  validatorType,
  inputSrcMessage1,
  stepActiveCounter1,
  messageList,
  srcInputType,
  srcOutputType,
  inputMessageId
) {
  const [open, setOpen] = React.useState(false);
  const { getMessageTransformation } = TransformEngineService();

  const [openSrcMsg, setOpenSrcMsg] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [transformedMessage, setTransformedMessage] = useState("");
  const [transformErrors, setTransformErrors] = useState(null);
  const [messageId, setMessgeId] = useState("");
  const [transformErrorCode, setTransformErrorCode] = useState(null);
  const [outputType, setTransformOutputType] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [transformValidatorType, setTransformValidatorType] = useState("");
  const [inputSrcMessage, setInputSrcMessage] = useState("");

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
    inputMessageId,
    srcInputType,
    srcOutputType,
    inputMessage,
    validatorType
  ) => {
    setInputSrcMessage(inputMessage);

    getMessageTransformation(
      inputMessageId,
      srcInputType,
      srcOutputType,
      validatorType,
      inputMessage
    ).then((response) => {
      console.log("stattt" + response.statusCode);
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
              setTransformValidatorType(response.validatorType);
              setStatusCode(response.statusCode);
              setTransformOutputType(response.outputType);
              setActiveCounter(2);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    });
  };

  const rowsMapper = messageList
    ? messageList.map((message1) => ({
        transform: (
          <IconButton
            aria-label="delete"
            size="large"
            color="error"
            onClick={() =>
              trigger(
                message1.eventReferenceId,
                message1.inputType,
                message1.outputType,
                message1.messageContent,
                message1.validatorType
              )
            }
          >
            <PlayCircleFilledTwoToneIcon fontSize="inherit" />
          </IconButton>
        ),
        message_id: message1.eventReferenceId,
        input_message: (
          <>
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
                  {atob(message1.messageContent)}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseSrcMsg} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ),
        mx: message1.validatorType,
        status: (
          <>
            <CustomizedSteppers
              activeStepCounter={stepActiveCounter}
              statusCode={statusCode}
            ></CustomizedSteppers>
            <Spinner visibility={true}></Spinner>
          </>
        ),
        output_message:
          statusCode != null && transformedMessage != null ? (
            <>
              <MDButton
                variant="text"
                color="success"
                onClick={handleClickOpen}
              >
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
          ),
        errors:
          statusCode != "200" && statusCode != null ? (
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
                    {error}
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
          ),
      }))
    : [{}];

  return {
    columns: [
      {
        Header: "transform",
        accessor: "transform",
        align: "left",
        width: "20%",
      },
      {
        Header: "message_id",
        accessor: "message_id",
        align: "left",
        width: "20%",
      },
      {
        Header: "input_message",
        accessor: "input_message",
        align: "center",
        width: "10%",
      },
      { Header: "mx", accessor: "mx", align: "left", width: "15%" },
      { Header: "status", accessor: "status", align: "center", width: "15%" },
      {
        Header: "output_message",
        accessor: "output_message",
        align: "center",
        width: "20%",
      },
      { Header: "errors", accessor: "errors", align: "center", width: "20%" },
    ],

    rows: rowsMapper,
  };
}
