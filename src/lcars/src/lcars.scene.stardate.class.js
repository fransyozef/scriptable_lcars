// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;

const SCENE_STARDATE_CONFIG = {
    sceneName : 'stardate',
    images: { },
    title: 'STARDATE',
    text: {
        captainsLog : {
            text : 'Captains log',
            fontSize: { 
                small: 20,
                medium: 30  
            }
        },
        stardate : {
            fontSize: { 
                small: 20,
                medium: 30  
            }            
        }
    }
};

let fm = FileManager.iCloud()
let dirPath = fm.documentsDirectory()
let constantsFile =  fm.joinPath(dirPath,'lcars/src/lcars.constants.js');
let constantsImport = importModule(constantsFile);
const {
    WIDGET_SMALL,
    WIDGET_MEDIUM,
    COLORS,
    IMAGES_PATH,
    DEFAULT_FAMILY
} = constantsImport.constants;

module.exports = class LcarsSceneStardate {

    config = SCENE_STARDATE_CONFIG;

    // DO NOT CHANGE THIS!
    sceneName = SCENE_STARDATE_CONFIG.sceneName;

    
    containerWidget = null; // main Scene container stack
    colors = COLORS;
    scriptableConfig = {};

    // downloaded images
    images = null;

    params = {};

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

    // which one to use?
    getConfig(key) {
        return this.config[key];
    }

    getSceneName() {
        return this.sceneName;
    }

    setImages(images) {
        this.images = images;
    }

    // deprecated
    getParams() {
        return this.params;
    }

    render() {
        const configText    = this.getConfig('text');

        const currentDate = new Date();
        const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : `${currentDate.getDate()}`;
        const month = currentDate.getMonth() < 10 ? `0${currentDate.getMonth()}` : `${currentDate.getMonth()}`;
        const year = currentDate.getFullYear();
        const weekDay = `0${currentDate.getDay()+1}`;
        const starDate  = `${year}${month}${day}.${weekDay}`;
        
        const stardateContainer = this.containerWidget.addStack();
        stardateContainer.layoutVertically();
        stardateContainer.addSpacer();

        const captainsLogStack = stardateContainer.addStack();
        captainsLogStack.addSpacer();
        const captainsLogText = captainsLogStack.addText(configText.captainsLog.text);
        const captainsLogTextFontsize = configText.captainsLog.fontSize.small;
        captainsLogText.font = Font.boldSystemFont(captainsLogTextFontsize);
        captainsLogText.textColor = new Color(this.colors.yellow,100);
        captainsLogStack.addSpacer();        
        

        const stardateStack = stardateContainer.addStack();
        stardateStack.addSpacer();
        const starDateText = stardateStack.addText(starDate);
        const starDateTextFontsize = configText.stardate.fontSize.small;
        starDateText.font = Font.boldSystemFont(starDateTextFontsize);
        starDateText.textColor = Color.white();
        stardateStack.addSpacer();

        stardateContainer.addSpacer();
    }
}