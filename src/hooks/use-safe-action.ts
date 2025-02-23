import { Schema } from "next-safe-action/adapters/types";
import {
  HookBaseUtils,
  HookCallbacks,
  HookSafeActionFn,
  UseActionHookReturn,
  useAction,
} from "next-safe-action/hooks";
import { toast } from "sonner";

export const useSafeAction = <
  ServerError,
  S extends Schema | undefined,
  const BAS extends readonly Schema[],
  CVE,
  CBAVE,
  Data,
>(
  safeActionFn: HookSafeActionFn<ServerError, S, BAS, CVE, CBAVE, Data>,
  utils: HookBaseUtils<S> &
    HookCallbacks<ServerError, S, BAS, CVE, CBAVE, Data> = {},
  customOptions: {
    displayErrorToast: boolean;
  } = {
    displayErrorToast: true,
  },
): UseActionHookReturn<ServerError, S, BAS, CVE, CBAVE, Data> => {
  type OnErrorType = typeof utils.onError;

  const onError: OnErrorType = ({ error }) => {
    console.error(error);
    let errorMessage = "Please try again later";
    if (typeof error.serverError === "string") {
      errorMessage = error.serverError;
    } else if (error.validationErrors) {
      errorMessage = Object.entries(error.validationErrors)
        .map(([key, value]) => {
          if (
            typeof value === "object" &&
            value &&
            "_errors" in value &&
            Array.isArray(value._errors)
          ) {
            return `${key}: ${value._errors.join(", ")}`;
          }
        })
        .join("\n");
    }
    toast.dismiss();
    toast.error(errorMessage);
  };

  if (customOptions.displayErrorToast) {
    const oldOnError = utils.onError;
    utils.onError = (args) => {
      onError(args);
      if (oldOnError) {
        oldOnError(args);
      }
    };
  }

  return useAction(safeActionFn, utils);
};