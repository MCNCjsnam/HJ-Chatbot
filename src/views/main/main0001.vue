<template>
  <div class="container">
    <div class="main-content">
      <div class="search-content">
        <div class="search-title">🤖 무엇을 도와드릴까요?</div>
        <div class="mt-5">
          <input 
            class="input01" 
            type="text" 
            placeholder="메시지를 입력하세요" 
            v-model="inpMessage"
            v-on:keyup.enter="goTochat"/>
          <button class="btn01 ml-5" @click="goTochat">전송</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from 'vue'
import "@/assets/css/global.scss";
import * as util from '@/shared/utils/util';

import { useRouter } from 'vue-router';

const router = useRouter();
const inpMessage = ref('');
function goTochat() {
  // state를 전달하면서 페이지 이동
  router.push({ name: 'main0002', query : { inpMessage: inpMessage.value } });
}
</script>

<style>
</style>
