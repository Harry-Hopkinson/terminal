import React from "react";
import config from "../../config.json";
import { isRootUser } from "../utils/bin/commands";
import { isSourceDir } from "../utils/bin/commands";

export const Ps1 = () => {
  return (
    <div>
      <span className="text-light-yellow dark:text-dark-yellow">
        {config.ps1_username}
      </span>
      <span className="text-light-gray dark:text-dark-gray">@</span>
      <span className="text-light-green dark:text-dark-green">
        {isRootUser ? config.ps1_hostname : config.ps1_username}
      </span>
      {isSourceDir ? (
        <span className="text-light-gray dark:text-dark-gray">:src ~ </span>
      ) : (
        <span className="text-light-gray dark:text-dark-gray">:$ ~ </span>
      )}
    </div>
  );
};

export default Ps1;
