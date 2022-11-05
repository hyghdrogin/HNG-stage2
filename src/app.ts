import express from "express";
import cors from "cors";
import {
  operation, RequestInterface, TaskOneInterface, TaskTwoInterface
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
    let { x, y, operation_type }: RequestInterface = req.body;
    if (!operation_type && !x && !y) {
      return errorResponse(res, 400, "Invalid inputs");
    }
    x = Number(x);
    x = Number(y);
    const addition = ["addition", "sum", "add", "plus", "summation", "altogether", "together", "total", "increase"];
    const subtraction = ["subtraction", "minus", "subtract", "decrease", "discount", "diminution", "subduction", "difference"];
    const multiplication = ["multiplication", "product", "multiply", "times"];
    const opArray = operation_type.split(" ");
    // console.log(opArray);
    // eslint-disable-next-line array-callback-return
    const opNumbers = opArray.filter((num) => {
      if (parseInt(num, 10) && typeof parseInt(num, 10) === "number") {
        return num;
      }
    });
    x = parseInt(opNumbers[0], 10);
    y = parseInt(opNumbers[1], 10);
    let result;
    for (let i = 0; i < addition.length; i++) {
      if (opArray.includes(addition[i])) {
        operation_type = operation.addition;
        result = x + y;
      }
    }
    for (let i = 0; i < subtraction.length; i++) {
      if (opArray.includes(subtraction[i])) {
        operation_type = operation.subtraction;
        result = x - y;
      }
    }
    for (let i = 0; i < multiplication.length; i++) {
      if (opArray.includes(multiplication[i])) {
        operation_type = operation.multiplication;
        result = x * y;
      }
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
