/**
 * 判断是图片还是视频格式
 * @param fileName
 * @returns
 */
const judgeMediaType = (fileName: String) => {
  // 后缀获取
  var suffix = '';
  // 获取类型结果
  var result: unknown = '';

  try {
    var fileArr = fileName.split('.');
    suffix = fileArr[fileArr.length - 1];
  } catch (err) {
    suffix = '';
  }
  // fileName无后缀返回 false
  if (!suffix) {
    result = false;
    return result;
  }
  // 图片格式
  var imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'];

  // 进行图片匹配
  result = imgList.some((item) => {
    return item == suffix;
  });
  if (result) {
    result = 'image';
    return result;
  }
  // 匹配txt
  var txtList = ['txt'];
  result = txtList.some((item) => {
    return item == suffix;
  });
  if (result) {
    result = 'txt';
    return result;
  }
  // 匹配 excel
  var excelList = ['xls', 'xlsx'];
  result = excelList.some((item) => {
    return item == suffix;
  });
  if (result) {
    result = 'excel';
    return result;
  }
  // 匹配 word
  var wordList = ['doc', 'docx'];
  result = wordList.some((item) => {
    return item == suffix;
  });
  if (result) {
    result = 'word';
    return result;
  }
  // 匹配 pdf
  var pdfList = ['pdf'];
  result = pdfList.some((item) => {
    return item == suffix;
  });
  if (result) {
    result = 'pdf';
    return result;
  }
  // 匹配 ppt
  var pptList = ['ppt'];
  result = pptList.some((item) => {
    return item == suffix;
  });
  if (result) {
    result = 'ppt';
    return result;
  }
  // 匹配 视频
  var videoList = ['mp4', 'm2v', 'mkv'];
  result = videoList.some((item) => {
    return item == suffix;
  });
  if (result) {
    result = 'video';
    return result;
  }
  // 匹配 音频
  var radioList = ['mp3', 'wav', 'wmv'];
  result = radioList.some((item) => {
    return item == suffix;
  });
  if (result) {
    result = 'radio';
    return result;
  }
  // 其他 文件类型
  result = 'other';

  return result;
};

/**
 * 校验手机号
 * @param val
 */
const validatorPhone = (val: string) => {
  let reg = /^1[3456789]\d{9}$/;
  return reg.test(val);
};

/**
 * 校验登录密码   同时包含英文字母（区分大小写）、阿拉伯数字和常规符号（英文符号） 至少包含2种字符
 * @param val
 * @returns
 */
const validatorPassword = (val: string) => {
  let reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
  return reg.test(val);
};

const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// clear
const clearObject = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  }
};

export default {
  judgeMediaType,
  validatorPhone,
  validatorPassword,
  getBase64,
  clearObject,
};
