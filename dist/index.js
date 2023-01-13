"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remote = exports.auth = exports.RepeatMode = exports.ApiScope = void 0;
var ApiScope_1 = require("./ApiScope");
Object.defineProperty(exports, "ApiScope", { enumerable: true, get: function () { return __importDefault(ApiScope_1).default; } });
var RepeatMode_1 = require("./RepeatMode");
Object.defineProperty(exports, "RepeatMode", { enumerable: true, get: function () { return __importDefault(RepeatMode_1).default; } });
// Modules
var SpotifyAuth_1 = __importDefault(require("./SpotifyAuth"));
var SpotifyRemote_1 = __importDefault(require("./SpotifyRemote"));
/**
 * Singleton Instance of [[SpotifyAuth]]
 * ```typescript
 * import {auth} from 'react-native-spotify-remote'
 * ```
*/
exports.auth = SpotifyAuth_1.default;
/**
 * Singleton Instance of [[SpotifyRemoteApi]]
 * ```typescript
 * import {remote} from 'react-native-spotify-remote'
 * ```
*/
exports.remote = SpotifyRemote_1.default;
//# sourceMappingURL=index.js.map