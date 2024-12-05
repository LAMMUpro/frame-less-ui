import type { StorybookConfig } from "@storybook/vue3-vite";
import './manager';

const config: StorybookConfig = {
  stories: ["../docs/**/*.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // staticDirs: ['../public'],
};
export default config;
