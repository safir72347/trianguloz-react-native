import React, {useState,useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
// Argon themed components
import { argonTheme, tabs, Images, ImageBackground } from "../constants/";
import { Card, Button, Select, Icon, Input, Header, Switch } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

function Home () {
  const [firstSide, setFirstSide] = useState("5");
  const [secondSide, setSecondSide] = useState("5");
  const [thirdSide, setThirdSide] = useState("5");
  const [triangleType, setTriangleType] = useState(undefined);
  const [area, setArea] = useState(undefined);
  const [perimeter, setPerimeter] = useState(undefined);
  const [switchOn, setSwitch] = useState(true);

  const state = {
    "switch-1": true,
    "switch-2": false
  };
  
  useEffect(()=>{
    if(firstSide && secondSide && thirdSide){
        getTriangleType()
    }
  },[firstSide, secondSide, thirdSide])

    const checkValidity = (a, b, c) => {
      if (a + b <= c || a + c <= b || b + c <= a)
        return false;
      else
        return true;
    }

    const calcPerimeter = (a, b, c) => {
      let perim = (a + b + c);
      setPerimeter(String(perim));
    }

    const calcArea = (a, b, c) => {
      let p = Math.floor(perimeter) / 2;
      let area1 = p * (p - a) * (p - b) * (p - c);
      area1 = Math.sqrt(area1);
      setArea(String(area1));
    }

    const getTriangleType = () => {
        
        console.log("In getTriangleType with sides ", firstSide, secondSide, thirdSide);

        let typeCalculated;

        if(checkValidity(Math.floor(firstSide), Math.floor(secondSide), Math.floor(thirdSide))) {

          if (firstSide == secondSide && secondSide == thirdSide && thirdSide == firstSide) {
            typeCalculated = "Equilateral";
          }
          else if (firstSide == secondSide || secondSide == thirdSide || thirdSide == firstSide) {
            typeCalculated = "Isosceles";
          }
          else {
            typeCalculated = "Scalene";
          }

          calcPerimeter(Math.floor(firstSide), Math.floor(secondSide), Math.floor(thirdSide));

          calcArea(Math.floor(firstSide), Math.floor(secondSide), Math.floor(thirdSide));

        } else {
          typeCalculated = 'Not a triangle';
        }

        setTriangleType(typeCalculated);
        
    
    }

    return (
      <Block flex center style={styles.home}>

<Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block
            row
            middle
            space="between"
            style={{ marginTop: 8 }}
          >
            <Text size={12}>Night Mode</Text>
            <Switch
              value={switchOn}
              onValueChange={(e) => setSwitch(e)}
            />
          </Block>
          
        </Block>
        
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              success
              right
              placeholder="Side 1"
              iconContent={
                <Block
                  middle
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: argonTheme.COLORS.WARNING
                  }}
                >
                  <Icon
                    size={11}
                    color={argonTheme.COLORS.ICON}
                    name="g-check"
                    family="ArgonExtra"
                  />
                </Block>
              }
              type = "numeric"
              value = { firstSide }
              onChangeText={(e)=>setFirstSide(e)}
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              success
              right
              placeholder="Side 2"
              iconContent={
                <Block
                  middle
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: argonTheme.COLORS.INPUT_SUCCESS
                  }}
                >
                  <Icon
                    size={11}
                    color={argonTheme.COLORS.ICON}
                    name="g-check"
                    family="ArgonExtra"
                  />
                </Block>
              }
              type = "numeric"
              value = { secondSide }
              onChangeText={(e)=>setSecondSide(e)}
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              success
              right
              placeholder="Side 3"
              iconContent={
                <Block
                  middle
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: argonTheme.COLORS.INFO
                  }}
                >
                  <Icon
                    size={11}
                    color={argonTheme.COLORS.ICON}
                    name="g-check"
                    family="ArgonExtra"
                  />
                </Block>
              }
              type = "numeric"
              value = { thirdSide }
              onChangeText={(e)=>setThirdSide(e)}
            />
          </Block>

            {
              triangleType ?
                triangleType === 'Equilateral'?
                <>
                
                <Image
                  source={Images.equilateral}
                    style = {{ justifyContent: "center", marginTop: 30, marginLeft: "auto", marginRight: "auto" }}
                ></Image>
                <Text style ={{ textAlign: "center", paddingTop: 10 }}>Type : Equilateral Triangle</Text>
                </>
                :
                <Text></Text>

              : getTriangleType() 
            }

            {
              triangleType ?
                triangleType === 'Isosceles'?
                <>
                <Image
                  source={Images.isosceles}
                    style = {{ justifyContent: "center", marginTop: 30, marginLeft: "auto", marginRight: "auto" }}
                ></Image>
                <Text style ={{ textAlign: "center", paddingTop: 10 }}>Type : Isosceles Triangle</Text>
                </>
                
                :
                <Text></Text>

              : getTriangleType() 
            }
          
            {
              triangleType ?
                triangleType === 'Scalene'?
                <>
                <Image
                  source={Images.scalene}
                    style = {{ justifyContent: "center", marginTop: 30, marginLeft: "auto", marginRight: "auto" }}
                ></Image>
                <Text style ={{ textAlign: "center", paddingTop: 10 }}>Type : Scalene Triangle</Text>
                </>
                :
                <Text></Text>

              : getTriangleType() 
            }

            {
              triangleType ?
                triangleType !== 'Scalene' && triangleType !== 'Isosceles' && triangleType !== 'Equilateral'? 
                <>
                <Image
                  source={Images.confusedCat}
                    style = {{ justifyContent: "center", marginTop: 10, marginLeft: "auto", marginRight: "auto", width: 140, height: 140, borderRadius: 100 }}
                ></Image>
                <Text style ={{ textAlign: "center", paddingTop: 10 }}>Not a Triangle</Text>
                </>
                :
                <>
                <Text style ={{ textAlign: "center" }}>Perimeter : { perimeter } </Text>
                <Text style ={{ textAlign: "center" }}>Area : { area } </Text>
                </>

              : getTriangleType() 
            }

          {/* <Block center>
            <Button color="default" style={styles.button} onPress={() => getTriangleType()}>
              Calculate
            </Button>
          </Block> */}

          


          {/* <Card item={articles[0]} horizontal  />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full /> */}
        </Block>
      </ScrollView>
      </Block>
    );
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    // paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
