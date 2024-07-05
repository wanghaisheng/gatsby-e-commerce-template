import React from "react";
import LoginForm from "./loginForm";
import LoginIntro from "./intro";
import ChangePassword from "../../forms/changePassword";

const LoginStages = ({
  stage,
  setStage,
  setIsLoading,
  setLoadingMessage,
  setIsError,
  setErrorDetails,
  setIsSuccess,
  setSuccessDetails,
  setAuth,
}) => {
  const changePassword = (password) => {
    console.log(password);
    setIsLoading(true);
    setLoadingMessage("Changing password");
    const loadingTimeout = setTimeout(() => {
      clearTimeout(loadingTimeout);
      setIsLoading(false);
      setIsSuccess(true);
      setSuccessDetails({
        message: "password changed successfully",
        action: () => {
          setStage(1);
        },
        actionTitle: "Back to login",
      });
    }, 2000);
  };

  const handleFail = (message) => {
    setIsError(true);
    setErrorDetails({
      message: message,
      action: () => {
        setStage(1);
      },
      actionTitle: "Back to login",
    });
  };

  const stages = [
    <LoginIntro {...{ setStage, setAuth }} />,
    <LoginForm
      {...{
        setStage,
        setIsLoading,
        setLoadingMessage,
        setIsSuccess,
        setSuccessDetails,
        setIsError,
        setErrorDetails,
      }}
    />,
    <ChangePassword
      onCancel={() => setStage(1)}
      onFail={handleFail}
      onComplete={changePassword}
      {...{ setIsLoading, setLoadingMessage }}
    />,
  ];
  return stages[stage];
};

export default LoginStages;
