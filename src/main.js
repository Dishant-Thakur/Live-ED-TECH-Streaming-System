
const weatherData = {
    origin: 'Himachal',
    country: 'India (North-India)',
    area: '65000 sq.km',
    aqi: 'Minimum mostly (50-80 AQI), moderate in city areas (130 AQI)',
    seasons: 'summer, monsoon, winter',
    famousFor: 'Tourism priority'
};

function fetchData(value) {
    return new Promise((resolve, reject) => {

        if (value === true) {
            resolve(weatherData);
        } else {
            reject(new Error('Cannot fetch weather data'));
        }

    });
}

async function main() {
    try {
        console.log('Fetching weather API data...');

        const data = await fetchData(true);

        console.log('Data is:', data);
        console.log('Successfully read data');

    } catch (error) {
        console.log('Error:', error.message);
    }
    }

main();
