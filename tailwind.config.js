/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {

        screens: {
            'xxs': '300px'

            ,
            'xs': '480px'

            ,
            // 'sm': {
            //     'min': '640px',
            //     'max': '767px'
            // },
            // // => @media (min-width: 640px and max-width: 767px) { ... }

            // 'md': {
            //     'min': '768px',
            //     'max': '1023px'
            // },
            // // => @media (min-width: 768px and max-width: 1023px) { ... }

            // 'lg': {
            //     'min': '1024px',
            //     'max': '1279px'
            // },
            // // => @media (min-width: 1024px and max-width: 1279px) { ... }

            // 'xl': {
            //     'min': '1280px',
            //     'max': '1535px'
            // },
            // // => @media (min-width: 1280px and max-width: 1535px) { ... }

            // '2xl': {
            //     'min': '1536px'
            // },
        },
        fontFamily: {
            gilroy_extrabold: ["Gilroy-extrabold"],
            gilroy_light: ["Gilroy-light"],
            monotype_corsiva: ["Monotype-Corsiva"],
            great_vibes: ["Great-Vibes"],
        },
        colors: {
            'clifford': '#da373d',
            'timer': '#cdf0ea',
            'ayatsuci': '#f9e7f5',


        },
        // backgroundImage: {
        //     'hero-pattern': "url('/img/hero-pattern.svg')",
        //     'footer-texture': "url('assets/background/bg-page1.jpeg')",
        // }

    },
    plugins: [],
}
