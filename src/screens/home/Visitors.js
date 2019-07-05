import React, { Component }                 from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import ScreenContainer   from 'components/ScreenContainer';

import { getVisitors } from 'services/VisitorsService';

import Dates  from 'utils/Dates';
import Colors from 'utils/Colors';

export default class Visitors extends Component {
  constructor(props) {
    super(props);

    this.state ={ 
      loading:    true,
      visitors:   [],
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
    const now = new Date();
    const loadedData = await getVisitors();
    this.setState({
      loading:    false,
      refreshing: false,
      visitors:   loadedData,
    });
  };

  render() {
    const { loading, visitors, refreshing } = this.state;
    const { navigation }                    = this.props;

    return (
      <ScreenContainer title="Visitantes autorizados" loading={loading} scrollable={false} style={styles.container}>
        <FlatList
          data={visitors.sort((visitor1, visitor2) => visitor1.name.localeCompare(visitor2.name))}
          keyExtractor={visitor => 'visitor-' + visitor.id}
          renderItem={this.renderVisitor}
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
          Nenhum visitante autorizado
        </Text>
      </View>
    );
  };

  renderVisitor = ({item}) => {
    const creationDate   = item.creationDate && new Date(item.creationDate);
    const dateTimeString = Dates.getDateString(creationDate) + ' ' + Dates.getTimeString(creationDate);

    return (
      <View style={styles.visitorContainer}>
        <View style={styles.visitorInfo}>
          <Text style={styles.visitorText}>{item.name}</Text>
          <Text style={styles.authorText}>Adicionado {dateTimeString}</Text>
        </View>

        <FontAwesomeIcon icon="chevron-right" color={styles.visitorText.color} size={styles.visitorText.fontSize} />
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
    fontSize: 18,
    textAlign: 'center',
    color: Colors.DEFAULT_TEXT,
  },

  visitorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderColor: Colors.LIGHT_TEXT,
    borderBottomWidth: 1,
  },

  visitorInfo: {
    flex: 1,
  },

  visitorText: {
    fontSize: 16,
    color: Colors.DEFAULT_TEXT,
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