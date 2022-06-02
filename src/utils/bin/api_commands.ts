// // List of commands that require API calls

import { getProjects } from '../api';
import { getQuote } from '../api';
import { getWeather } from '../api';

export const projects = async (): Promise<string> => {
  const projects = await getProjects();
  return projects
    .map(
      (repo: { name: any; html_url: any }) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');
};

export const quote = async (): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) {
    return 'Usage: weather [city]. Example: weather London';
  }
  const weather = await getWeather(city);
  return weather;
};
