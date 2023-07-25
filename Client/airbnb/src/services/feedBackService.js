import axios from "axios";
import { message } from "antd";
import { https } from "./axiosClient";

export let feedBackService = {

  create: (data) => {
    return https.post(`/api/v1/feedbacks`,data);
  },
  
};
