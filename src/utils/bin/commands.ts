// List of commands that do not require API calls

import * as bin from "./index";
import config from "../../../config.json";

export var isRoot: boolean = false;

// Help
export const help = async (): Promise<string> => {
  var c = "";
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + "\n";
    } else {
      c += Object.keys(bin).sort()[i - 1] + " ";
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// Commands
export const commands = async (): Promise<string> => {
  var c = "";
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + "\n";
    } else {
      c += Object.keys(bin).sort()[i - 1] + " ";
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// Redirection
export const repo = async (): Promise<string> => {
  window.open(`${config.repo}`);
  return "Opening Github repository...";
};

// About
export const about = async (): Promise<string> => {
  return `Hi, I am ${config.name}. 
Welcome to my website!
More about me:
'sumfetch' - short summary.`;
};

export const github = async (): Promise<String> => {
  window.open(`https://github.com/${config.social.github}/`);
  return "Opening Github Profile";
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(" ");
};

export const cat = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    return "cat: missing file operand";
  }
  if (
    args[0].toLowerCase() === "readme" ||
    args[0].toLowerCase() === "readme.md"
  ) {
    return "Welcome to my Website";
  }
};

export const whoami = async (): Promise<string> => {
  if (isRoot) {
    return "root";
  }
  return "user";
};

export const ls = async (): Promise<string> => {
  return `.github
.husky
demo
install
public
src
README`;
};

export const date = async (): Promise<string> => {
  return new Date().toString();
};

export const sudo = async (): Promise<string> => {
  if (isRoot) {
    return "You are already a Root User";
  }
  isRoot = true;
  return "You are now a Root User";
};
// Banner
export const banner = (): string => {
  return `
  
██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗   ██╗    ██╗  ██╗ ██████╗ ██████╗ ██╗  ██╗██╗███╗   ██╗███████╗ ██████╗ ███╗   ██╗
██║  ██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ██║  ██║██╔═══██╗██╔══██╗██║ ██╔╝██║████╗  ██║██╔════╝██╔═══██╗████╗  ██║
███████║███████║██████╔╝██████╔╝ ╚████╔╝     ███████║██║   ██║██████╔╝█████╔╝ ██║██╔██╗ ██║███████╗██║   ██║██╔██╗ ██║
██╔══██║██╔══██║██╔══██╗██╔══██╗  ╚██╔╝      ██╔══██║██║   ██║██╔═══╝ ██╔═██╗ ██║██║╚██╗██║╚════██║██║   ██║██║╚██╗██║
██║  ██║██║  ██║██║  ██║██║  ██║   ██║       ██║  ██║╚██████╔╝██║     ██║  ██╗██║██║ ╚████║███████║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝


Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
Type 'github' to see my Github Profile.
Type 'sudo" to become a Root User.
`;
};
