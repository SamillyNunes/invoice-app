<template>
  <div class="home container">
    <!-- Header -->
    <CustomHeader/>
  </div>
</template>

<script lang="ts">
import CustomHeader from "@/components/CustomHeader.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: { CustomHeader },
});
</script>

<style lang="scss" scoped>
.home {
  color: #fff;
}
</style>
