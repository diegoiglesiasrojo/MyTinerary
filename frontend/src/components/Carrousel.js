import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const listCities = [
    [
        {
            cityName: "Amsterdam",
            cityImage: "./assets/carrousel/amsterdam.jpg"
        },
        {
            cityName: "Barcelona",
            cityImage: "./assets/carrousel/barcelona.jpg"
        },
        {
            cityName: "Berlin",
            cityImage: "./assets/carrousel/berlin.jpg"
        },
        {
            cityName: "London",
            cityImage: "./assets/carrousel/london.jpg"
        }
    ], [
        {
            cityName: "Madrid",
            cityImage: "./assets/carrousel/madrid.jpg"
        },
        {
            cityName: "Malaga",
            cityImage: "./assets/carrousel/malaga.jpg"
        },
        {
            cityName: "Lisbon",
            cityImage: "./assets/carrousel/lisbon.jpg"
        },
        {
            cityName: "Brussels",
            cityImage: "./assets/carrousel/brussels.jpg"
        }
    ], [
        {
            cityName: "Hamburg",
            cityImage: "./assets/carrousel/hamburg.jpg"
        },
        {
            cityName: "Paris",
            cityImage: "./assets/carrousel/paris.jpg"
        },
        {
            cityName: "Rome",
            cityImage: "./assets/carrousel/rome.jpg"
        },
        {
            cityName: "Venice",
            cityImage: "./assets/carrousel/venice.jpg"
        }
    ]
]

export default class Carrousel extends Component {


    render() {
        return (
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                {
                    listCities.map((slide, index) => {
                        return (
                            <div className="slide" key={index}>
                                {
                                    slide.map(city => {
                                        return (
                                            <div className="cityContainer" key={city.cityName}>
                                                <img src={city.cityImage} className="cityImage" alt={city.cityName}/>
                                                <p className="legendCity">{city.cityName}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </Carousel>
        )
    }
}

