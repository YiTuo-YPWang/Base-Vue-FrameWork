import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';
import createVitePlugins from './vite/plugins';
import fs from 'fs';

// 打包文件时候 更新版本号 用作判断是否要刷新页面
function updateVersion() {
  return {
    name: 'update-version',
    buildStart() {
      let version: any = 0;
      try {
        // 读取 json 文件里面版本号
        const packageJson = JSON.parse(fs.readFileSync('public/version.json', 'utf-8'));
        version = Number(packageJson.version);
        version = (version + 0.1).toFixed(1); // 增加0.1并保留1位小数
      } catch (error) {
        console.log(error);
      }
      const versionData = { version: version.toString() }; // 根据需要生成新版本号
      // 写入 json 文件里面版本号
      fs.writeFileSync('public/version.json', JSON.stringify(versionData, null, 2));
    },
  };
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const isProduction = mode === 'prod';

  return {
    // 构建配置
    build: {
      target: 'es2015', // target: 构建的目标环境，默认为浏览器环境。
      // sourcemap: 构建后是否生成 source map 文件
      // source map 文件用于调试，允许开发者在部署后的代码中查看未压缩的源代码。
      // 在生产环境中通常会禁用以减少文件体积，并防止源代码暴露。
      sourcemap: !isProduction,
      // minify: 使用的代码压缩工具
      // 'terser' 是一种 JavaScript 压缩工具，能有效减小构建后文件的体积。
      minify: isProduction ? 'terser' : false,
      // minify: false,
      // terserOptions: 配置 terser 压缩工具的选项
      // compress: 配置压缩选项
      terserOptions: {
        compress: {
          drop_console: true, // drop_console: 去除所有 console 语句
          drop_debugger: true, // drop_debugger: 去除所有 debugger 语句
        },
      },
      manifest: true, // 生成 manifest 文件
      rollupOptions: {
        // rollupOptions: Rollup 的构建选项 // external: 指定哪些模块不被打包到构建结果中。
        external: [], // ["axios"],
        output: {
          entryFileNames: 'assets/[name].[hash].js', // 使用 hash 进行版本控制
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
        },
      },
      cssCodeSplit: true, // 启用 CSS 分割
    },
    // plugins: 使用自定义插件，这里通过 createVitePlugins 函数来创建插件列表。
    plugins: [createVitePlugins(), isProduction && updateVersion()],
    base: '/',
    // 模块解析配置
    resolve: {
      alias: {
        // alias: 配置模块路径别名  // 例如，使用 "@" 代表项目中的 "src" 目录，使用 "#" 代表 "src/types" 目录。
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'src/types'),
      },
      // extensions: 配置模块文件扩展名，这些扩展名在导入时可以省略。
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    server: {
      open: false, // open: 在服务器启动时是否自动在浏览器中打开应用程序
      proxy: {
        '/api': {
          target: env.VITE_SERVICE_BASE_URL, // target: 代理的目标地址，通常是后端服务器的地址
          changeOrigin: true, // changeOrigin: 是否更改请求的源头，设置为 true 时，会将主机头的来源更改为目标 URL。
        },
      },
      hmr: true,
    },
    // css预处理器
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/style/index.scss";`,
          api: 'modern-compiler',
        },
      },
    },
    // 依赖优化配置
    optimizeDeps: {
      // 这些依赖会在开发服务器启动时被 Vite 预构建，以提高开发环境的性
      include: ['axios', 'pinia', 'vue', 'vue-router'],
    },
  };
});
