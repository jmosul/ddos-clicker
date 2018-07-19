<template>
  <div class="home">
    <img src="../assets/logo.png">
    <DataCenter/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataCenter from '@/components/DataCenter.vue'; // @ is an alias to /src

@Component({
  components: {
      DataCenter,
  },
})
export default class Home extends Vue {}
</script>
