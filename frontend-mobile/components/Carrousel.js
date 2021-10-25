import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import {View, ImageBackground, Text, StyleSheet} from "react-native"

const listCities = [
    [
        {
            cityName: "Amsterdam",
            cityImage: "https://i.postimg.cc/htGkX5xS/amsterdam.jpg"
        },
        {
            cityName: "Barcelona",
            cityImage: "https://i.postimg.cc/W1fQgw60/barcelona.jpg"
        },
        {
            cityName: "Berlin",
            cityImage: "https://i.postimg.cc/XvGt8BQm/berlin.jpg"
        },
        {
            cityName: "London",
            cityImage: "https://i.postimg.cc/tC9QjT4n/london.jpg"
        }
    ], [
        {
            cityName: "Madrid",
            cityImage: "https://i.postimg.cc/mrKWfyPT/madrid.jpg"
        },
        {
            cityName: "Malaga",
            cityImage: "https://i.postimg.cc/mrKWfyPT/madrid.jpg"
        },
        {
            cityName: "Lisbon",
            cityImage: "https://i.postimg.cc/GtC093PN/lisbon.jpg"
        },
        {
            cityName: "Brussels",
            cityImage: "https://i.postimg.cc/8C7g00Py/brussels.jpg"
        }
    ], [
        {
            cityName: "Hamburg",
            cityImage: "https://i.postimg.cc/zGt1pr5b/hamburg.jpg"
        },
        {
            cityName: "Paris",
            cityImage: "https://i.postimg.cc/QxSLx3F4/paris.jpg"
        },
        {
            cityName: "Rome",
            cityImage: "https://i.postimg.cc/GpWVS3f2/rome.jpg"
        },
        {
            cityName: "Venice",
            cityImage: "https://i.postimg.cc/3N76YSYQ/venice.jpg"
        }
    ]
]

export default class Carrousel extends Component {
    render() {
        return (
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
                {
                    listCities.map((slide, index) => {
                        return (
                            <View style={styles.slide} key={index}>
                                {
                                    slide.map(city => {
                                        return (
                                            <ImageBackground style={styles.cityContainer} key={city.cityName} source={{uri: city.cityImage}}>
                                                <Text style={styles.legendCity}>{city.cityName}</Text>
                                            </ImageBackground>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </Carousel>
        )
    }
}

const styles = StyleSheet.create({
    slide: {

    },
    cityContainer: {

    },
    legendCity: {

    }
})