<script setup lang="ts">
import IconLogo from '@/shared/ui/Icons/IconLogo.vue'
</script>

<template>
<div class="header">
  <div class="header__inner container">
    <div class="header__logo">
      <IconLogo />
    </div>
  </div>

</div>
</template>

<style lang="scss">
.header {
  --headerLogoSize: 6rem;
  padding: 2rem 3rem;
  background-color: var(--vt-c-black-mute);
  color: var(--vt-c-white-mute);

  &__logo {
    width: var(--headerLogoSize);
    height: var(--headerLogoSize);
  }
}
</style>
