import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useStore} from 'store/store';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import HeaderBar from 'components/HeaderBar';
import CustomIcon from 'components/CustomIcon';
import CoffeCart from 'components/CoffeCart';
import {NavigationProp} from '@react-navigation/native';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};
const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};
export default function HomeScreen({navigation}: any) {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchIndex, setSearchIndex] = useState(undefined);
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 1,
    category: categories[1],
  });
  const [sortCoffee, setSortCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );
  const listRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();
  const searchCoffee = (search: string) => {
    if (search != '') {
      listRef?.current?.scrollToOffset({
        animated: false,
        offset: 0,
      });
      setCategoryIndex({
        index: 0,
        category: categories[0],
      });
      setSortCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };
  const resetSearchCoffee = () => {
    listRef?.current?.scrollToOffset({
      animated: false,
      offset: 0,
    });
    setCategoryIndex({
      index: 0,
      category: categories[0],
    });
    setSortCoffee([...CoffeeList]);
    setSearchText('');
  };
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <ScrollView>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}>
          <HeaderBar title="Coffee shop" />
          <Text style={styles.screenTitle}>
            Find the best {'\n'}coffee for you
          </Text>
          <View style={styles.inputContainerCpn}>
            <TouchableOpacity
              onPress={() => {
                searchCoffee(searchText);
              }}>
              <CustomIcon
                styles={styles.inputIcon}
                name="search1"
                size={FONTSIZE.size_18}
                color={
                  searchText.length > 0
                    ? COLORS.primaryOrangeHex
                    : COLORS.primaryLightGreyHex
                }
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Find your coffee ..."
              value={searchText}
              onChangeText={text => {
                setSearchText(text);
                searchCoffee(text);
              }}
              placeholderTextColor={COLORS.primaryLightGreyHex}
              style={styles.TextInputContainer}
            />
            {searchText.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  resetSearchCoffee();
                }}>
                <CustomIcon
                  name="close"
                  size={FONTSIZE.size_18}
                  color={COLORS.primaryLightGreyHex}
                  styles={styles.inputIcon}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollView}>
            {categories.map((data, index) => (
              <View
                key={index.toString()}
                style={styles.categoriesViewContainer}>
                <TouchableOpacity
                  style={styles.categoryToach}
                  onPress={() => {
                    listRef?.current?.scrollToOffset({
                      animated: false,
                      offset: 0,
                    });
                    setCategoryIndex({
                      index: index,
                      category: categories[index],
                    });
                    setSortCoffee([
                      ...getCoffeeList(categories[index], CoffeeList),
                    ]);
                  }}>
                  <Text
                    style={[
                      styles.CategorytextActive,
                      categoryIndex.index == index
                        ? {color: COLORS.primaryOrangeHex}
                        : {},
                    ]}>
                    {data}
                  </Text>
                  {categoryIndex.index == index ? (
                    <View style={styles.activeCategory}></View>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <FlatList
            ListEmptyComponent={
              <View style={styles.emtyListContainer}>
                <Text style={styles.CategorytextActive}>
                  No coffee Available
                </Text>
              </View>
            }
            ref={listRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sortCoffee}
            contentContainerStyle={styles.flastListContainer}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Detail');
                  }}>
                  <CoffeCart
                    id={item.id}
                    index={item.index}
                    name={item.name}
                    description={item.description}
                    imagelink_square={item.imagelink_square}
                    special_ingredient={item.special_ingredient}
                    prices={item.prices}
                    average_rating={item.average_rating}
                    type={item.type}
                    buttonOnPressHandler={() => {}}
                  />
                </TouchableOpacity>
              );
            }}
          />
          <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={BeanList}
            contentContainerStyle={[
              styles.flastListContainer,
              {marginBottom: tabBarHeight},
            ]}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Detail');
                  }}>
                  <CoffeCart
                    id={item.id}
                    index={item.index}
                    name={item.name}
                    description={item.description}
                    imagelink_square={item.imagelink_square}
                    special_ingredient={item.special_ingredient}
                    prices={item.prices}
                    average_rating={item.average_rating}
                    type={item.type}
                    buttonOnPressHandler={() => {}}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flex: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainerCpn: {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    flex: 1,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoriesViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryToach: {
    alignItems: 'center',
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategorytextActive: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  flastListContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20,
  },
  coffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  emtyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
});
