import React from "react";
import { commandExists } from "../utils/commandExists";
import { shell } from "../utils/shell";
import { handleTabCompletion } from "../utils/tabCompletion";
import { Ps1 } from "./Ps1";

export const Input = ({
  inputRef,
  containerRef,
  command,
  history,
  lastCommandIndex,
  setCommand,
  setHistory,
  setLastCommandIndex,
  clearHistory,
}) => {
  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: [string] = history
      .map(({ command }) => command)
      .filter((command: string) => command);

    switch (event.key) {
      case "c":
        if (event.ctrlKey) {
          event.preventDefault();
          setCommand("");
          setHistory("");
          setLastCommandIndex(0);
        }
        break;

      case "l":
        if (event.ctrlKey) {
          event.preventDefault();
          clearHistory();
        }
        break;

      case "Tab":
        event.preventDefault();
        handleTabCompletion(command, setCommand);
        break;

      case "Enter":
        event.preventDefault();
        setLastCommandIndex(0);
        await shell(command, setHistory, clearHistory, setCommand);
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
        break;

      case "13":
        event.preventDefault();
        setLastCommandIndex(0);
        await shell(command, setHistory, clearHistory, setCommand);
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
        break;

      case "ArrowUp":
        event.preventDefault();
        if (!commands.length) {
          return;
        }
        const posIndex: number = lastCommandIndex + 1;
        if (posIndex <= commands.length) {
          setLastCommandIndex(posIndex);
          setCommand(commands[commands.length - posIndex]);
        }
        break;

      case "ArrowDown":
        event.preventDefault();
        if (!commands.length) {
          return;
        }
        const negIndex: number = lastCommandIndex - 1;
        if (negIndex > 0) {
          setLastCommandIndex(negIndex);
          setCommand(commands[commands.length - negIndex]);
        } else {
          setLastCommandIndex(0);
          setCommand("");
        }
        break;
    }
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(value);
  };

  return (
    <div className="flex flex-row space-x-2">
      <label htmlFor="prompt" className="flex-shrink">
        <Ps1 />
      </label>

      <input
        ref={inputRef}
        id="prompt"
        type="text"
        className={`bg-light-background dark:bg-dark-background focus:outline-none flex-grow ${
          commandExists(command) || command === ""
            ? "text-dark-green"
            : "text-dark-red"
        }`}
        value={command}
        onChange={onChange}
        autoFocus
        onKeyDown={onSubmit}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};

export default Input;
