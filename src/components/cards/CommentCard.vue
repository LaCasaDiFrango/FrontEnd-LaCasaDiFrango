<script setup>

</script>
<template>
        <div class="comentario">
      <label for="comentario">Algum comentário?</label>
      <textarea id="comentario" rows="3" placeholder="Digite aqui..."></textarea>
      <button class="icone-chat"><img src="@/assets/img/chat.svg" alt="Chat"></button>
    </div>
</template>
<style scoped>
.comentario {
  margin-bottom: 20px;
  position: relative;
  width: 100%;
}

.comentario label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

textarea {
  width: 100%;
  height: 100%;
  padding: 16px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 14px;
}

.icone-chat {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -5px;
  bottom: -5px;
  background: #fff;
  border-radius: 12px;
    border: 1px solid #ccc;
  padding: 5px;
  cursor: pointer;
}

.icone-chat img {
    width: 20px;
    height: 20px;
}
</style>