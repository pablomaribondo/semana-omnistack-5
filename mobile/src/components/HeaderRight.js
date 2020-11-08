import React from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const HeaderRight = (props) => {
  const {navigation} = props;
  return (
    <TouchableOpacity onPress={() => navigation.navigate('New')}>
      <Icon
        name="add-circle-outline"
        size={24}
        color="#4bb0ee"
        style={{marginRight: 20}}
      />
    </TouchableOpacity>
  );
};

export default HeaderRight;
