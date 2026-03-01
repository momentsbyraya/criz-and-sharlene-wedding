// Theme Configuration - Burgundy Red Wine palette
// Primary: #5A1E2A Deep Burgundy | Background: #F3E8E2 Champagne Beige | Secondary: #C08A8F Dusty Rose
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-burgundy-dark',
        secondary: 'bg-burgundy-wine',
        accent: 'bg-burgundy-wine',
        light: 'bg-white/50',
        theme: 'bg-burgundy-cream',      // Champagne Beige
        garden: 'bg-burgundy-cream',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    // Text Colors
    text: {
        primary: 'text-burgundy-dark',
        secondary: 'text-burgundy-tan',    // Dusty Rose
        accent: 'text-burgundy-wine',
        muted: 'text-burgundy-tan/80',
        dark: 'text-burgundy-dark',
        theme: 'text-burgundy-wine',
        pause: 'text-[#F3E8E2]',
        custom: 'text-burgundy-dark',
        light: '#C08A8F',
        lightBlack: '#5A1E2A',
        cream: '#F3E8E2',
        tan: '#C08A8F',
        wine: '#5A1E2A',
        burgundyDark: '#5A1E2A',
        burntOrange: '#5A1E2A',
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
        weddingDate: '2026-05-08',
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

    // Custom CSS Variables
    cssVariables: {
        '--primary-bg': '#5A1E2A',
        '--secondary-bg': '#5A1E2A',
        '--accent-bg': '#5A1E2A',
        '--accent-hover': '#C08A8F',
        '--primary-text': '#5A1E2A',
        '--secondary-text': '#C08A8F',
        '--accent-text': '#5A1E2A',
        '--muted-text': '#C08A8F',
        '--border-color': '#5A1E2A',
        '--custom-theme': '#5A1E2A',
        '--cream': '#F3E8E2',
        '--tan': '#C08A8F',
        '--wine': '#5A1E2A',
        '--burgundy-dark': '#5A1E2A',
        '--garden-bg': '#F3E8E2',
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
