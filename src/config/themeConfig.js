// Theme Configuration - Light pink + light blue only
// #F4C6CF light pink | #B8D4E8 / #D4E5F4 light blue | #7BA3C4 darker blue (text)
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-burgundy-dark',
        secondary: 'bg-burgundy-wine',
        accent: 'bg-burgundy-wine',
        light: 'bg-white/60',
        theme: 'bg-burgundy-cream',
        garden: 'bg-burgundy-cream',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    // Text Colors
    text: {
        primary: 'text-burgundy-dark',
        secondary: 'text-burgundy-tan',
        accent: 'text-burgundy-wine',
        muted: 'text-burgundy-tan/80',
        dark: 'text-burgundy-dark',
        theme: 'text-burgundy-wine',
        pause: 'text-[#FFFBFB]',
        custom: 'text-burgundy-dark',
        light: '#F4C6CF',
        lightBlack: '#7BA3C4',
        cream: '#FFFBFB',
        tan: '#F4C6CF',
        wine: '#B8D4E8',
        burgundyDark: '#7BA3C4',
        burntOrange: '#7BA3C4',
    },

    // Border Colors
    borders: {
        primary: 'border-burgundy-wine',
        secondary: 'border-burgundy-tan',
        accent: 'border-burgundy-wine',
        theme: 'border-burgundy-tan',
        garden: 'border-burgundy-tan',
    },

    // Button Colors
    buttons: {
        primary: 'bg-burgundy-wine hover:bg-burgundy-tan',
        secondary: 'border border-burgundy-tan hover:border-burgundy-wine',
        text: 'text-burgundy-cream hover:text-white',
        theme: 'bg-burgundy-wine hover:bg-burgundy-wine/90',
        garden: 'bg-burgundy-tan hover:bg-burgundy-wine',
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-burgundy-tan',
        secondary: 'hover:border-burgundy-wine hover:text-burgundy-cream',
        theme: 'hover:bg-burgundy-wine/90',
        garden: 'hover:bg-burgundy-wine',
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration
    calendar: {
        weddingDate: '2026-05-09',
        highlightColor: 'bg-burgundy-wine',
        heartColor: 'text-burgundy-wine',
        textColor: 'text-burgundy-dark',
        headerColor: 'text-burgundy-wine',
        dayNamesColor: 'text-burgundy-tan',
        background: 'bg-burgundy-cream',
    },

    // Paragraph Configuration
    paragraph: {
        background: 'bg-burgundy-cream',
        garden: 'bg-burgundy-cream',
    },

    // Custom CSS Variables (pastel)
    cssVariables: {
        '--primary-bg': '#7BA3C4',
        '--secondary-bg': '#B8D4E8',
        '--accent-bg': '#B8D4E8',
        '--accent-hover': '#F4C6CF',
        '--primary-text': '#7BA3C4',
        '--secondary-text': '#F4C6CF',
        '--accent-text': '#B8D4E8',
        '--muted-text': '#F4C6CF',
        '--border-color': '#7BA3C4',
        '--custom-theme': '#B8D4E8',
        '--cream': '#FFFBFB',
        '--tan': '#F4C6CF',
        '--wine': '#B8D4E8',
        '--burgundy-dark': '#7BA3C4',
        '--garden-bg': '#FFFBFB',
        '--blush': '#F4C6CF',
        '--powder-blue': '#D4E5F4',
    }
}

// Quick color presets for different themes
export const themePresets = {
    darkElegant: {
        backgrounds: {
            primary: 'bg-burgundy-dark',
            secondary: 'bg-burgundy-wine',
            accent: 'bg-burgundy-wine',
        },
        text: {
            primary: 'text-burgundy-cream',
            secondary: 'text-burgundy-tan',
            accent: 'text-burgundy-wine',
        }
    },

    lightRomantic: {
        backgrounds: {
            primary: 'bg-burgundy-cream',
            secondary: 'bg-white',
            accent: 'bg-burgundy-wine',
        },
        text: {
            primary: 'text-burgundy-dark',
            secondary: 'text-burgundy-wine',
            accent: 'text-burgundy-wine',
        }
    },

    warmAutumn: {
        backgrounds: {
            primary: 'bg-burgundy-cream',
            secondary: 'bg-burgundy-tan/30',
            accent: 'bg-burgundy-wine',
        },
        text: {
            primary: 'text-burgundy-dark',
            secondary: 'text-burgundy-wine',
            accent: 'text-burgundy-wine',
        }
    },

    gardenWedding: {
        backgrounds: {
            primary: 'bg-burgundy-cream',
            secondary: 'bg-white',
            accent: 'bg-burgundy-wine',
            theme: 'bg-burgundy-cream',
        },
        text: {
            primary: 'text-burgundy-dark',
            secondary: 'text-burgundy-wine',
            accent: 'text-burgundy-wine',
            garden: 'text-burgundy-tan',
        }
    }
}

// Helper function to get theme colors
export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

// Helper function to apply theme preset
export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
}
