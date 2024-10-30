import React, { useState } from "react";
import ContractDetails from "./ContractDetails";
import Button from "../../components/UI/Button";
import Stepper from "../../components/UI/Stepper";
import ContractVerificationAdvancedForm from "./ContractVerificationAdvanceForm";

const STEPS = [
  {
    key: 1,
    label: "Enter Contract Details",
  },
  {
    key: 2,
    label: "Verify and Publish",
  },
];

const VerifyContractStepper = () => {
  const [step, setStep] = useState(1);
  const [contractDetails, setContractDetails] = useState({});

  const onContinueClick = (contractData) => {
    setStep((s) => s + 1);
    setContractDetails({ ...contractData });
  };

  const onBackClick = () => setStep(step - 1);

  const onSubmitClick = (advancedData) => {
    setContractDetails((contractData) => ({
      ...contractData,
      ...advancedData,
    }));
  };

  console.log({ contractDetails });
  return (
    <div>
      <div className="mt-5">
        <Stepper items={STEPS} current={step} />
      </div>

      <div className="my-6">
        {step === 1 && (
          <div>
            <ContractDetails
              step={step}
              contractDetails={contractDetails}
              onContinueClick={onContinueClick}
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <ContractVerificationAdvancedForm
              step={step}
              contractDetails={contractDetails}
              onBackClick={onBackClick}
              onSubmitClick={onSubmitClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyContractStepper;
