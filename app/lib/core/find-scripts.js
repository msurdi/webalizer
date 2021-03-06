import glob from "fast-glob";
import fs from "fs-extra";
import getConfig from "next/config";
import path from "path";

const loadConfiguration = async (configurationFile) => {
  const { serverRuntimeConfig } = getConfig();
  const configurationFileAbsolutePath = path.join(
    serverRuntimeConfig.scriptsRoot,
    configurationFile.path
  );
  try {
    const configuration = await fs.readJson(configurationFileAbsolutePath);
    return {
      ...configuration,
      id: configurationFile.path,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Error loading configuration #{configurationFile}: `, error);
    return null;
  }
};

const findScripts = async () => {
  const { serverRuntimeConfig } = getConfig();
  const scriptConfigurationFiles = await glob("**/*.json", {
    objectMode: true,
    cwd: serverRuntimeConfig.scriptsRoot,
  });

  const scriptConfigurations = await Promise.all(
    scriptConfigurationFiles.map(loadConfiguration).filter(Boolean)
  );

  return scriptConfigurations;
};

export default findScripts;
