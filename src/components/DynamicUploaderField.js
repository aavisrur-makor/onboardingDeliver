import { useEffect, useState, memo } from "react";
import UploaderField from "./UploaderField";

const DynamicUploaderField = memo(
  (props) => {
    useEffect(() => {
      console.log("dynamic uploader field props", props);
    }, []);
    return <UploaderField id={props.id} label={"Proof of Identity/Address"} />;
  },
  (prevProps, nextProps) => prevProps.id !== nextProps.id
);
export default DynamicUploaderField;
