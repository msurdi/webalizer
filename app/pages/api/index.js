import bodyParser from "body-parser";
import express from "express";
import "express-async-errors";
import findScripts from "../../lib/core/find-scripts";
import run from "../../lib/core/run";
import urls from "../../lib/urls";

const app = express();

app.use(bodyParser.json());

app.get(urls.scripts(), async (req, res) => {
  const scripts = await findScripts();
  return res.send({ scripts });
});

app.post(urls.run(), async (req, res) => {
  const { command } = req.body;
  const result = await run(command);
  return res.send(result);
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default app;
