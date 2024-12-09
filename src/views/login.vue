<template>
  <a-row class="w-screen h-screen" type="flex">
    <a-col :lg="12">
      <div class="flex-col">
        <a-row class="mt-8" type="flex" align="middle">
          <a-col :span="2" :offset="1">
            <img src="@/assets/image/logo.png" class="w-20 h-20 object-scale-down" />
          </a-col>
          <a-col :span="12">
            <span class="text-[36px] font-black text-[#1C2733]">众信旅游</span>
          </a-col>
        </a-row>
        <a-row class="mt-20" type="flex">
          <a-col :span="8" :offset="3">
            <img src="@/assets/image/Welcome.png" class="w-52 h-12 object-scale-down" />
          </a-col>
        </a-row>
        <a-row class="mt-[18px]" type="flex">
          <a-col :span="14" :offset="3">
            <p class="text-left ml-4 font-semibold">您的账号和密码由英文字母(区别大小写)，阿拉伯数字和常规符号(英文符号)组成，如您还未拥有账号，请联系网站管理员~~</p>
          </a-col>
        </a-row>
        <div v-if="isLogin">
          <a-row class="mt-11" type="flex" justify="start">
            <a-col :offset="3" :xl="14" :xs="18">
              <div class="h-[56px] text-[#1C2733] text-[18px] font-medium flex items-center ml-4">欢迎访问众信旅游</div>
            </a-col>
          </a-row>
          <a-row class="mt-9" type="flex" justify="start">
            <a-col :offset="3" :xl="14" :xs="18">
              <div class="h-[56px] text-[#1C2733] text-[18px] font-medium flex items-center ml-4">
                {{ account }}
              </div>
            </a-col>
          </a-row>
          <a-row class="mt-9" type="flex" justify="start">
            <a-col :offset="3" :xl="14" :xs="18" @click="getMenus">
              <div class="h-[56px] bg-[#1C2733] justify-center flex items-center text-white rounded-lg ml-4 cursor-pointer">访问首页(0{{ countDown }}s)</div>
            </a-col>
          </a-row>
        </div>
        <div v-else>
          <a-row class="mt-11" type="flex" justify="start">
            <a-col :offset="3" :xl="14" :xs="18">
              <div class="h-[56px] justify-center flex items-center text-white rounded-lg ml-4">
                <a-input v-model:value="account" placeholder="账号/手机号" class="h-full text-lg" @pressEnter="onLogin" />
              </div>
            </a-col>
          </a-row>
          <a-row class="mt-9" type="flex" justify="start">
            <a-col :offset="3" :xl="14" :xs="18">
              <div class="h-[56px] justify-center flex items-center text-white rounded-lg ml-4">
                <a-input-password v-model:value="password" placeholder="登录密码" class="h-full text-lg" @pressEnter="onLogin" />
              </div>
            </a-col>
          </a-row>
          <a-row class="mt-9" type="flex" justify="start">
            <a-col :offset="3" :xl="14" :xs="18" @click="onLogin" v-if="canLogin">
              <div class="h-[56px] bg-[#1C2733] justify-center flex items-center text-white rounded-lg ml-4 cursor-pointer">登录</div>
            </a-col>
            <a-col :offset="3" :xl="14" :xs="18" v-else>
              <div class="h-[56px] bg-stone-300 justify-center flex items-center text-white rounded-lg ml-4 cursor-pointer">登录</div>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-col>
    <a-col :lg="12">
      <a-carousel autoplay>
        <img src="@/assets/image/login-bg1.png" class="h-screen w-full" />
        <img src="@/assets/image/login-bg2.png" class="h-screen w-full" />
      </a-carousel>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
// const { authLogin, getAdminPermission } = api;
let account = ref('');
let password = ref('');
const router = useRouter();
const isLogin = ref(false);
const countDown = ref(3);
const timer = ref();
const canLogin = computed(() => {
  return account.value.length && password.value.length;
});

const onLogin = async () => {
  if (!canLogin.value) return;

  try {
    // let data: AuthLoginResponse = await authLogin(account.value, password.value);
    // sessionStorage.setItem('tokenValue', data.saToken);
    // sessionStorage.setItem('loginId', data.id);
    isLogin.value = true;
    timer.value = setInterval(async () => {
      countDown.value--;
      if (countDown.value === 0) {
        await getMenus();
      }
    }, 1000);
  } catch (e) {}
};

//获取权限菜单
const getMenus = async () => {
  try {
    clearInterval(timer.value);
    // let data: PermissionList[] = await getAdminPermission(sessionStorage.getItem('loginId'));
    // data.sort((a: PermissionList, b: PermissionList) => a.data.sortNo - b.data.sortNo);
    // let filteredData = data.filter((v) => v.childrenNodes.length > 0);

    // if (filteredData.length) {
    //   sessionStorage.setItem('permissionMenus', JSON.stringify(filteredData));
    //   //处理权限列表，找出第一个有子目录的
    //   let menuList = filteredData[0] as PermissionList;

    //   //跳转第一级菜单
    //   if (menuList && menuList.childrenNodes && menuList.childrenNodes.length) {
    //     router.replace({ path: menuList.childrenNodes[0].data.path });
    //   }
    // }
  } catch (e) {}
};
</script>
<style lang="scss" scoped></style>
