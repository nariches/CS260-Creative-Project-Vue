<template>
  <div class="footer">
    <div class="footer-item">
      <a
        class="footer-left"
        href="https://github.com/nariches/creative-project-vue.git">Github</a
      >
    </div>
    <div class="footer-item">
      <p class="footer-right">Nathan Riches</p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 100%;
}

.footer-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  border: 1px solid #fff;
}

.footer-right, .footer-left {
  text-align: center;
}
</style>