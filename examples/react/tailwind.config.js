/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  important:true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        '500px':'500px',
        'md' : '768px',
        '930px':'930px',
        '980px':'980px',
        '1024px':'1024px',
        'lg' : '1300px',
        'full' : '1920px',
        'md-max-w':{'max':'767px'}
      },
      colors:{
        'sap-darkblue':'#005178',
        'sap-blue-active':'#006799',
        'sap-blue':'#007DB8',
        'sap-darkgrey':'#222222',
        'sap-lightgrey':'#999999',
        'sap-red':'#A4360E',
        'sap-gold':'#F0AB00',
        'gradient-starting-color':'rgba(0, 0, 0, 0.08)',
        'gradient-ending-color':'rgba(0, 0, 0, 0) ',
        'transparent-white':'rgba(255, 255, 255, 0.15)'
      },
    },
  },
  plugins: [
    plugin(function ({addUtilities}){
      const newUtilities = {
          ".custom-breakpoint-container":{
              "@apply w-full px-[31px] md:px-[79px] lg:px-[87px] mx-auto max-w-[1300px]":{},
          },
          "rf-focus-outline":{
            "@apply shadow-[0_0_0_3px_rgba(21,112,239,.4)]":{}
          }
      }
      addUtilities(newUtilities)
  })
  ],
}
