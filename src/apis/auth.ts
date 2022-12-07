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