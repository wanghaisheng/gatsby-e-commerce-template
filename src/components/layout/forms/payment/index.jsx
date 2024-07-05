import React, { useState } from "react";
import SelectPayment from "./select";
import CardPayment from "./card";
import MobilePayment from "./mobile";
import VerificationComponent from "../../verificationComponent";
import Carousel from "../../carousel";

const Payment = ({
  mobileValues,
  onFail,
  onComplete,
  onCancel,
  setIsLoading,
  setLoadingMessage,
}) => {
  const [stage, setStage] = useState(0);
  const [payment, setPayment] = useState({});

  const handleFail = (message) => {
    onFail(message);
  };

  const handleComplete = () => {
    setStage(0);
    setPayment((prev) => {
      onComplete(prev);
      return prev;
    });
  };

  return (
    <Carousel
      width={"100%"}
      height={"100%"}
      index={stage}
      setIndex={setStage}
      maxIndex={3}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SelectPayment {...{ setStage, onCancel }} />
      <CardPayment
        {...{
          setStage,
          setPayment,
          setIsLoading,
          setLoadingMessage,
          handleComplete,
          handleFail,
        }}
      />
      <MobilePayment {...{ mobileValues, setStage, setPayment }} />
      <VerificationComponent
        type="mobile"
        setIsLoading={setIsLoading}
        setLoadingMessage={setLoadingMessage}
        onVerifyFaliure={handleFail}
        onVerifySuccess={handleComplete}
      />
    </Carousel>
  );
};

export default Payment;
