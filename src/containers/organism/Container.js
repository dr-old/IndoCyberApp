import React from 'react';
import {Alert, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Divider} from '../../components/atoms';
import {BarHeader, LoadingExtern, NavHeader} from '../../components/molecules';
import {color} from '../../utils/styles';

const Container = ({
  refScroll,
  refreshControl,
  onScroll,
  bgColor,
  children,
  navbar,
  loading,
}) => {
  return (
    <View style={stylesCust.page}>
      <BarHeader />
      <FlashMessage
        position="top"
        duration={4000}
        floating={true}
        hideOnPress={true}
      />
      {navbar?.type === 'fixed' ? (
        <NavHeader
          title={navbar?.title}
          subtitle={navbar?.subtitle}
          onSearch={navbar?.onSearch}
          onProfile={navbar?.onProfile}
          onClick={navbar?.onClick}
        />
      ) : null}
      <ScrollView
        style={stylesCust.container(bgColor)}
        ref={refScroll}
        onScroll={onScroll}
        refreshControl={refreshControl}>
        {navbar?.type === 'nofixed' ? (
          <NavHeader
            title={navbar?.title}
            subtitle={navbar?.subtitle}
            onSearch={navbar?.onSearch}
            onProfile={navbar?.onProfile}
            onClick={navbar?.onClick}
          />
        ) : null}
        {children}
        <Divider height={50} />
      </ScrollView>
      {loading ? <LoadingExtern /> : null}
    </View>
  );
};
const stylesCust = StyleSheet.create({
  page: {flex: 1},
  container: (backgroundColor = color.white) => ({
    backgroundColor: backgroundColor,
  }),
});

export default Container;
