// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;

const SCENE_OFFLINE_CONFIG = {
    sceneName : 'offline',
    images: { },
    title: 'OFFLINE',
    text: {},
    fontSize: { }
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

module.exports = class LcarsSceneOffline {

    config = SCENE_OFFLINE_CONFIG;

    // DO NOT CHANGE THIS!
    sceneName = SCENE_OFFLINE_CONFIG.sceneName;

    containerWidget = null; // main Scene container stack
    scriptableConfig = {};
    colors = {};

    // downloaded images
    images = null;

    params = {

    };

    colors = COLORS;

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
    }
}