import {firebase} from '@react-native-firebase/database';
import env from './env';

export const fire = firebase.app().database(env.FIREBASE).ref('/indocyberapp');
