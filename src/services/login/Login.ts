import axios from "axios";
import { API_URL } from "../config";
import { Credentials } from "@/interface/Login";

export async function fetchLogin(data: Credentials){
  return await axios
    .post(API_URL + "/api/v1/login", data)
    .then((response) => response.data)
}