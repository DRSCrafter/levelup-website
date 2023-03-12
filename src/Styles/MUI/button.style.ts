export default {
    base: {
        width: '100%',
        fontFamily: '"Yekan"',
    },
    dialogPrimary: {
        width: '75%',
        color: '#0080FF',
        backgroundColor: '#98CCFF'
    },
    dialogSecondary: {
        width: '25%',
        color: '#707070'
    },
    popoverButton: {
        width: '60%',
        position: "relative",
        borderRadius: 10,
        color: '#ffffff'
    },
    cardButton: {
        borderRadius: 10,
        color: '#0080FF'
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
        backgroundColor: '#FF9797',
        color: '#FF0000',
    },
    cartPrimaryButton: {
        height: '50px',
        backgroundColor: '#98CCFF',
        color: '#0080FF',
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
        color: '#0080FF',
        marginTop: 10
    }
}