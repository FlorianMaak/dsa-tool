import crypto from 'crypto';

/**
 * @description Profides static helper methods
 */
export default class TextHelper {
    /**
     * @description Generates password hash, based on input and APP_SECRET
     * @param {string} password Password to be hashed.
     * @returns {Promise<any>} Promise containing hashed password.
     */
    static hashPassword(password) {
        return new Promise(resolve => {
            crypto.pbkdf2(password, process.env.APP_SECRET, 100000, 32, 'sha512',
                (err, derivedKey) => {
                    resolve(derivedKey.toString('hex'));
                }
            );
        });
    }
}
