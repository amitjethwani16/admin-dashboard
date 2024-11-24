export default function TransformEngineService() {
  let headersList = {
    Accept: "/",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  const getMessageList = () =>
    fetch(process.env.REACT_APP_TECH_STEER_URL_UPLOAD, {
      method: "post",
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => data);

  const getMessageTransformation = (
    inputMessageId,
    srcInputType,
    srcOutputType,
    validatorType,
    message
  ) => {
    let bodyContent = JSON.stringify({
      eventReferenceId: inputMessageId,
      inputType: srcInputType,
      outputType: srcOutputType,
      validatorType: validatorType,
      "source-msg": message,
    });

    return fetch(process.env.REACT_APP_TECH_STEER_URL_TRANSFORM, {
      method: "post",
      headers: headersList,
      body: bodyContent,
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => console.error(error));
  };
  return {
    getMessageList,
    getMessageTransformation,
  };
}
