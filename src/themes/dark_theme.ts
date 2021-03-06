import { Styles } from 'react-modal';

import { fontSizes, ThemeProperties } from './commons';
import { DefaultTheme } from './default_theme';

const modalThemeStyle: Styles = {
    content: {
        backgroundColor: '#302d3a',
        borderColor: '#000',
        bottom: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0,
        left: 'auto',
        maxHeight: '90%',
        minWidth: '340px',
        overflow: 'hidden',
        padding: '16px',
        position: 'relative',
        right: 'auto',
        top: 'auto',
    },
    overlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 12345,
    },
};
// cardBackgroundColor: '#02112c',
const darkThemeColors: ThemeProperties = {
    background: '#2a2735',
    backgroundTextColor: '#fff',
    backgroundERC721: '#000',
    borderColor: '#5A5A5A',
    boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
    buttonBuyBackgroundColor: '#3CB34F',
    buttonCollectibleSellBackgroundColor: '#00AE99',
    buttonConvertBackgroundColor: '#343434',
    buttonConvertBorderColor: '#000',
    buttonConvertTextColor: '#fff',
    buttonErrorBackgroundColor: '#FF6534',
    buttonPrimaryBackgroundColor: '#f53e82',
    buttonQuaternaryBackgroundColor: '#00AE99',
    buttonSecondaryBackgroundColor: '#3CB34F',
    buttonSellBackgroundColor: '#FF6534',
    buttonTertiaryBackgroundColor: '#F6851B',
    buttonPortisBackgroundColor: '#6db2d8',
    buttonFortmaticBackgroundColor: '#1e1c29',
    buttonTorusBackgroundColor: '#3a96ff',
    buttonTextColor: '#fff',
    cardImageBackgroundColor: '#EBF0F5',
    cardBackgroundColor: '#2a2735',
    cardHeaderBackgroundColor: '#201e29',
    cardBorderColor: '#000',
    cardTitleColor: '#fff',
    cardTitleOwnerColor: '#3CB34F',
    cardTitleFontSize: '13px',
    chartColor: '#00AE99',
    darkBlue: '#002979',
    darkGray: '#474747',
    darkerGray: '#666',
    dropdownBackgroundColor: '#3a3547',
    dropdownLinkBackgroundColor: '#2c2738',
    dropdownLinkBackgroundColorHover: '#b41761',
    dropdownBorderColor: '#000',
    dropdownTextColor: '#fff',
    dropdownTextColorHover: '#fff',
    errorButtonBackground: '#FF6534',
    errorCardBackground: '#FAF4EF',
    errorCardBorder: '#F39E4B',
    errorCardText: '#F68C24',
    ethBoxActiveColor: '#00AE99',
    ethBoxBorderColor: '#5A5A5A',
    ethSetMinEthButtonBorderColor: '#999',
    ethSliderThumbBorderColor: '#5A5A5A',
    ethSliderThumbColor: '#202123',
    gray: '#808080',
    green: '#3CB34F',
    iconLockedColor: '#fff',
    iconUnlockedColor: '#5A5A5A',
    inactiveTabBackgroundColor: '#393645',
    lightGray: '#B9B9B9',
    logoERC20Color: '#fff',
    logoERC20TextColor: '#fff',
    logoERC721Color: '#00AE99',
    logoERC721TextColor: '#fff',
    marketsSearchFieldBackgroundColor: '#11264d',
    marketsSearchFieldBorderColor: '#404041',
    marketsSearchFieldTextColor: '#BFBFBF',
    modalSearchFieldBackgroundColor: '#fff',
    modalSearchFieldBorderColor: '#fff',
    modalSearchFieldPlaceholderColor: '#DEDEDE',
    modalSearchFieldTextColor: '#000',
    modalTextColorCommon: '#000',
    myWalletLinkColor: '#fff',
    notificationActive: '#F8F8F8',
    notificationIconColor: '#fff',
    notificationsBadgeColor: '#ff6534',
    numberDecimalsColor: '#5A5A5A',
    red: '#FF6534',
    rowActive: '#11264d',
    rowOrderActive: '#5A5A5A',
    simplifiedTextBoxColor: '#1B1B1B',
    stepsProgressCheckMarkColor: '#202123',
    stepsProgressStartingDotColor: '#fff',
    stepsProgressStepLineColor: '#5A5A5A',
    stepsProgressStepLineProgressColor: '#fff',
    stepsProgressStepTitleColor: '#5A5A5A',
    stepsProgressStepTitleColorActive: '#fff',
    tableBorderColor: '#000',
    tdColor: '#fff',
    textColorCommon: '#fff',
    textDark: '#666',
    textInputBackgroundColor: '#403c4e',
    textInputBorderColor: '#575757',
    textInputTextColor: '#fff',
    textLight: '#999',
    textLighter: '#666',
    thColor: '#B9B9B9',
    tooltipBackgroundColor: '#000',
    tooltipTextColor: '#fff',
    topbarBackgroundColor: '#141420',
    // topbarBackgroundColor: '#081e6e',
    topbarBorderColor: '#000',
    topbarSeparatorColor: '#5A5A5A',
    sidebarBackgroundColor: '#141420',
    swapCardBackgroundColor: '#3a3547',
    ...fontSizes,
};

export class DarkTheme extends DefaultTheme {
    constructor() {
        super();
        this.logo = 'assets/img/logo.png';
        this.componentsTheme = darkThemeColors;
        this.modalTheme = modalThemeStyle;
    }
}
