/**
 * Extend Error with ModelError which includes (http) status.
 *
 * @param {Number} status - HTTP status for API return status
 * @param {String} message - Message associated with error
 */
class ModelError extends Error {
    constructor(status, message) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

export default ModelError;
