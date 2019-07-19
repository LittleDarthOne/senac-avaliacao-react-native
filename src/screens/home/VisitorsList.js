import React, { Component }                                          from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { createCustomStackNavigator } from 'components/navigation/Navigator';
import { DrawerButton }               from 'components/navigation/Header';
import ScreenContainer                from 'components/ScreenContainer';
import { PrimaryFloatingButton }      from 'components/action/Button';

import { getVisitors } from 'services/VisitorsService';
import { getProfile }  from 'services/ProfileService';

import Dates  from 'utils/Dates';
import Colors from 'utils/Colors';

class VisitorsList extends Component {
  static navigationOptions = {
    title: 'Visitantes autorizados', 
    headerLeft: <DrawerButton />
  };

  constructor(props) {
    super(props);

    this.state = { 
      loading:      true,
      visitors:     [],
      refreshing:   false,
      emptyMessage: undefined,
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
    try {
      const profile = await getProfile();
      const loadedData = await getVisitors();
      this.setState({
        loading:    false,
        refreshing: false,
        visitors:   loadedData,
        emptyMessage: 'Nenhum visitante autorizado',
      });
    } catch (error) {
      Alert.alert(undefined, error, [{ text: 'OK' }]);
    } finally {
      this.setState({ 
        loading:    false, 
        refreshing: false 
      });
    }
  };

  handleFormAction = (visitor) => {
    const { visitors } = this.state;
    const newVisitors = visitors.filter(currentVisitor => currentVisitor.id != visitor.id);

    if (!visitor.__deleted)
      newVisitors.push(visitor);

    this.setState({ visitors: newVisitors });
  };

  navigateToForm = (visitor) => {
    this.props.navigation.navigate('VisitorForm', { 
      visitor, 
      onAction: this.handleFormAction,
    });
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

  renderVisitor = ({ item }) => {
    const { navigation } = this.props;
    const creationDate   = item.creationDate && new Date(item.creationDate);
    const dateTimeString = Dates.getDateString(creationDate) + ' ' + Dates.getTimeString(creationDate);

    return (
      <TouchableOpacity style={styles.visitorContainer} onPress={() => this.navigateToForm(item)}>
        <View style={styles.visitorInfo}>
          <Text style={styles.visitorText}>{item.name}</Text>
          <Text style={styles.authorText}>Adicionado {dateTimeString}</Text>
        </View>

        <FontAwesomeIcon icon="chevron-right" color={styles.visitorText.color} size={styles.visitorText.fontSize} />
      </TouchableOpacity>
    );
  };

  render() {
    const { loading, visitors, refreshing } = this.state;
    const { navigation }                    = this.props;

    return (
      <ScreenContainer loading={loading} scrollable={false} style={styles.container}>
        <FlatList
          data={visitors.sort((visitor1, visitor2) => visitor1.name.localeCompare(visitor2.name))}
          keyExtractor={visitor => 'visitor-' + visitor.id}
          renderItem={this.renderVisitor}
          onRefresh={this.refresh}
          refreshing={refreshing}
          ListHeaderComponent={
            <Text style={styles.headerText}>
              Os visitantes listados aqui tem autorização prévia para lhe fazer uma visita em sua residência!
            </Text>
          }
          ListFooterComponent={<View style={styles.footerContainer} />}
          ListEmptyComponent={this.renderEmpty}
        />
        
        <PrimaryFloatingButton icon="plus" onPress={() => this.navigateToForm()} />
      </ScreenContainer> 
    );
  };
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

  footerContainer: {
    height: 50,
  },

  headerText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.DEFAULT_TEXT,
    marginBottom: 26,
  },

  emptyText: {
    fontSize: 16,
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

export default createCustomStackNavigator({ VisitorsList });