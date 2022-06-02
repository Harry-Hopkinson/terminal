import React from "react";
import config from "../../config.json";
import { isRoot } from "../utils/bin/commands";

export const Ps1 = () => {
  return (
    <div>
      <span className="text-light-yellow dark:text-dark-yellow">
        {config.ps1_username}
      </span>
      <span className="text-light-gray dark:text-dark-gray">@</span>
      <span className="text-light-green dark:text-dark-green">
        {isRoot ? config.ps1_hostname : config.ps1_username}
      </span>
      <span className="text-light-gray dark:text-dark-gray">:$ ~ </span>
    </div>
  );
};

export default Ps1;
