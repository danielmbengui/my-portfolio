import React from 'react';

import { Link, Text, View, StyleSheet, Image, Svg } from '@react-pdf/renderer';
import { _MY_PROFILE_ } from '../../_mocks_/_settings_items_';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Lato Bold',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    fontFamily: 'Lato',
  },
  link: {
    fontFamily: 'Lato',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
});

export default () => (
  <View style={styles.container}>
    <View style={styles.detailColumn}>
      <Text style={styles.name}>{_MY_PROFILE_.name}</Text>
      <Text style={styles.subtitle}>{_MY_PROFILE_.position}</Text>
    </View>
    <View style={styles.linkColumn}>
      <Link href={`${_MY_PROFILE_.socials.website}`} style={styles.link}>
        {_MY_PROFILE_.socials.website}
      </Link>
      <Link href={`mailto:${_MY_PROFILE_.mail}`} style={styles.link}>
        {_MY_PROFILE_.mail}
      </Link>
      <Link href={`${_MY_PROFILE_.socials.linkedin}`} style={styles.link}>
        {_MY_PROFILE_.socials.linkedin}
      </Link>
      <Link href={`${_MY_PROFILE_.socials.github}`} target={'_blank'} style={styles.link}>
      {_MY_PROFILE_.socials.github}
      </Link>
    </View>
  </View>
);