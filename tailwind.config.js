module.exports = {
  theme: {
    container: {
      screens: {
        sm: "100%",
        md: "768px",
        lg: "768px",
        xl: "768px",
      },
    },
    fontFamily: {
      bevietnampro: ["Be Vietnam Pro", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      aspectRatio: {
        19: "1.91",
      },
      colors: {
        akash: "#668cff",
        akashDark: "#4d79ff",
        akashLight: "#b3ccff",
        akashHover: "#99bbff",
        ken: {
          light: "#55e3f2",
          dark: "#439ca6",
        },
        flash: {
          light: "#f2e585",
        },
        dark: "#061019",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              wordBreak: "break-all",
            },
            a: {
              transition: "all 0.1s ease-in-out",
              textDecoration: "none",
              color: theme("colors.akash"),
              "&:hover": {
                backgroundColor: theme("colors.akash"),
                color: "#FFF!important",
              },
            },
            iframe: {
              maxWidth: "100%",
            },
          },
        },
      }),
    },
  },
  content: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,ts,tsx,vue}"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
