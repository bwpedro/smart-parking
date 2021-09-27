import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), reactRefresh()],
  resolve: {
    alias: [
      {
        find: /^@material-ui\/icons\/(.*)/,
        replacement: "@material-ui/icons/esm/$1",
      },
      {
        find: /^@material-ui\/core\/(.+)/,
        replacement: "@material-ui/core/es/$1",
      },
      {
        find: /^@material-ui\/core$/,
        replacement: "@material-ui/core/es",
      },
    ],
  },
});
