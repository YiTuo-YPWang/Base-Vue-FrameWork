import autoImport from 'unplugin-auto-import/vite';
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers';

export default function createAutoImport() {
  return autoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    dts: './src/types/auto-imports.d.ts',
    /**
     * 自动导入utils 工具集里所有的文件及方法
     */
    dirs: ['./src/utils/**', './src/stores/**', './src/hooks/**', './src/api/**'],
    resolvers: [VueHooksPlusResolver()],
  });
}
