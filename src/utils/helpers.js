import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import PushNotification from 'react-native-push-notification';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  View,
} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import {color} from './styles';
// import TouchID from 'react-native-touch-id';

const helpers = {
  getUid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  },
  uniqBy(array, key, reverse = null) {
    let newArray = [...new Map(array.map(item => [item[key], item])).values()];
    if (reverse) {
      newArray.reverse();
    }
    return newArray;
  },
  getSequence: function () {
    var now = new Date();
    var fullYear = now.getFullYear().toString();
    var value = Math.floor(1000 + Math.random() * 9000);
    return value;
  },
  sumArray: function (arr, input) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += parseFloat(arr[i][input]);
      console.log('sum', sum);
    }
    console.log('newSum', sum);
    return sum.toString();
  },
  sumArrayNew: function (a, type) {
    return (
      (a.length &&
        parseFloat(a[0][type]) + helpers.sumArrayNew(a.slice(1), type)) ||
      0
    );
  },
  initialData: function (n, array, sort, type, date = null) {
    let newArray = [];

    if (array.length > 0) {
      let cnt = 0;
      if (n > array.length) {
        cnt = array.length;
      } else {
        cnt = n;
      }
      for (let i = 0; i < cnt; i++) {
        newArray.push(array[i]);
      }
    }
    let filter = newArray;
    if (sort && type) {
      filter = helpers.checkSorting(newArray, sort, type, date);
    }
    return filter;
  },
  isCloseToBottom: function ({layoutMeasurement, contentOffset, contentSize}) {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  },
  checkSorting: function (data, sort, type, date = null) {
    data.sort(function (a, b) {
      var key1 = date ? a[sort] : new Date(a[sort]);
      var key2 = date ? b[sort] : new Date(b[sort]);

      if (type == 'ASC') {
        if (key1 < key2) {
          return -1;
        } else if (key1 == key2) {
          return 0;
        } else {
          return 1;
        }
      } else if (type == 'DESC') {
        if (key1 > key2) {
          return -1;
        } else if (key1 == key2) {
          return 0;
        } else {
          return 1;
        }
      }
    });

    return data;
  },
  setFormDataApi: function (data) {
    var form = new FormData();
    Object.entries(data).map(([key, value]) => {
      form.append(key, value);
    });
    return form;
  },
  autoCapitalize: function (str) {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    let result = str2.replace(/sahabat|anda/gi, function (x) {
      return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
    });
    return result;
  },
  formatResi: function (resi) {
    let data = resi;
    let newData =
      data.substring(0, 3) +
      ' - ' +
      data.substring(3, 7) +
      ' - ' +
      data.substring(7);
    return newData;
  },
  formatCurrency: function (n, currency) {
    return (
      currency +
      n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
      })
    );
  },
  timeSince: function (date) {
    const intervals = [
      {label: 'tahun', seconds: 31536000},
      {label: 'bulan', seconds: 2592000},
      {label: 'hari', seconds: 86400},
      {label: 'jam', seconds: 3600},
      {label: 'menit', seconds: 60},
      {label: 'detik', seconds: 1},
    ];

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? '' : ''} yang lalu`;
  },
  timeOnly: function (date, seconds = null, utc = null) {
    // var hours = utc ? date.getUTCHours() : date.getHours();
    // var minutes = utc ? date.getUTCMinutes() : date.getMinutes();
    // var second = utc ? date.getUTCSeconds() : date.getSeconds();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var newstr = ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2);
    var scn = seconds ? ':' + ('00' + second).slice(-2) : '';
    return newstr + scn;
  },
  dateTime: function (date, utc = null, second = null) {
    return (
      helpers.dateFormat(date, utc) + ' ' + helpers.timeOnly(date, second, utc)
    );
  },
  dateFormat: function (date, utc = null) {
    // var newdate = utc ? date.getUTCDate() : date.getDate();
    // var newmonth = utc ? date.getUTCMonth() : date.getMonth();
    // var newyear = utc ? date.getUTCFullYear() : date.getFullYear();
    var newdate = date.getDate();
    var newmonth = date.getMonth();
    var newyear = date.getFullYear();

    var newstr =
      newyear +
      '-' +
      ('00' + (newmonth + 1)).slice(-2) +
      '-' +
      ('00' + newdate).slice(-2);

    return newstr;
  },
  dateTimeFormatName: function (date, utc = null) {
    return (
      helpers.dateFormatName(date, utc) +
      ' ' +
      helpers.timeOnly(date, null, utc)
    );
  },
  dateTimeFormatApprove: function (date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var Str =
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2) +
      ' ' +
      ('00' + hours).slice(-2) +
      ':' +
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2);
    // ' ' +
    // newformat;

    return Str;
  },
  dateFormatName: function (date, utc = null) {
    var monthNames = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    var dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    // var newdate = utc ? date.getUTCDate() : date.getDate();
    // var newmonth = utc ? date.getUTCMonth() : date.getMonth();
    // var newyear = utc ? date.getUTCFullYear() : date.getFullYear();
    var newdate = date.getDate();
    var newmonth = date.getMonth();
    var newyear = date.getFullYear();
    var str = newdate + ' ' + monthNames[newmonth] + ' ' + newyear;
    return str;
  },
  dateCount: function (d1, d2, suffix, status = null) {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var res = '';
    if (status) {
      res = Difference_In_Time / (60 * 60 * 1000);
    } else {
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      res = Math.ceil(Difference_In_Days) + ' ' + suffix;
    }

    return res;
  },
  setLocalStorage: async function (data, type) {
    try {
      return AsyncStorage.setItem(type, JSON.stringify(data), () => {
        return AsyncStorage.getItem(type, (err, result) => {
          let res = '';
          if (result != null) {
            res = 'BERHASIL DISIMPAN';
            // res = result;
          } else {
            res = 'GAGAL DISIMPAN';
          }
          // console.log(type + ': ', res);
        });
      });
    } catch (error) {
      console.log('GAGAL SIMPAN: ', error);
    }
  },
  getLocalStorage: function (type) {
    return AsyncStorage.getItem(type, (err, result) => {
      let res = '';
      if (result != null) {
        res = 'DATA ADA';
      } else {
        res = 'DATA KOSONG';
      }
      // console.log(type + ': ', res);
      return result;
    });
  },
  removeLocalStorage: function (type) {
    return AsyncStorage.removeItem(type, (err, result) => {
      let res = '';
      if (result != null) {
        res = 'GAGAL DIHAPUS';
      } else {
        res = 'BERHASIL DIHAPUS';
      }
      console.log(type + ': ', res);
      return result;
    });
  },
  openLocation: (lat, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  },
  openWhatsapp: function (cnote, phone = '081251515050') {
    const char = phone[0];
    const replaced = char == '0' ? phone.replace(char, '62') : phone;
    let link = `whatsapp://send?phone=${replaced}&text=Hallo Sahabat`;
    Linking.openURL(link)
      .then(data => {
        console.log('WhatsApp Opened', data);
      })
      .catch(() => {
        Alert.alert(
          'Perhatian!',
          'Pastikan Whatsapp terpasang di perangkat Anda',
        );
      });
  },
  openMessage: function (cnote, phone) {
    let link = `sms:${phone}`;
    Linking.openURL(link)
      .then(data => {
        console.log('Message Opened', data);
      })
      .catch(() => {
        Alert.alert('Perhatian!', 'Pastikan Pesan terpasang di perangkat Anda');
      });
  },
  config: {
    // baseURL: 'http://151.106.113.168:8000/api/',
    // baseURL: 'https://sleepy-anchorage-17373.herokuapp.com/api/',
    baseURL: 'http://151.106.113.168:8000/api/',
    headers: {
      api_key: '177F94EFB594B11F94EC966ED04378C8',
      api_username: 'sahabatapi',
    },
  },
  apiKey: 'AIzaSyAns3jMXL8s405xJTnUEbVRHS3fmUPbqIQ',
  rad: function (x) {
    return (x * Math.PI) / 180;
  },
  getDistance: function (p1, p2) {
    // let p1 = {lat: -6.127139136082244, lng: 106.78261963961114}; // location sahabat
    // let p1 = {lat: -6.178912791164957, lng: 106.79763599864533}; // location jne tomang 6
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = helpers.rad(p2.lat - p1.lat);
    var dLong = helpers.rad(p2.lng - p1.lng);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(helpers.rad(p1.lat)) *
        Math.cos(helpers.rad(p2.lat)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  },
};

export default helpers;
