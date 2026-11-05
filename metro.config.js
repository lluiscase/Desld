const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const nativeWindConfig = withNativeWind(config, {
	input: "./src/shared/theme/global.css",
});
module.exports = nativeWindConfig;
