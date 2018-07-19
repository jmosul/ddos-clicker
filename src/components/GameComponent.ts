import {Vue} from 'vue-property-decorator';
import GameOptions from '@/services/GameOptions';

export default class GameComponent extends Vue {
    get gameOptions(): GameOptions {
        return this.$root.$data.gameOptions;
    }
}