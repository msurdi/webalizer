import bodyParser from "body-parser";
import express from "express";
import "express-async-errors";
import run from "../../lib/run";
import urls from "../../lib/urls";

const app = express();

app.use(bodyParser.json());

app.post(urls.run(), async (req, res) => {
  const { command } = req.body;

  const output = await run(command);

  res.send({ output });
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default app;
