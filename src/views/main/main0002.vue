<template>
  <div class="container">
    <div class="main-content">
      <div class="chat-area">
        <div class="chat-card userchat">AI, 오늘 날씨 어때?</div>
        <div class="chat-card aichat">
          안녕하세요! 오늘 날씨는 맑고 기온은 22도 정도입니다. 좋은 하루 되세요!
        </div>
        <div class="chat-card userchat">
          오, 좋다! 오늘 저녁 뭐 먹을지 고민 중인데, 추천 좀 해줘.
        </div>
        <div class="chat-card aichat">
          저녁으로는 치킨이나 피자가 괜찮을 것 같아요. 아니면 한식으로 불고기도
          좋은 선택이에요!
        </div>
        <div class="chat-card userchat">
          불고기 좋다! 그럼 나중에 레시피 좀 알려줘.
        </div>
        <div class="chat-card aichat">
          물론이죠! 언제든지 레시피 준비해드릴게요.
        </div>
        <div class="chat-card userchat">고마워, AI! 정말 똑똑하네.</div>
        <div class="chat-card aichat">
          감사합니다! 언제든지 도움이 필요하면 말씀해주세요!
        </div>
      </div>
    </div>

    <div class="search-content footer-fix">
      <input class="input01" type="text" placeholder="메시지를 입력하세요" />
      <button class="btn01 ml-5">전송</button>
    </div>
  </div>
</template>

<script setup>
import "@/assets/css/global.scss";
</script>

<style>
</style>
