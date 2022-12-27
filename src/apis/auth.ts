import { mainAxios } from "@/libs/axios";

/**Login Props type */
interface LoginProps {
  userName: string;
  password: string;
}

export const loginApi = (payload: LoginProps) => {
  return mainAxios.request({
    methodType: "POST",
    url: `/auth/sign-in-new`,
    payload: payload,
    config: {
      headers: {
        contentType: "application/json",
      },
    },
  });
};

/** Get NewSletter Type */
interface NewSletterProps {
  page?: any;
  size?: any;
  query?: any;
  startTime?: any;
  endTime?: any;
  categoryCode?: "NEWS";
  titleSearch?: any;
  authorSearch?: any;
  contentSearch?: any;
  categories?: any;
  hashtag?: any;
}


export const getNewSletterList = (payload: NewSletterProps) => {
  return mainAxios.request({
    methodType: "POST",
    url: `/article/get-all`,
    payload: payload,
    requiresToken: true,
    notError: true,
    getError: true,
    config: {
      headers: {
        contentType: "application/json",
      },
    },
  });
};