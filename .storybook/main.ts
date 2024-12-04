import type { StorybookConfig } from "@storybook/react-vite";
import './manager.tsx';

const config: StorybookConfig = {
  stories: ["../docs/**/*.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // staticDirs: ['../public'],
};
export default config;
