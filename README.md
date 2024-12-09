## 项目简介

### 技术栈

- 前端框架：(Vue3 + TS + tailwindcss + vue-hooks-plus)
- 状态管理：[pinia](https://pinia.vuejs.org/zh/)
- 组件 AntDesign https://next.antdv.com/components/overview-cn

### 📦 项目源码

1. 安装 nvm node 版本控制器 调整 node 版本 20.15.1
   GitHub 地址 (如果更新地址自行查找)

   \*\*必须安装在默认目录下 否则不能全局使用 nvm 命令
   https://github.com/coreybutler/nvm-windows/releases

   安装完成后 再执行一下命令

```shell
nvm install 20.15.1
```

```shell
nvm use 20.15.1
```

```shell
node -v
```

2. 安装依赖

```shell
npm install -g yarn
```

```shell
yarn install
```

3. 运行程序

```shell
yarn run dev
```

```shell
yarn cache clean
```

5.  (gitignore 不生效的时候运行 缓存的更新，防止提交不必要的文件) -> (切记按顺序来执行)

```shell
git rm -r --cached .
```

```shell
git add .
```

```shell
git commit -m "Update .gitignore"
```

### 工程结构解析

```
├── dist                       # 打包文件夹（可删除重新打包）
├── public                     # 静态资源
├── src                        # 源代码
│   ├── api                    # 接口文件
│   ├── components             # 全局组件
│   ├── hooks                  # 组件共用方法集
│   ├── stores                 # 全局 pinia store
│       └── index.ts           # store 入口
│   ├── types                  # 类型声明文件
│       └── auto-imports.d.ts  # 全局自动引入vue声明
│   ├── assets                 # 类型声明文件
│      ├── image               # 图片资源
│      └── style               # 全局样式
│          └── index.scss      # 全局sass样式调用
│   ├── router                 # 路由文件
│       └── index.ts
│   ├── views                  # 页面文件
│   ├── utils                  # 全局方法
│      ├── directives          # 指令类方法
│      ├── index.ts            # 工具类方法
│      ├── filter.ts           # 过滤工具类方法
│      ├── version.ts          # 版本工具类方法
│      ├── filter.ts           # 过滤工具类方法
│      └── request
│          └── index.ts        # 请求类方法
│   ├── App.vue                # 入口页面
│   ├── main.ts                # Vue初始化入口文件
├── vite                       # vite 配置
│   └── plugins                # vite 插件
├── .env.dev                   # 测试环境配置
├── .env.pro                   # 生产环境配置
├── .gitignore                 # git 忽略文件
├── index.html                 # H5 端首页
├── package.json               # package.json 依赖
├── tsconfig.json              # typescript 配置
├── tsconfig.node.json         # typescript 在node环境中的配置
├── tailwind.config            # 全局引用样式的css的配置
└── vite.config.ts             # vite 配置
```
