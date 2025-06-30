import {resultHelper} from "../_base/result";

const failureMessage = {
  auth: {
    unavailable: 'Auth unavailable',
  },
};

export const ProfileResult = {
  failure: {
    auth: {
      unavailable: resultHelper.failure(failureMessage.auth.unavailable),
    },
  },
  succeed: <T = string>(value: T) => resultHelper.success(value),
};
