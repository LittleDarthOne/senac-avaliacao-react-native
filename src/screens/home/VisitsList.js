import React, { Component }                 from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { createCustomStackNavigator } from 'components/navigation/Navigator';
import { DrawerButton }               from 'components/navigation/Header';
import ScreenContainer                from 'components/ScreenContainer';

import { getVisits } from 'services/VisitsService';

import Dates  from 'utils/Dates';
import Colors from 'utils/Colors';

class VisitsList extends Component {
  static navigationOptions = {
    title: 'Minhas visitas', 
    headerLeft: <DrawerButton />
  };

  constructor(props) {
    super(props);

    this.state = { 
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
    this.loadData(true);
  };

  loadData = async (load) => {
    const loadedData = await getVisits();
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
      <ScreenContainer loading={loading} scrollable={false} style={styles.container}>
        <FlatList
          data={visits.sort((visit1, visit2) => visit2.createDate - visit1.createDate)}
          keyExtractor={visit => 'visit-' + visit.id}
          renderItem={this.renderVisit}
          onRefresh={this.refresh}
          refreshing={refreshing}
          ListEmptyComponent={this.renderEmpty}
        />
      </ScreenContainer> 
    );
  };

  renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhuma visita para você
        </Text>
      </View>
    );
  };

  renderVisit = ({item}) => {
    const creationDate = item.createDate && new Date(item.createDate);
    const icon         = item.authorizeDate ? 'check-circle' : item.denyDate ? 'times-circle' : 'hourglass-half';
    const action       = item.authorizeDate ? 'Autorizado': item.denyDate ? 'Negado' : 'Aguardando ação';
    const visitorColor = item.authorizeDate ? Colors.DEFAULT_TEXT : item.denyDate ? Colors.ERROR : Colors.LIGHT_TEXT;

    return (
      <View style={styles.visitContainer}>
        <View style={styles.visitInfo}>
          <Text style={[styles.visitorText, { color: visitorColor }]}>{item.visitor.name}</Text>
          <View style={styles.authorContainer}>
            <FontAwesomeIcon icon={icon} color={styles.authorText.color} size={styles.authorText.fontSize} />
            <Text style={styles.authorText}>{action} por {item.author.name}</Text>
          </View>
        </View>

        <View style={styles.visitDate}>
          <Text style={styles.dateText}>{Dates.getDateString(creationDate)}</Text>
          <Text style={styles.timeText}>{Dates.getTimeString(creationDate)}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  emptyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
  },

  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.DEFAULT_TEXT,
  },

  visitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderColor: Colors.LIGHT_TEXT,
    borderBottomWidth: 1,
  },

  visitInfo: {
    flex: 1,
  },

  visitorText: {
    fontSize: 16,
  },

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  authorText: {
    fontSize: 12,
    color: Colors.LIGHT_TEXT,
    marginLeft: 4
  },

  visitDate: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  dateText: {
    fontSize: 14,
    color: Colors.DEFAULT_TEXT,
  },

  timeText: {
    fontSize: 14,
    color: Colors.LIGHT_TEXT,
  },

});

export default createCustomStackNavigator({ VisitsList });