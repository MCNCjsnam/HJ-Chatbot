<template>
  <div class="container">
    <div class="main-content">
      <div class="chat-history">
        <div v-for="(groupedHistory,idx) in groupedHistory" :key="idx" class="mb-30">
          <div class="chat-title">{{groupedHistory.date}}</div>
          <div class="history-list">
            <div class="history-item" v-for="(items,idx) in groupedHistory.items" :key="idx"
            @click="fetchHistoryDetail(items.seq)">{{ items.title }}</div>
          </div>
        </div>
      </div>

      <div class="chat-area">
        <div
          class="chat-contents"
          v-for="(chatList, idx) in chatList"
          :key="idx"
        >
          <div class="chat-card userchat">{{ chatList.userMessage }}</div>
          <div class="chat-card aichat">
            <img
              class="chat-aiImg"
              src="@/assets/img/chat-icon.png"
              @click="todoRobot"
            />
            <span>{{ chatList.aiMessage }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="search-content footer-fix">
      <input
        class="input01"
        type="text"
        placeholder="메시지를 입력하세요"
        v-model="inpMessage"
        v-on:keyup.enter="fetchMessage()"
      />
      <button class="btn01 ml-5" @click="fetchMessage()">전송</button>
    </div>

    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      background-color="#000"
      color="#fff"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "@/assets/css/global.scss";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const route = useRoute();
const router = useRouter();

/* 채팅관련 */
const inpMessage = ref(history.state.inpMessage); // 사용자 메시지
const chatList = ref([]);                         // 봇 메시지
const isLoading = ref(false);                     // 로딩 상태
const randomCode = ref();                         // 랜덤 코드

/* 히스토리 */
const groupedHistory = ref({});   //날짜별로 묶은 데이터

onMounted(async () => {
  await fetchHistory();
  
  if(route.params.randomCode) {
    randomCode.value = route.params.randomCode;
  }

  if (inpMessage.value) {
    await fetchMessage();
  }
});

/* 메시지 전송 */
async function fetchMessage() {
  try {
    isLoading.value = true; // Start loading

    const response = await axios.post("/api/chat-service/api/v1/gpt/question", {
      messages: [inpMessage.value],
    });

    const result = await response.data;
    if (result.code === 200) {
      chatList.value.push({
        userMessage: inpMessage.value,
        aiMessage: result.data.messages[0],
      });
    } 
    else {
      alert("회사내부망이용 및 임현영 연구원을 찾아가세요");
    }
  } 
  catch (error) {
    alert('임현영 연구원이 서버를 껏습니다. 임현영에게 찾아가세요');
  } 
  finally {
    isLoading.value = false;
    inpMessage.value = '';
  }
}

/* 메시지 히스토리 */
async function fetchHistory() {
  try {
    isLoading.value = true; // Start loading

    const response = await axios.get("/api/chat-service/api/v1/gpt/history");
    const result = await response.data;

    if (result.code === 200) {
      const historyList = result.data.historyList;

      // 날짜별로 데이터를 그룹화
      groupedHistory.value = historyList.reduce((acc, item) => {
        const dateKey = item.date.split(' ')[0]; // Extract the date (e.g., "2024-11-26")

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(item);

        return acc;
      }, {});

      // 날짜별 그룹을 배열로 변환
      groupedHistory.value = Object.keys(groupedHistory.value).map(date => ({
        date,
        items: groupedHistory.value[date]
      }));

    } else {
      alert("회사 내부망을 이용하고, 임현영 연구원을 찾아가세요.");
    }
  } 
  catch (error) {
    alert('임현영 연구원이 서버를 껐습니다. 임현영에게 찾아가세요.');
  } 
  finally {
    isLoading.value = false;
    inpMessage.value = '';
  }
}

/* 메시지 히스토리 디테일 */
async function fetchHistoryDetail(chatID) {
  try {
    isLoading.value = true;

    randomCode.value = chatID;
    const newRoute = { ...route, params: { ...route.params, randomCode: chatID } };
    router.push(newRoute);

    const response = await axios.get("/api/chat-service/api/v1/gpt/history/detail", {
      params: {
        seq: chatID,  // chatID 값을 params로 전달
      },
    });

    const result = await response.data;
    if (result.code === 200) {
      chatList.value = [];
      const qnaList = result.data.qnaList;

      qnaList.forEach(item => {
        chatList.value.push({
          userMessage: item.question,
          aiMessage: item.answer,
        });
      });
    } else {
      alert("회사내부망이용 및 임현영 연구원을 찾아가세요");
    }
  } 
  catch (error) {
    alert('임현영 연구원이 서버를 껏습니다. 임현영에게 찾아가세요');
  } 
  finally {
    isLoading.value = false;
    inpMessage.value = '';
  }
}



function todoRobot() {
  alert("임현영은 남자이며 아직 준비중입니다.");
}
</script>

<style></style>