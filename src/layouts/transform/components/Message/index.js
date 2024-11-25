import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import MDButton from "components/MDButton";

import React from "react";

import XMLViewer from 'react-xml-viewer'

export default function Message(
  transformedMessage,
  messageId,
  errorCode,
  error,
  outputType,
  statusCode,
  validatorType,
  inputSrcMessage
) {
  const [open, setOpen] = React.useState(false);

  const [openSrcMsg, setOpenSrcMsg] = React.useState(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

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

  return {
    columns: [
      { Header: "message_id", accessor: "message_id", align: "left", width: "20%" },
      { Header: "input_message", accessor: "input_message", align: "center", width: "10%" },
      { Header: "mx", accessor: "mx", align: "left", width: "15%" },
      { Header: "status", accessor: "status", align: "center", width: "15%" },
      {
        Header: "output_message",
        accessor: "output_message",
        align: "center",
        width: "20%"
      },
      { Header: "errors", accessor: "errors", align: "center", width: "20%" },
    ],

    rows: [
      {
        message_id: messageId,
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
                <DialogTitle id="alert-dialog-msg-src">
                  Input Message
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description-msg-src">
                    {atob(inputSrcMessage)}                   
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
        mx: validatorType,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={error ? "Failed" : "Success"}
              color={error ? "error" : "success"}
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        output_message:
          (
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
          ),
        errors:
          statusCode != "200" ? (
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
      },
    ],
  };
}
