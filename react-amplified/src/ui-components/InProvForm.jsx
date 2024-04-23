/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Radio,
  RadioGroupField,
  SelectField,
  Text,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
export default function InProvForm(props) {
  const { onSubmit, onValidate, onChange, overrides, ...rest } = props;
  const initialValues = {
    email: "",
    name: "",
    provider: undefined,
    os: "",
    cpu_cores: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [name, setName] = React.useState(initialValues.name);
  const [provider, setProvider] = React.useState(initialValues.provider);
  const [os, setOs] = React.useState(initialValues.os);
  const [cpu_cores, setCpu_cores] = React.useState(initialValues.cpu_cores);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmail(initialValues.email);
    setName(initialValues.name);
    setProvider(initialValues.provider);
    setOs(initialValues.os);
    setCpu_cores(initialValues.cpu_cores);
    setErrors({});
  };
  const validations = {
    email: [{ type: "Required" }, { type: "Email" }],
    name: [{ type: "Required" }],
    provider: [{ type: "Required" }],
    os: [{ type: "Required" }],
    cpu_cores: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        const modelFields = {
          email,
          name,
          provider,
          os,
          cpu_cores,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        await onSubmit(modelFields);
      }}
      {...getOverrideProps(overrides, "InProvForm")}
      {...rest}
    >
      <Heading
        children="Configuration Form"
        {...getOverrideProps(overrides, "SectionalElement0")}
      ></Heading>
      <Text
        children="Fill out the form to build your machine."
        {...getOverrideProps(overrides, "SectionalElement1")}
      ></Text>
      <TextField
        label="Email:"
        descriptiveText="Please enter your email."
        isRequired={true}
        placeholder="example@inprov.com"
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              name,
              provider,
              os,
              cpu_cores,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Hostname:"
        descriptiveText="Please enter a hostname for this machine."
        isRequired={true}
        placeholder="eg. machine1234"
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name: value,
              provider,
              os,
              cpu_cores,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <RadioGroupField
        label="Cloud Provider:"
        name="fieldName"
        descriptiveText="Select your preferred cloud service provider."
        isRequired={true}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name,
              provider: value,
              os,
              cpu_cores,
            };
            const result = onChange(modelFields);
            value = result?.provider ?? value;
          }
          if (errors.provider?.hasError) {
            runValidationTasks("provider", value);
          }
          setProvider(value);
        }}
        onBlur={() => runValidationTasks("provider", provider)}
        errorMessage={errors.provider?.errorMessage}
        hasError={errors.provider?.hasError}
        {...getOverrideProps(overrides, "provider")}
      >
        <Radio
          children="AWS"
          value="AWS"
          {...getOverrideProps(overrides, "providerRadio0")}
        ></Radio>
        <Radio
          children="GCP"
          value="GCP"
          {...getOverrideProps(overrides, "providerRadio1")}
        ></Radio>
      </RadioGroupField>
      <SelectField
        label="Operating System:"
        descriptiveText="Select your preferred Linux operating system."
        placeholder="Please select an option"
        value={os}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name,
              provider,
              os: value,
              cpu_cores,
            };
            const result = onChange(modelFields);
            value = result?.os ?? value;
          }
          if (errors.os?.hasError) {
            runValidationTasks("os", value);
          }
          setOs(value);
        }}
        onBlur={() => runValidationTasks("os", os)}
        errorMessage={errors.os?.errorMessage}
        hasError={errors.os?.hasError}
        {...getOverrideProps(overrides, "os")}
      >
        <option
          children="Ubuntu"
          value="Ubuntu"
          {...getOverrideProps(overrides, "osoption0")}
        ></option>
      </SelectField>
      <SelectField
        label="CPU Cores:"
        descriptiveText="How many cores does your machine need?"
        placeholder="Please select an option"
        value={cpu_cores}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              name,
              provider,
              os,
              cpu_cores: value,
            };
            const result = onChange(modelFields);
            value = result?.cpu_cores ?? value;
          }
          if (errors.cpu_cores?.hasError) {
            runValidationTasks("cpu_cores", value);
          }
          setCpu_cores(value);
        }}
        onBlur={() => runValidationTasks("cpu_cores", cpu_cores)}
        errorMessage={errors.cpu_cores?.errorMessage}
        hasError={errors.cpu_cores?.hasError}
        {...getOverrideProps(overrides, "cpu_cores")}
      >
        <option
          children="1"
          value="1"
          {...getOverrideProps(overrides, "cpu_coresoption0")}
        ></option>
        <option
          children="2"
          value="2"
          {...getOverrideProps(overrides, "cpu_coresoption1")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit Request"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
