// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Admin Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { IconButton } from "@mui/material";

// Admin Dashboard context
import { useMaterialUIController } from "context";
import React, { useEffect, useState } from "react";

import DataTable from "base-components/Tables/DataTable";

import TransformEngineService from "services/TransformEngineService";
import PlayCircleFilledTwoToneIcon from "@mui/icons-material/PlayCircleFilledTwoTone";
import Message from "../Message";

function MessageCard({
  inputMessageId,
  srcInputType,
  srcOutputType,
  message,
  noGutter,
  validatorType,
  isTransformAll,
}) {
  const [controller] = useMaterialUIController();

  const { getMessageTransformation } = TransformEngineService();
  const { darkMode } = controller;

  const [transformedMessage, setTransformedMessage] = useState("");
  const [transformErrors, setTransformErrors] = useState(null);
  const [messageId, setMessgeId] = useState("");
  const [transformErrorCode, setTransformErrorCode] = useState(null);
  const [outputType, setTransformOutputType] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [transformValidatorType, setTransformValidatorType] = useState("");
  const [inputSrcMessage, setInputSrcMessage] = useState("");

  const { columns, rows } = Message(
    transformedMessage,
    messageId,
    transformErrorCode,
    transformErrors,
    outputType,
    statusCode,
    transformValidatorType,
    inputSrcMessage
  );

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
      setMessgeId(response.eventReferenceId);
      setTransformedMessage(response.transformedMessage);
      setTransformErrorCode(response.errorCode);
      setTransformErrors(response.error);
      setTransformValidatorType(response.validatorType);
      setStatusCode(response.statusCode);
      setTransformOutputType(response.outputType);
    });
  };

  useEffect(() => {
    if (isTransformAll) {
      trigger(
        inputMessageId,
        srcInputType,
        srcOutputType,
        message,
        validatorType
      );
    }
  }, [isTransformAll]);

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography
            variant="button"
            fontWeight="medium"
            textTransform="capitalize"
          >
            Message Id: {inputMessageId}
          </MDTypography>

          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <MDBox mr={1}>
              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                onClick={() =>
                  trigger(
                    inputMessageId,
                    srcInputType,
                    srcOutputType,
                    message,
                    validatorType
                  )
                }
              >
                <PlayCircleFilledTwoToneIcon fontSize="inherit" />
              </IconButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text" pt={3} px={2}>
            Input Type:&nbsp;&nbsp;&nbsp;
            <MDTypography
              variant="caption"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {srcInputType}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox>
          {statusCode && (
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          )}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

MessageCard.defaultProps = {
  noGutter: false,
};

MessageCard.propTypes = {
  noGutter: PropTypes.bool,
};

export default MessageCard;
