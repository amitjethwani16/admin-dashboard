import Card from "@mui/material/Card";

// Admin Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import React, { useState, useEffect } from "react";
import MessageCard from "../MessageCard";
import TransformEngineService from "services/TransformEngineService";
import MDButton from "components/MDButton";

function TransformContainer() {
  const [messageList, setMessageList] = useState(null);
  const [isTransformAll, setTransformAllFlag] = useState(false);

  const { getMessageList } = TransformEngineService();

  useEffect(() => {
    getMessageList().then((response) => setMessageList(response));
  }, []);

  const handleTransformAll = () => {
    setTransformAllFlag(true);
  };

  return (
    <Card id="transform-container">
      <MDButton
        variant="text"
        color="error"
        onClick={() => handleTransformAll()}
        style={{ justifyContent: "right" }}
      >
        Click Me To Transform All
      </MDButton>
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Transforms
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {messageList &&
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
            ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default TransformContainer;
