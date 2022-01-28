import React, { Component, ReactElement, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text as WebText,
  TextInput,
  TextProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "./colors";

const Text = (props: TextProps) => <WebText selectable={false} {...props} />;
class HoverableView extends React.Component<
  {
    onHover: ViewStyle;
    style: ViewStyle;
    children: ReactElement | ReactElement[];
    text: string;
  },
  any
> {
  setStyles = (styles: ViewStyle) => {
    if (this.root.current != null) {
      this.root.current.setNativeProps({
        style: styles,
      });
    }
  };

  root = React.createRef<View>(null);

  translateY = new Animated.Value(-1000);

  render() {
    const { onHover, style, children, text } = this.props;
    return (
      <View
        ref={this.root}
        onMouseEnter={() => {
          this.setStyles(onHover);
          Animated.spring(this.translateY, {
            useNativeDriver: true,
            toValue: 30,
            bounciness: 10,
            velocity: 40,
          }).start();
        }}
        onMouseLeave={() => {
          this.setStyles(style);
          Animated.spring(this.translateY, {
            useNativeDriver: true,
            toValue: -1000,
            bounciness: 10,
            velocity: 40,
          }).start();
        }}
        style={style}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
        <Animated.View
          style={{
            position: "absolute",
            transform: [{ translateY: this.translateY }],
          }}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
}

const Logo = () => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 100,
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ color: colors.darkblue, fontWeight: "bold", fontSize: 20 }}
      >
        Y
      </Text>
    </View>
  );
};

const SubItem = ({ text }: { text: string }) => (
  <HoverableView
    text={text}
    style={{
      marginLeft: 20,
      paddingVertical: 20,
    }}
    onHover={{
      transform: [
        {
          scale: 1.15,
        },
      ],
    }}
  >
    <View
      style={{
        backgroundColor: colors.white,
        elevation: 10,
        padding: 20,
        width: 250,
        borderRadius: 10,
      }}
    >
      {[...Array(5).keys()].map((i) => (
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            marginTop: i == 0 ? 0 : 10,
          }}
        >
          {text}
        </Text>
      ))}
    </View>
  </HoverableView>
);

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
      }}
    >
      <Logo />
      <SubItem text="Hello World" />
      <SubItem text="About" />
      <SubItem text="Others" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TextInput
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            padding: 7,
            marginRight: 20,
            width: 200,
            borderWidth: 2,
            borderColor: colors.green + "aa",
            paddingHorizontal: 20,
          }}
          placeholderTextColor={colors.darkblue + "aa"}
          placeholder="Search"
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.darkblue,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: colors.white + "aa",
            padding: 7,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const scale = useRef(new Animated.Value(0.7)).current;
  const scroll = useRef(new Animated.Value(0)).current;
  const scale2 = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.spring(scale, {
      useNativeDriver: true,
      toValue: 1,
      tension: 60,
      friction: 7,
    }).start();
  }, []);

  return (
    <View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    >
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        scrollEnabled
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          {
            useNativeDriver: true,
            listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
              const { y } = e.nativeEvent.contentOffset;
              if (y >= 300 && y <= 450) {
                Animated.spring(scale2, {
                  useNativeDriver: true,
                  toValue: 1,
                  tension: 60,
                  friction: 7,
                }).start();
              } else {
                Animated.spring(scale2, {
                  useNativeDriver: true,
                  toValue: 0.7,
                  tension: 60,
                  friction: 7,
                }).start();
              }
            },
          }
        )}
      >
        <View
          style={{
            paddingHorizontal: Dimensions.get("window").width * 0.05,
          }}
        >
          <Header />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                transform: [
                  {
                    scale: scale,
                  },
                ],
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 60,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                  selectable
                >
                  I build softwares and applications
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.white + "aa",
                    marginTop: 10,
                  }}
                  selectable
                >
                  I am a fullstack developer, my focus is creating mobile
                  application using React Native, i can also do backend stuff, i
                  am good at Node JS and Laravel
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={require("./assets/globe.gif")}
                  style={{
                    width: 700,
                    height: 700,
                    resizeMode: "cover",
                    borderRadius: 100,
                  }}
                />
              </View>
            </Animated.View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            padding: 40,
            paddingHorizontal: Dimensions.get("window").width * 0.05,
          }}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              alignSelf: "center",
              transform: [
                {
                  scale: scale2,
                },
              ],
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 60,
                  fontWeight: "bold",
                  color: colors.darkblue,
                }}
                selectable
              >
                This website is made using React Native
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.darkblue + "aa",
                  fontWeight: "bold",
                  marginTop: 10,
                }}
                selectable
              >
                Do you know React Native can create website as good as ReactJS?
                it use React Dom as API but still using the React Native
                Component to create the UI, it really good for you that hate css
                like me.
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <View
                style={{
                  elevation: 10,
                  borderRadius: 5,
                  borderWidth: 2,
                }}
              >
                <Image
                  source={require("./assets/code.png")}
                  style={{
                    width: 500,
                    height: 300,
                    resizeMode: "cover",
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkblue,
  },
});
