import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
  //baseURL: "http://ec2-46-137-199-250.ap-southeast-1.compute.amazonaws.com:8000",
  headers: {
    "Content-type": "application/json"
  }
});