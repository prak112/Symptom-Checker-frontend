import { useContext } from "react";
import { AlertContext } from "./AlertContext";

/**
 * Custom hook that provides access to the alert context.
 * @returns {AlertContext} The alert context object.
 */

export const useAlert = () => useContext(AlertContext);
