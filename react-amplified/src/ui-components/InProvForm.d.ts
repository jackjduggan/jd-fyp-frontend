/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, HeadingProps, RadioGroupFieldProps, SelectFieldProps, TextFieldProps, TextProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type InProvFormInputValues = {
    email?: string;
    name?: string;
    provider?: string;
    os?: string;
    cpu_cores?: string;
};
export declare type InProvFormValidationValues = {
    email?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    provider?: ValidationFunction<string>;
    os?: ValidationFunction<string>;
    cpu_cores?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InProvFormOverridesProps = {
    InProvFormGrid?: PrimitiveOverrideProps<GridProps>;
    SectionalElement0?: PrimitiveOverrideProps<HeadingProps>;
    SectionalElement1?: PrimitiveOverrideProps<TextProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    provider?: PrimitiveOverrideProps<RadioGroupFieldProps>;
    os?: PrimitiveOverrideProps<SelectFieldProps>;
    cpu_cores?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type InProvFormProps = React.PropsWithChildren<{
    overrides?: InProvFormOverridesProps | undefined | null;
} & {
    onSubmit: (fields: InProvFormInputValues) => void;
    onChange?: (fields: InProvFormInputValues) => InProvFormInputValues;
    onValidate?: InProvFormValidationValues;
} & React.CSSProperties>;
export default function InProvForm(props: InProvFormProps): React.ReactElement;
