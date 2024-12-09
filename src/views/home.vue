<template>
  <div class="overflow-hidden">
    <a-row type="flex" class="w-screen h-screen flex-row overflow-x-auto" style="flex-flow: row">
      <a-col flex="160px"></a-col>
      <a-col flex="auto" style="width: calc(100% - 160px)">
        <div class="w-full p-4 overflow-x-hidden">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup></script>
