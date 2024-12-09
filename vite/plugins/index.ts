import type { PluginOption } from 'vite';
import createAutoImport from './auto-import';
import commonjs from '@rollup/plugin-commonjs';
import viteCompression from 'vite-plugin-compression';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    commonjs() as any,
    vue(),
    /**
     * 自动引入 AntDesign 组件库 及自定义组件
     */
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })],
      dirs: ['src/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/],
      dts: 'src/components/components.d.ts',
    }),
  ];
  /**
   * 创建自动引入Vue 所有方法
   */
  vitePlugins.push(createAutoImport());
  /**
   * 对大于 1mb 的文件进行压缩
   */
  vitePlugins.push(
    viteCompression({
      threshold: 1024,
    })
  );

  return vitePlugins;
}
