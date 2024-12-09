import axios from 'axios';
import { nanoid } from 'nanoid';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';

export async function isNewVersion() {
  const url = `//${window.location.host}/version.json?id=${nanoid(10)}`;
  // 使用 Axios 发起了一个 get 请求，获取版本信息的 json 文件。
  try {
    const res = await axios.get(url);
    //   获取版本号。
    const version = res.data.version;
    //   从本地存储中获取了之前保存的版本号
    const localVersion = localStorage.getItem('version');
    //   检查本地存储的版本号是否存在且与当前版本号不一致
    if (localVersion && localVersion !== version) {
      Modal.warning({
        title: '系统提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '发现新的版本，请刷新页面后使用！',
        onOk() {
          localStorage.setItem('version', version);
          window.location.reload();
        },
      });
    } else {
      // 如果没有发现新版本，则仅将当前版本号保存到本地存储中。
      localStorage.setItem('version', version);
    }
  } catch (error) {
    console.log(error);
  }
}
