const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

/** Writes _data/manifest.json so Jekyll can reference hashed assets. */
class ManifestPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap("ManifestPlugin", (compilation) => {
      const manifest = {};
      for (const [name, entrypoint] of compilation.entrypoints) {
        const entryFiles = entrypoint.getFiles ? entrypoint.getFiles() : [];
        for (const file of entryFiles) {
          const ext = path.extname(file).slice(1);
          manifest[`${name}_${ext}`] = `/assets/dist/${file}`;
        }
      }
      const dataDir = path.resolve(__dirname, "_data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(path.join(dataDir, "manifest.json"), JSON.stringify(manifest, null, 2));
    });
  }
}

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const analyze = env && env.analyze;

  const plugins = [
    new MiniCssExtractPlugin({
      filename: isProd ? "[name].[contenthash:8].css" : "[name].css",
    }),
    new ManifestPlugin(),
  ];

  if (analyze) {
    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    entry: {
      main: path.resolve(__dirname, "src/main.js"),
    },
    output: {
      path: path.resolve(__dirname, "assets/dist"),
      filename: isProd ? "[name].[contenthash:8].js" : "[name].js",
      clean: true,
    },
    devtool: isProd ? false : "source-map",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: { drop_console: isProd },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins,
    stats: "minimal",
  };
};
