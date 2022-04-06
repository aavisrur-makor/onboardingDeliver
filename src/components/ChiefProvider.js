import { useState } from "react";
import FileContext, {
  initialState as initialFileState,
} from "../context/files";
import FieldContext, {
  initialState as initialFieldState,
} from "../context/fields";
import AuthContext, { initialState as initialAuthState } from "../context/auth";
import FormContext, { initialState as initialFormState } from "../context/form";
const ChiefProvider = (props) => {
  const [fileState, setFileState] = useState(initialFileState);
  const [fieldState, setFieldState] = useState(initialFieldState);
  const [authState, setAuthState] = useState(initialAuthState);
  const [formState, setFormState] = useState(initialFormState);

  return (
    <FileContext.Provider value={{ fileState, setFileState }}>
      <FieldContext.Provider value={{ fieldState, setFieldState }}>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <FormContext.Provider value={{ formState, setFormState }}>
            {props.children}
          </FormContext.Provider>
        </AuthContext.Provider>
      </FieldContext.Provider>
    </FileContext.Provider>
  );
};

export default ChiefProvider;
