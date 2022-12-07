const config = {
  screens: {
    Home: 'Home',
    Chat: 'Chat',
    ChatDetail: {
      path: 'ChatDetail/:itemData',
      parse: {
        itemData: itemData => `${itemData}`,
      },
    },
  },
};

const MyLinking = {
  prefixes: ['jnelm://', 'https://jnelm.app'], // create private url in android
  config,
};

export default MyLinking; // on call with useLinkTo
