<template>
  <div class="clicker">
    <v-btn outline large fab color="white" @click="fireClick">
      <v-icon>wifi_tethering</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Emit} from 'vue-property-decorator';

    @Component({})
    export default class ServerRack extends Vue {
        @Prop() private strength!: number;
        @Prop() private requestsPerSecond!: number;
        @Prop() private capacity!: number;


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
