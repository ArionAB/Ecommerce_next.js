import { useState, useRef, useCallback, RefObject } from "react";

// Define a type for the state setter function
type StateSetterFunc<U> = (newValue: U) => void;

// Define the custom hook
export const useFormState = <T extends { [stateProp: string]: any }>(
  initialState: T | (() => T), // The initial state of the form
  onChange?: (newFormState: T, prevChangeField: keyof T | null) => void // Optional callback function to be called when the form state changes
): [
  formState: T,
  setFormProp: <FN extends keyof T>(fieldName: FN) => StateSetterFunc<T[FN]>,
  setFormState: (newState: T) => void,
  formStateRef: RefObject<T>
] => {
  // Create a ref object to store the memoized setters for each form field
  const memoizedSetters = useRef<
    Map<keyof T, <FN extends keyof T>(newVal: T[FN]) => void>
  >(new Map());

  // Use the useState hook to create a state variable for the form state
  const [formState, innerSetFormState] = useState<T>(() => {
    if (typeof initialState === "function") {
      return initialState();
    }
    return initialState;
  });

  // Create a ref object to store a reference to the form state object
  const formStateRef = useRef<T>(formState);

  // Define the setFormProp function that creates and memoizes a new state setter function for a specific form field
  const setFormProp = useCallback(
    <FN extends keyof T>(fieldName: FN): StateSetterFunc<T[FN]> => {
      // Check if a memoized setter function already exists for the field
      if (memoizedSetters.current.has(fieldName)) {
        // If so, return the existing memoized setter function
        return memoizedSetters.current.get(fieldName) as StateSetterFunc<T[FN]>;
      }

      // If not, create a new memoized setter function and store it in the memoizedSetters ref object
      const setterFunc = (newValue: T[FN]) => {
        // Use the innerSetFormState function from useState to update the form state
        innerSetFormState((prevState) => {
          // Create a new object with the updated field value
          const updatedState = {
            ...prevState,
            [fieldName]: newValue,
          };

          // Call the onChange callback function (if it exists) with the updated state and the name of the changed field
          if (onChange) {
            onChange(updatedState, fieldName);
          }

          // Update the formStateRef ref object with the updated state
          formStateRef.current = updatedState;

          // Return the updated state
          return updatedState;
        });
      };

      // Store the new memoized setter function in the memoizedSetters ref object
      //@ts-ignore
      memoizedSetters.current.set(fieldName, setterFunc);

      // Return the new memoized setter function
      return setterFunc;
    },
    [onChange]
  );

  // Define the setFormState function that updates the entire form state at once
  const setFormState = (newState: T) => {
    // Use the innerSetFormState function from useState to update the form state
    innerSetFormState((prevState) => {
      // Call the onChange callback function (if it exists) with the updated state and null for the name of the changed field
      if (onChange) {
        onChange(newState, null);
      }

      // Update the formStateRef ref object with the updated state
      formStateRef.current = newState;

      // Return the updated state
      return newState;
    });
  };
  return [formState, setFormProp, setFormState, formStateRef];
};

// Return an array with the form state, setForm
