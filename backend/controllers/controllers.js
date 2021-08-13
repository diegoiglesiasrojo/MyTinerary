const listCities = [
    {
        _id: 0,
        cityName: "amsterdam",
        cityImage: "/assets/carrousel/amsterdam.jpg"
    },
    {
        _id: 1,
        cityName: "barcelona",
        cityImage: "/assets/carrousel/barcelona.jpg"
    },
    {
        _id: 2,
        cityName: "berlin",
        cityImage: "/assets/carrousel/berlin.jpg"
    },
    {
        _id: 3,
        cityName: "london",
        cityImage: "/assets/carrousel/london.jpg"
    },
    {
        _id: 4,
        cityName: "madrid",
        cityImage: "/assets/carrousel/madrid.jpg"
    },
    {
        _id: 5,
        cityName: "malaga",
        cityImage: "/assets/carrousel/malaga.jpg"
    },
    {
        _id: 6,
        cityName: "lisbon",
        cityImage: "/assets/carrousel/lisbon.jpg"
    },
    {
        _id: 7,
        cityName: "brussels",
        cityImage: "/assets/carrousel/brussels.jpg"
    },
    {
        _id: 8,
        cityName: "hamburg",
        cityImage: "/assets/carrousel/hamburg.jpg"
    },
    {
        _id: 9,
        cityName: "paris",
        cityImage: "/assets/carrousel/paris.jpg"
    },
    {
        _id: 10,
        cityName: "rome",
        cityImage: "/assets/carrousel/rome.jpg"
    },
    {
        _id: 11,
        cityName: "venice",
        cityImage: "/assets/carrousel/venice.jpg"
    }
]

const controllers = {
    getCities: (req, res) => {res.json({response: listCities})},
    getCityById: (req, res) => {
        res.json({response: listCities.find(city => city._id === parseInt(req.params.id))})
    }
}

module.exports = controllers
