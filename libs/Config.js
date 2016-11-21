"use strict";
class Config {
    constructor(setting) {
        this.stack = setting || {};
    }
    /**
     * Get the config value
     *
     * @public
     * @param String key
     * @param Mixed def
     * @return Mixed
     */
    get(key, def) {
        return (key in this.stack) ? this.stack[key] : def || null;
    }
    /**
     * Set the config value
     *
     * @public
     * @param String key
     * @param mixed value
     * @return Mixed
     */
    set(key, value) {
        this.stack[key] = value;
    }
    /**
     * Check the config exists
     *
     * @public
     * @param String key
     * @return Boolean
     */
    exists(key) {
        return (key in this.stack);
    }
}
exports.Config = Config;
//# sourceMappingURL=Config.js.map