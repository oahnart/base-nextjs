import { mainAxios } from "@/libs/axios";

/**Faq Props type */
interface faqProps {
  page?: number;
  size?: number;
  querySearch?: string;
}

export const faqApi = (params: faqProps) => {
  return mainAxios.request({
    methodType: "GET",
    url: `/faq/all-faq`,
    params: params,
    notError: true,
  });
};