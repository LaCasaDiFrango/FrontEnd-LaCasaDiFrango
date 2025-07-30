<script setup></script>
<template>
    <div class="ajuda">
      <p>Precisa de Ajuda?</p>
      <a href="https://wa.me/5599999999999" target="_blank">
        <div class="whatsapp">
        <img src="@/assets/img/whatsapp.svg" alt="WhatsApp" />
        <span>Whatsapp</span>
        </div>
      </a>
    </div>
</template>
<style>
.ajuda {
  text-align: center;
  display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: bold;
    justify-content: center;
    width: 100%;
}

.whatsapp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #029438;
    text-decoration: none;
    font-weight: bold;
}

.whatsapp img{
    width: 30px;
    height: 30px;
}
</style>