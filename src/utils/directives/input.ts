export default {
  mounted(el) {
    setTimeout(() => {
      const suffix = el.getElementsByClassName('ant-input-suffix')[0];
      if (suffix) {
        const input = el.getElementsByClassName('ant-input')[0];
        trim(input);
      } else {
        // 没有清除图标
        trim(el);
      }
    }, 100);
  },
};
const trim = (el) => {
  // 当按下按键时运行脚本
  el.onblur = () => {
    // 去除前后空格:
    el.value = el.value.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
  };
  // 当松开按键时运行脚本
  el.onblur = () => {
    // 去除前后空格:
    el.value = el.value.replace(/^\s+|\s+$/g, '');
  };
};
