import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

type Category = {
  id: string;
  title: string;
  image: any;
};

type Props = {
  onCategoryPress: (category: string) => void;
};

const categories: Category[] = [
  {
    id: "1",
    title: "Programming",
    image: require("../../../assets/categories/programming.png"),
  },
  {
    id: "2",
    title: "Novels",
    image: require("../../../assets/categories/novels.png"),
  },
  {
    id: "3",
    title: "Science",
    image: require("../../../assets/categories/science.png"),
  },
  {
    id: "4",
    title: "History",
    image: require("../../../assets/categories/history.png"),
  },
  {
    id: "5",
    title: "Self Help",
    image: require("../../../assets/categories/selfhelp.png"),
  },
  {
    id: "6",
    title: "Competitive",
    image: require("../../../assets/categories/competitive.png"),
  },
  {
    id: "7",
    title: "Others",
    image: require("../../../assets/categories/others.png"),
  },
];

export default function CategoryGrid({
  onCategoryPress,
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        🔥 Trending Categories
      </Text>

      <View style={styles.grid}>

        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => onCategoryPress(item.title)}
          >
            <Image
              source={item.image}
              style={styles.image}
            />

            <Text style={styles.title}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 18,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "31%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  image: {
    width: "100%",
    height: 90,
  },

  title: {
    textAlign: "center",
    fontWeight: "700",
    color: "#111827",
    paddingVertical: 10,
    fontSize: 13,
  },

});