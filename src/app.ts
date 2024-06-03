import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1/students', StudentRoutes);
// app.use('/api/v1/users', UserRoutes);

app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  console.log("hi from get");

  const a = "kjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk";

};

app.get("/", getAController);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
