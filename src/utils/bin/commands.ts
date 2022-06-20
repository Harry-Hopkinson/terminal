import * as bin from "./index";
import config from "../../../config.json";

export var isRootUser: boolean = false;
export var isRootDir: boolean = true;
export var isSourceDir: boolean = false;

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

export const repo = async (): Promise<Window> => {
  return window.open(`${config.repo}`);
};

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

export const echo = async (args: string[]): Promise<string> => {
  return args.join(" ");
};

export const cat = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    return "cat: missing file operand";
  }
  if (isRootDir) {
    if (
      args[0].toLowerCase() === "readme" ||
      args[0].toLowerCase() === "readme.md"
    ) {
      return "Welcome to my Website";
    } else if (args[0].toLowerCase() === "license") {
      return "MIT License";
    }
  } else if (isSourceDir) {
    if (
      args[0].toLowerCase() === "index" ||
      args[0].toLowerCase() === "index.js"
    ) {
      return "console.log('Hello World!');";
    }
  } else {
    return "File not Found";
  }
};

export const cd = async (args: string[]): Promise<string> => {
  if (isRootDir) {
    isSourceDir = false;
  }
  if (isSourceDir) {
    isRootDir = false;
  }
  if (args.length === 0) {
    return "cd: missing directory";
  } else if (args[0] === "..") {
    if (isSourceDir) {
      isSourceDir = false;
      isRootDir = true;
    }
  } else if (args[0] === ".") {
    return;
  } else if (args[0] === "src") {
    isRootDir = false;
    isSourceDir = true;
  } else {
    return "cd: " + args[0] + ": No such file or directory";
  }
};

export const whoami = async (): Promise<string> => {
  if (isRootUser) {
    return "root";
  }
  return "user";
};

export const ls = async (): Promise<string> => {
  if (isRootDir) {
    return `.github
.husky
demo
install
public
src
README
LICENSE`;
  } else if (isSourceDir) {
    return `index.js`;
  }
};

export const date = async (): Promise<string> => {
  return new Date().toString();
};

export const sudo = async (): Promise<string> => {
  if (isRootUser) {
    return "You are already a Root User";
  }
  isRootUser = true;
  return "You are now a Root User";
};

export const su = async (): Promise<String> => {
  if (isRootUser) {
    isRootUser = false;
    return "You are now a Standard User";
  } else {
    return "You are already a Standard User";
  }
};

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
Type 'sudo' to become a Root User.
Type 'weather [city]' to see the weather forecast for a city.
`;
};
