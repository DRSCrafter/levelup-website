export default {
    base: {
        width: '100%',
        fontFamily: '"Yekan"',
    },
    dialogPrimary: {
        width: '75%',
        color: 'var(--var-color-primary)',
        backgroundColor: 'var(--var-color-background)'
    },
    dialogSecondary: {
        width: '25%',
        color: 'var(--var-color-gray)'
    },
    popoverButton: {
        width: '60%',
        position: "relative",
        borderRadius: 10,
        color: 'white'
    },
    cardButton: {
        borderRadius: 10,
        color: 'var(--var-color-primary)'
    },
    productButton: {
        width: '100%',
        marginTop: 10,
        boxSizing: 'border-box',
        padding: 10,
        color: 'white'
    },
    dangerButton: {
        width: '75%',
        backgroundColor: 'var(--var-color-danger-background)',
        color: 'var(--var-color-danger-text)',
    },
    cartPrimaryButton: {
        height: '50px',
        backgroundColor: '#var(--var-color-secondary)',
        color: 'var(--var-color-primary)',
        fontFamily: '"Yekan"',
        borderRadius: 0,
        boxShadow: "none"
    },
    cartSecondaryButton: {
        height: '50px',
        color: 'rgba(255,0,0,0.55)',
        borderRadius: 0,
        boxShadow: "none"
    },
    formPrimaryButton: (loading: boolean) => ({
        paddingBlock: 15,
        color: `${loading ? 'rgba(0,0,0,0)' : 'white'}`,
        boxShadow: `0 10px 20px -10px ${loading ? 'gray' : '#0080FF'}`,
    }),
    formSecondaryButton: {
        paddingBlock: 15,
        color: 'var(--var-color-primary)',
        marginTop: 10
    }
}