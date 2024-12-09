import trimInput from './input'; // 获取焦点

const directives = {
  trimInput,
};

export default {
  install(app) {
    // 以安装的方式插到app中
    Object.keys(directives).forEach((key) => {
      // 遍历directives对象的key
      app.directive(key, directives[key]); // 将每个directive注册到app中
    });
  },
};
