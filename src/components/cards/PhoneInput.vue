<template>
  <div class="phone-input-wrapper">
    <div class="prefix">
      <img src="/src/assets/img/flag.png" alt="Bandeira do Brasil" class="flag" />
      <span class="ddi">+55</span>
    </div>

    <div class="input-box">
      <input
        type="tel"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="0 0000-0000"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.phone-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', sans-serif;
}

.prefix {
  display: flex;
  align-items: center;
  gap: 6px;
}

.flag {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 2px;
}

.ddi {
  font-size: 16px;
}

.input-box {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
}

.input-box input {
  border: none;
  outline: none;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  width: 100%;
}
</style>
