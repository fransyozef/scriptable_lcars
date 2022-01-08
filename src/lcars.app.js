// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: magic;
let fm = FileManager.iCloud();
let dirPath = fm.documentsDirectory();

// ---- Import the constants
let constantsFile =  fm.joinPath(dirPath,'lcars/src/lcars.constants.js');
let constantsImport = importModule(constantsFile);
const {
  IMPORT_DEFAULT_SCENES,
  LCARS_SRC_PATH
} = constantsImport.constants;
// ---- Import the constants END

const DEFAULT_SCENE_NAME = 'offline';

// ---- Custom scenes
let importScenesClassesCustom = {
  warpcore: `${LCARS_SRC_PATH}lcars.scene.warpcore.class`,
  stardate: `${LCARS_SRC_PATH}lcars.scene.stardate.class`
}
// ---- Custom scenes END

// merge all the scenes
const importScenesClasses = { ...IMPORT_DEFAULT_SCENES , ...importScenesClassesCustom};

// ---- Initialize main classfile
let lcarsClassFile =  fm.joinPath(dirPath,`${LCARS_SRC_PATH}lcars.class.js`);
let Lcars = importModule(lcarsClassFile);
let lcars = new Lcars(
  config,
  args
);
// ---- Initialize main classfile END

// set the images path
// TODO: move to class
lcars.initImagesFullPath(fm.documentsDirectory());

// ---- Resolve scene name
let currentSceneName = config.runsInWidget && args.widgetParameter ? args.widgetParameter : DEFAULT_SCENE_NAME;
currentSceneName = currentSceneName === '' ? DEFAULT_SCENE_NAME : currentSceneName;

// let's check if the scene exists in the importScenesClasses
if(!importScenesClasses[currentSceneName]) {
  currentSceneName = DEFAULT_SCENE_NAME;
}
// ---- Resolve scene name END

// create the scene instance
let currentSceneNameClass = importModule(importScenesClasses[currentSceneName]);
currentScene = new currentSceneNameClass();

// set the scene in the main class file
lcars.setScene(currentSceneName);

// get the scene title and set in the main class
const title = currentScene.getConfig('title');

// init the header stack
lcars.initHeader(title);

// init and retrieve the body stack
let backgroundContainer = lcars.initBody();
backgroundContainer.addSpacer();

// TODO: try moving this part to main class
if (lcars.isWidgetSmall() || lcars.isWidgetMedium()) {
  backgroundImageString = lcars.initBackgroundImagePath();
  await fm.downloadFileFromiCloud(backgroundImageString);
  const backgroundImage = await Image.fromFile(backgroundImageString);
  lcars.setBackgroundImage(backgroundImage);
}

// ---- Render SCENE
currentScene.init(
  lcars.getBodyContainer(),
  lcars.getConfig()
);
await currentScene.render();
// ---- Render SCENE END


lcars.initPostBody();

// Check where the script is running
if (config.runsInWidget) {
  // Runs inside a widget so add it to the homescreen widget
  Script.setWidget(lcars.getWidget());
} else {
  // Show the medium widget inside the app
  lcars.getWidget().presentMedium();
}
Script.complete();