import React, { Component }                 from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import ScreenContainer   from 'components/ScreenContainer';
import { PrimaryButton } from 'components/action/Button';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Dates  from 'utils/Dates';
import Colors from 'utils/Colors';

export default class MyVisits extends Component {
  constructor(props) {
    super(props);

    this.state ={ 
      loading:    true,
      visits:     [],
      refreshing: false,
    };
  };

  componentDidMount() {
    this.loadData();
  };

  refresh = () => {
    this.setState({ refreshing: true });
    this.loadData();
  };

  loadData = () => {
    const loadedData = [
      {
        createDate: new Date(),
        denyDate: undefined,
        authorizeDate: undefined,
        visitor: { name: 'Visitante A' },
        author: { name: 'Porteiro A' }
      },
      {
        createDate: new Date(),
        denyDate: new Date(),
        authorizeDate: undefined,
        visitor: { name: 'Visitante B' },
        author: { name: 'Porteiro A' }
      },
      {
        createDate: new Date(),
        denyDate: undefined,
        authorizeDate: new Date(),
        visitor: { name: 'Visitante C' },
        author: { name: 'Porteiro B' }
      },
    ];
    this.setState({
      loading:    false,
      refreshing: false,
      visits:     loadedData,
    });
  };

  render() {
    const { loading, visits, refreshing } = this.state;
    const { navigation }                  = this.props;

    return (
      <ScreenContainer title="Minhas visitas" loading={loading} scrollable={false} style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={visits.sort((visit1, visit2) => visit2.createDate - visit1.createDate)}
          keyExtractor={visit => '' + visit.id}
          renderItem={this.renderVisit}
          onRefresh={this.refresh}
          refreshing={refreshing}
        />
      </ScreenContainer> 
    );
  };

  renderVisit = ({item}) => {
    const icon = item.authorizeDate ? 'check-circle' : item.denyDate ? 'times-circle' : 'hourglass-half';
    const action = item.authorizeDate ? 'Autorizado': item.denyDate ? 'Negado' : 'Aguardando ação';
    const dateString = Dates.getDateString(item.createDate);
    const timeString = Dates.getTimeString(item.createDate);
    return (
      <View style={styles.listItem}>
        <View style={styles.visitInfo}>
          <Text style={styles.visitor}>{item.visitor.name}</Text>
          <View style={styles.authorContainer}>
            <FontAwesomeIcon icon={icon} color={styles.author.color} size={styles.author.fontSize} />
            <Text style={styles.author}>{action} por {item.author.name}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{dateString}</Text>
          <Text style={styles.time}>{timeString}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderColor: Colors.LIGHT_TEXT,
    borderBottomWidth: 1,
  },

  visitInfo: {
    flex: 1,
  },

  visitor: {
    fontSize: 16,
    color: Colors.DEFAULT_TEXT,
  },

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  author: {
    fontSize: 12,
    color: Colors.LIGHT_TEXT,
    marginLeft: 4
  },

  dateContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  date: {
    fontSize: 14,
    color: Colors.DEFAULT_TEXT,
  },

  time: {
    fontSize: 14,
    color: Colors.LIGHT_TEXT,
  },

});