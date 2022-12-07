import {firebase} from '@react-native-firebase/database';
import env from './env';

const fire = firebase.app().database(env.FIREBASE).ref('/users/123');

export default fire;
