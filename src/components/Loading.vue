<template>
    <div class="loading">
        <span></span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'AppLoading'
});

</script>

<style lang="scss" scoped>

.loading{
    top: 0;
    left: 0;
    z-index: 101;
    height: 100%;
    width: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    @keyframes spin {
        to{
            transform: rotateZ(360deg);
        }
    }

    span{
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: 3px solid transparent;
        border-top-color: #fff;
        border-bottom-color: #fff;
        border-radius: 50%;
        animation: spin ease 1000ms infinite;
    }
}

</style>