import Card from "@mui/material/Card";

// Admin Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import React, { useState, useEffect } from "react";
import MessageCard from "../MessageCard";
import TransformEngineService from "services/TransformEngineService";

function TransformContainer() {
  const [messageList, setMessageList] = useState(null);

  const { getMessageList } = TransformEngineService();

  useEffect(() => {
    getMessageList().then((response) => setMessageList(response));
  }, []);

  return (
    <Card id="transform-container">
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
              />
            ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default TransformContainer;
