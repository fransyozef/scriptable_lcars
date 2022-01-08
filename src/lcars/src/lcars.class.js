// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;

let fm = FileManager.iCloud()
let dirPath = fm.documentsDirectory()
let constantsFile =  fm.joinPath(dirPath,'lcars/src/lcars.constants.js');
let constantsImport = importModule(constantsFile);
const {
    WIDGET_SMALL,
    WIDGET_MEDIUM,
    COLORS,
    BACKGROUND_IMAGES,
    IMAGES_PATH,
    DEFAULT_FAMILY
} = constantsImport.constants;

module.exports = class Lcars {

    config = null;
    widget = null;
    
    defaultFamily = DEFAULT_FAMILY;
    defaultScene = '';

    imagesFullPath = '';

    currentScene = '';

    backgroundImagePath = '';

    title = '';

    bodyStackContainer = null;

    scenes = [];
    
    constructor(
        scriptableConfig,
        scriptableArgs
    ) {
        this.args = scriptableArgs;
        this.setConfig(scriptableConfig);

        this.widget = new ListWidget();
        this.widget.backgroundColor = Color.black();
        this.widget.setPadding(0, 0, 0, 0);
    }

    registerScene(scene) {
        this.scenes[scene];
    }

    setDefaultScene(scene) {
        this.defaultScene   = scene;
    }

    setCurrentScene(scene) { 
        this.currentScene = scene;
    }

    getColors() {
        return COLORS;
    }

    setDefaultFamnily(widgetFamily) {
        this.defaultFamily  = widgetFamily;
    }

    initImagesFullPath(baseDir) {
        this.imagesFullPath = `${baseDir}${IMAGES_PATH}`;
    }
    getImagesFullPath() {
        return this.imagesFullPath;
    }

    setConfig(scriptableConfig) {
        this.config = scriptableConfig;
    }
    getConfig() {
        return this.config;
    }

    getWidget() {
        return this.widget;
    }

    getWidgetFamily() {
        return this.config.widgetFamily ? this.config.widgetFamily : this.defaultFamily;
    }

    initScene() {
        this.currentScene = this.config.runsInWidget && this.args.widgetParameter ? this.args.widgetParameter : this.defaultScene;
        this.currentScene = this.currentScene === '' ? this.getRandomScene() : this.currentScene;
    }

    getRandomScene() {
        const index = Math.floor(Math.random() * this.scenes.length);
        return this.scenes[index];
    }

    setScene(scene) {
        this.currentScene = scene;
    }

    getScene() {
        return this.currentScene;
    }

    isWidgetSmall() {
        return this.getWidgetFamily() === WIDGET_SMALL;
    }

    isWidgetMedium() {
        return this.getWidgetFamily() === WIDGET_MEDIUM;
    }

    getBackgroundImages() {
        return BACKGROUND_IMAGES;
    }

    getCurrentBackgroundImage() {
        return this.getBackgroundImages()[this.getWidgetFamily()];
    }

    initBackgroundImagePath() {
        this.backgroundImagePath = `${this.getImagesFullPath()}${this.getCurrentBackgroundImage()}`;
        return this.backgroundImagePath;
    }

    setBackgroundImage(backgroundImage) {
        this.getWidget().backgroundImage = backgroundImage;
    }

    initHeader(title) {
        if(!title) title = '';
        this.title = title;

        let preHeaderStack  = this.getWidget().addStack();
        preHeaderStack.layoutVertically();
        preHeaderStack.addSpacer(2);
    
        let headerStackContainer = this.getWidget().addStack();
        headerStackContainer.layoutVertically();
        
        let headerStack = headerStackContainer.addStack();
        headerStack.layoutHorizontally();
        const headerSpacer = this.isWidgetSmall() ? 58 : 95;
        headerStack.addSpacer(headerSpacer);
        
        let titleTxt = headerStack.addText(this.title.toUpperCase());
        titleTxt.font = Font.mediumSystemFont(12);
        titleTxt.textColor = new Color(COLORS.header,100);
        headerStack.addSpacer();
        
        let postHeaderStack  = this.getWidget().addStack();
        postHeaderStack.layoutVertically();
        const postHeaderStackSpacer = 10;
        postHeaderStack.addSpacer(postHeaderStackSpacer);    

    }

    initBody() {
        this.bodyStackContainer = this.getWidget().addStack();
        this.bodyStackContainer.layoutVertically();
        return this.bodyStackContainer;
    }

    getBodyContainer() {
        return this.bodyStackContainer;
    }

    initPostBody() {
        let postBodyStack  = this.getWidget().addStack();
        postBodyStack.layoutVertically();
        const postBodyStackSpacer = 15;
        postBodyStack.addSpacer(postBodyStackSpacer);          
    }
}
