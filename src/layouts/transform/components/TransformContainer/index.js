import Card from "@mui/material/Card";

// Admin Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import React, { useState, useEffect } from "react";
import TransformEngineService from "services/TransformEngineService";
import MDButton from "components/MDButton";
import DownloadIcon from "@mui/icons-material/Download";
import MessageBox from "../messageBox";
import "./table.css";
import Spinner from "../../../../base-components/Spinners";

function TransformContainer() {
  const [messageList, setMessageList] = useState(null);
  const [transformAll, setTransformAllFlag] = useState(false);
  const [isVisible, setSpinnerVisibility] = useState(false);

  const { getMessageList } = TransformEngineService();

  useEffect(() => {
    // getMessageList().then((response) => setMessageList(response));
  }, []);

  const handleTransformAll = () => {
    setTransformAllFlag(true);
  };

  const loadAllMessages = () => {
    setSpinnerVisibility(true);
    setMessageList(null);

    setTimeout(() => {
      getMessageList().then((response) => setMessageList(response));
      setSpinnerVisibility(false);
    }, 4000);
  };

  return (
    <Card id="transform-container" style={{ minHeight: "calc(100vh - 7rem)" }}>
      {messageList && (
        <MDButton
          variant="text"
          color="error"
          onClick={() => handleTransformAll()}
          style={{ justifyContent: "right" }}
        >
          Click Me To Transform All
        </MDButton>
      )}
      <MDButton
        startIcon={!isVisible ? <DownloadIcon /> : ""}
        variant="text"
        color="info"
        onClick={() => loadAllMessages()}
        style={{ width: isVisible ? "50%" : "20%", margin: "1rem auto" }}
      >
        {isVisible ? (
          <MDBox pt={3} px={2}>
            <MDTypography variant="h6" fontWeight="medium">
              <Spinner visibility={true} type={"message"}></Spinner>
              Loading messages...
            </MDTypography>
          </MDBox>
        ) : (
          "Load Messages"
        )}
      </MDButton>

      {messageList && (
        <>
          <MDBox pt={3} px={2}>
            <MDTypography variant="h6" fontWeight="medium">
              Transforms
            </MDTypography>
          </MDBox>

          <MDBox pt={1} pb={2} px={2}>
            <MDBox
              component="ul"
              display="flex"
              flexDirection="column"
              p={0}
              m={0}
            >
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Transform</th>
                    <th>Message Id</th>
                    <th>Input Message</th>
                    <th>MX</th>
                    <th>Status</th>
                    <th>Output Message</th>
                    <th>Errors</th>
                  </tr>
                </thead>
                <tbody>
                  {messageList &&
                    messageList.map((message) => (
                      <MessageBox
                        key={message.eventReferenceId}
                        message={message}
                        transformAll={transformAll}
                      ></MessageBox>
                    ))}
                </tbody>
              </table>
              {/* <MessageCard
                key={""}
                inputMessageId={""}
                srcInputType={""}
                srcOutputType={""}
                message={""}
                validatorType={""}
                isTransformAll={""}
                messageList={messageList}
              /> */}
              {/* {messageList &&
            messageList.map((message) => (
              <MessageCard
                key={message.eventReferenceId}
                inputMessageId={message.eventReferenceId}
                srcInputType={message.inputType}
                srcOutputType={message.outputType}
                message={message.messageContent}
                validatorType={message.validatorType}
                isTransformAll={isTransformAll}
              />
            ))} */}
            </MDBox>
          </MDBox>
        </>
      )}
    </Card>
  );
}

export default TransformContainer;