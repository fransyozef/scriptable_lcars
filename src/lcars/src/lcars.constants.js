// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;

const LCARS_PATH = 'lcars/';
const LCARS_SRC_PATH = `${LCARS_PATH}src/`;
const IMAGES_PATH = `/${LCARS_PATH}`;

const WIDGET_SMALL = 'small';
const WIDGET_MEDIUM = 'medium';

const DEFAULT_FAMILY = WIDGET_MEDIUM;

const COLORS = {
    header: "#F08F2F",
    primary: "#2B698F",
    yellow: "#F08F2F",
    white: "#FFFFFF",
    black: "#000000"
};

const BACKGROUND_IMAGES = {
    small: "widget-small-1.png",
    medium: "widget-medium.png",
    large: "widget-medium.png"
};

const IMPORT_DEFAULT_SCENES = {
    offline: `${LCARS_SRC_PATH}lcars.scene.offline.class`
}

module.exports.constants = {
    IMAGES_PATH,
    WIDGET_SMALL,
    WIDGET_MEDIUM,
    COLORS,
    BACKGROUND_IMAGES,
    DEFAULT_FAMILY,
    IMPORT_DEFAULT_SCENES,
    LCARS_PATH,
    LCARS_SRC_PATH
};