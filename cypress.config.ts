import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'vpgii8',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
