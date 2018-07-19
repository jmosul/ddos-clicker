<template>
  <div class="home">
      <v-container fluid class="py-0 px-0">
        <v-layout align-center justify-center row fill-height>
          <v-flex>
            <DataCenter/>
          </v-flex>
          <v-flex>
            INTERACT
          </v-flex>
          <v-flex>
            DATA CENTER 2
          </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import DataCenter from '@/components/DataCenter.vue'; // @ is an alias to /src

    @Component({
        components: {
            DataCenter,
        },
    })
    export default class Home extends Vue {
    }
</script>
