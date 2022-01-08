// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;

const SCENE_WARPCORE_CONFIG = {
    sceneName : 'warpcore',
    images: {
        warpcore: 'warpcore.png',
        bracketLeft: 'bracket-left.png',
        bracketRight: 'bracket-right.png'
    },
    title: 'WARPCORE',
    text: {
        lowEnergy: 'Warning!\nLow energy output'
    },
    fontSize: {
        battery: {
            small: 25,
            medium: 30
        }
    },
    spacers : {
        warpcoreSpacer : null
    }
};

const fm = FileManager.iCloud()
let dirPath = fm.documentsDirectory()
let constantsFile = fm.joinPath(dirPath, 'lcars/src/lcars.constants.js');
let constantsImport = importModule(constantsFile);
const {
    WIDGET_SMALL,
    WIDGET_MEDIUM,
    COLORS,
    IMAGES_PATH,
    DEFAULT_FAMILY
} = constantsImport.constants;

module.exports = class LcarsSceneWarpcore {

    config = SCENE_WARPCORE_CONFIG;

    // DO NOT CHANGE THIS!
    sceneName = SCENE_WARPCORE_CONFIG.sceneName;

    // main Scene container stack
    containerWidget = null;
    scriptableConfig = {};
    
    colors = COLORS;

    // downloaded images
    images = null;

    params = {
        batteryTxtFontSize: 0,
        warpcoreSpacer: null
    };

    constructor() { }

    init(
        containerWidget,
        scriptableConfig
    ) {
        this.containerWidget = containerWidget;
        this.scriptableConfig = scriptableConfig;
    }

    getWidgetFamily() {
        return this.scriptableConfig.widgetFamily ? this.scriptableConfig.widgetFamily : DEFAULT_FAMILY;
    }

    isWidgetSmall() {
        return this.getWidgetFamily() === WIDGET_SMALL;
    }

    isWidgetMedium() {
        return this.getWidgetFamily() === WIDGET_MEDIUM;
    }

    getSceneName() {
        return this.sceneName;
    }

    setImages(images) {
        this.images = images;
    }

    getConfig(key) {
        return this.config[key];
    }

    // deprecated
    getParams() {
        return this.params;
    }

    async downloadImages() {

        const fm = FileManager.iCloud();
        let dirPath = fm.documentsDirectory();

        const warpcoreImages = this.getConfig('images');
        let warpcoreImagesDownloaded = {};
        for (const key in warpcoreImages) {
            if (warpcoreImages.hasOwnProperty(key)) {
                let lcarsSceneWarpcoreImage = fm.joinPath(dirPath, `lcars/${warpcoreImages[key]}`);
                // console.log(lcarsSceneWarpcoreImage);
                await fm.downloadFileFromiCloud(lcarsSceneWarpcoreImage);
                warpcoreImagesDownloaded[key] = Image.fromFile(lcarsSceneWarpcoreImage);
            }
        }
        this.setImages(warpcoreImagesDownloaded);
    }

    async render() {

        await this.downloadImages();

        if (this.isWidgetMedium()) {
            this.params.warpcoreSpacer = 10;
        }

        const configFontsize = this.getConfig('fontSize');
        this.params.batteryTxtFontSize =
          this.isWidgetSmall()
            ? configFontsize.battery.small : configFontsize.battery.medium;

        const powerContainer = this.containerWidget.addStack();
        powerContainer.layoutVertically();
        powerContainer.addSpacer(10);

        const powerStack = powerContainer.addStack()
        powerStack.layoutHorizontally();
        powerStack.addSpacer();

        // ---- Warpcore
        powerStack.addImage(this.images.warpcore);
        if (this.params.warpcoreSpacer) {
            powerStack.addSpacer(this.params.warpcoreSpacer);
        } else {
            powerStack.addSpacer();
        }
        // ---- Warpcore END

        // ---- Left bracket
        powerStack.addImage(this.images.bracketLeft);
        powerStack.addSpacer(1);
        // ---- Left bracket END

        // ---- Battery 
        const wrapCoreBatteryStack = powerStack.addStack();
        wrapCoreBatteryStack.layoutVertically();
        wrapCoreBatteryStack.addSpacer();

        const BATTERY = Math.round(Device.batteryLevel() * 100);
        let batteryTxt = wrapCoreBatteryStack.addText(`${BATTERY}%`);
        let batteryTxtFontSize =
            BATTERY === 100
                ? this.params.batteryTxtFontSize - 3 : this.params.batteryTxtFontSize;
        batteryTxt.font = Font.boldSystemFont(batteryTxtFontSize);
        batteryTxt.textColor = new Color(this.colors.yellow, 100);

        if (BATTERY < 50 && !Device.isCharging()) {
            let warningTxt = SCENE_WARPCORE_CONFIG.text.lowEnergy;
            let warningText = wrapCoreBatteryStack.addText(warningTxt);
            warningText.font = Font.boldSystemFont(this.params.batteryTxtFontSize / 4);
            warningText.textColor = Color.red();
        }

        wrapCoreBatteryStack.addSpacer();
        // ---- Battery END

        powerStack.addSpacer(1);
        powerStack.addImage(this.images.bracketRight);
        // ---- Right bracket END

        powerStack.addSpacer();
        powerContainer.addSpacer(10);


        this.containerWidget.addSpacer();
    }
}