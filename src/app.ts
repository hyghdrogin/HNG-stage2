import express from "express";
import cors from "cors";
import {
  RequestInterface, TaskOneInterface, TaskTwoInterface
} from "./utils/interface";
import { errorResponse, handleError } from "./utils/responses";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    const bio = "My name is Emmanuel Omopariola and I am a Backend Software Deverloper";
    const devDetails: TaskOneInterface = {
      slackUsername: "Hyghdrogin",
      backend: true,
      age: 25,
      bio
    };
    return res.json(devDetails);
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error");
  }
});

app.post("/", (req, res) => {
  try {
    const { x, y, operation_type }: RequestInterface = req.body;
    if (!operation_type || !x || !y) {
      return errorResponse(res, 400, "Invalid inputs");
    }
    const intX = Number(x);
    const intY = Number(y);
    let result;
    if (operation_type === "addition" || operation_type == /add/gi || operation_type == /plus/gi) {
      result = intX + intY;
    } else if (operation_type === "subtraction" || operation_type == /subtract/gi || operation_type == /minus/gi) {
      result = intX - intY;
    } else if (operation_type === "multiplication" || operation_type == /product/gi || operation_type == /multiply/gi) {
      result = intX * intY;
    } else {
      return errorResponse(res, 400, "Invalid Operation Type");
    }
    const outResult: TaskTwoInterface = {
      slackUsername: "Hyghdrogin",
      operation_type,
      result
    };
    return res.json(outResult);
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error");
  }
});

app.use((req, res) => res.status(404).send({
  status: "error",
  error: "Not found",
  message: "Route not correct kindly check url.",
}));

(async () => {
  app.listen(port, async () => {
    console.log(` API listening on ${port}`);
  });
})();

export default app;
