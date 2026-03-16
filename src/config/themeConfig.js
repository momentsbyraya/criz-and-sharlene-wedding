// Theme Configuration - Midnight & Mist wedding
// Uses centralized CSS variables from :root in index.css
// Primary: #001F3F | Silver-Gray: #D1D5DB | Charcoal: #333333 | Mist: #F3F4F6 | White: #FFFFFF
export const themeConfig = {
    // Background Colors (align with CSS variables)
    backgrounds: {
        primary: 'bg-navy',
        secondary: 'bg-[#2E2E2E]',
        accent: 'bg-[#3A5A7A]',
        light: 'bg-white/60',
        theme: 'bg-[#FFFFFF]',
        garden: 'bg-[#FFFFFF]',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
        heroGradient: 'linear-gradient(180deg, #001F3F, #D1D5DB)',
        lightSection: 'linear-gradient(180deg, #FFFFFF, #F3F4F6)',
        elegantSection: 'linear-gradient(135deg, #001F3F, #3A5A7A)',
        footer: '#001F3F',
    },

    // Text Colors - On light: headings #0A1F44, body #333333, subtle #6B7280; On dark: #FFFFFF
    text: {
        primary: 'text-[#001F3F]',
        secondary: 'text-[#333333]',
        accent: 'text-[#3A5A7A]',
        muted: 'text-[#6B7280]',
        dark: 'text-[#001F3F]',
        theme: 'text-[#3A5A7A]',
        pause: 'text-[#FFFFFF]',
        custom: 'text-[#001F3F]',
        body: '#333333',
        light: '#FFFFFF',
        lightBlack: '#001F3F',
        cream: '#FFFFFF',
        tan: '#333333',
        wine: '#3A5A7A',
        burgundyDark: '#001F3F',
        burntOrange: '#001F3F',
        darkBlue: '#001F3F',
        darkPink: '#333333',
        darkSageGreen: '#FFFFFF',
        subtle: '#6B7280',
    },

    // Border Colors
    borders: {
        primary: 'border-[#3A5A7A]',
        secondary: 'border-[#2E2E2E]',
        accent: 'border-[#3A5A7A]',
        theme: 'border-[#2E2E2E]',
        garden: 'border-[#2E2E2E]',
    },

    // Buttons - solid navy + subtle silver-gray hover hint
    buttons: {
        primary: 'bg-[#001F3F] hover:bg-[#001F3F] text-white',
        secondary: 'bg-[#001F3F] hover:bg-[#001F3F] text-white',
        text: 'text-white hover:text-white',
        theme: 'bg-[#001F3F] hover:bg-[#001F3F]',
        garden: 'bg-[#001F3F] hover:bg-[#001F3F]',
    },

    hover: {
        primary: 'hover:bg-[#2E2E2E]',
        secondary: 'hover:bg-[#0A1F44]',
        theme: 'hover:bg-[#2E2E2E]',
        garden: 'hover:bg-[#2E2E2E]',
    },

    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    calendar: {
        weddingDate: '2026-05-30',
        highlightColor: 'bg-[#3A5A7A]',
        heartColor: 'text-[#3A5A7A]',
        textColor: 'text-[#0A1F44]',
        headerColor: 'text-[#3A5A7A]',
        dayNamesColor: 'text-[#6B7280]',
        background: 'bg-[#F8FAFC]',
    },

    paragraph: {
        background: 'bg-[#F8FAFC]',
        garden: 'bg-[#F8FAFC]',
    },

    // Mirror of :root CSS variables for JS usage
    cssVariables: {
        '--color-navy': '#001F3F',
        '--color-silver-gray': '#D1D5DB',
        '--color-charcoal': '#333333',
        '--color-steel-blue': '#3A5A7A',
        '--color-light-gray': '#F3F4F6',
        '--color-soft-bg': '#FFFFFF',
        '--color-white': '#FFFFFF',
        '--primary-bg': '#001F3F',
        '--secondary-bg': '#2E2E2E',
        '--accent-bg': '#3A5A7A',
        '--accent-hover': 'rgba(209, 213, 219, 0.22)',
        '--primary-text': '#001F3F',
        '--secondary-text': '#333333',
        '--accent-text': '#3A5A7A',
        '--muted-text': '#6B7280',
        '--text-on-dark': '#FFFFFF',
        '--burgundy-dark': '#001F3F',
        '--garden-bg': '#FFFFFF',
        '--powder-blue': '#D1D5DB',
    }
}

export const themePresets = {
    darkElegant: {
        backgrounds: { primary: 'bg-[#0A1F44]', secondary: 'bg-[#2E2E2E]', accent: 'bg-[#3A5A7A]' },
        text: { primary: 'text-[#F8FAFC]', secondary: 'text-[#E5E7EB]', accent: 'text-[#3A5A7A]' }
    },
    lightRomantic: {
        backgrounds: { primary: 'bg-[#F8FAFC]', secondary: 'bg-white', accent: 'bg-[#3A5A7A]' },
        text: { primary: 'text-[#0A1F44]', secondary: 'text-[#3A5A7A]', accent: 'text-[#3A5A7A]' }
    },
    warmAutumn: {
        backgrounds: { primary: 'bg-[#F8FAFC]', secondary: 'bg-[#2E2E2E]/20', accent: 'bg-[#3A5A7A]' },
        text: { primary: 'text-[#0A1F44]', secondary: 'text-[#3A5A7A]', accent: 'text-[#3A5A7A]' }
    },
    gardenWedding: {
        backgrounds: { primary: 'bg-[#F8FAFC]', secondary: 'bg-white', accent: 'bg-[#3A5A7A]', theme: 'bg-[#F8FAFC]' },
        text: { primary: 'text-[#0A1F44]', secondary: 'text-[#3A5A7A]', accent: 'text-[#3A5A7A]', garden: 'text-[#2E2E2E]' }
    }
}

export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) Object.assign(themeConfig, preset)
}
