/**
 * Utility function used by multiple scripts.
 * @since 10/24/18
 * @file
 */

import os from 'os';
import path from 'path';
import glob from 'glob';
import Promise from 'bluebird';
import fs from 'fs-extra-promise';

export const { log } = console;
export const globAsync = Promise.promisify(glob);

/**
 * This project's root directory.
 * @type {string}
 */
export const PROJECT_ROOT = path.join(__dirname, '..');

/**
 * This project's /meta root directory.
 * @type {string}
 */
export const PROJECT_META_ROOT = path.join(__dirname, '..', 'meta');

/**
 * This absolute path to the /packages directory.
 * @type {string}
 */
export const PACKAGES_DIRECTORY = path.join(PROJECT_ROOT, 'packages');

/**
 * The maximum number of concurrent operations
 * to run at once when using Promise.map.
 * @type {number}
 */
export const MAP_CONCURRENCY = os.cpus().length - 1;

/**
 * Used to match package filepaths to determine if
 * they are internal packages or not.
 * @type {RegExp}
 */
export const INTERNAL_PACKAGES = /^internal-/;

/**
 * Curried nth function.
 * @param {number} n The nth item in the array to get.
 * @returns {function} A function to get the nth value in the array.
 * @export
 */
export const nth = n => x => x[n];

export const getBasename = filepath => path.basename(filepath);
export const isDirectory = data => nth(1)(data).isDirectory();
export const toStatsTuple = pkg => fs.lstatAsync(pkg).then(stat => [pkg, stat]);

/**
 * Creates a filter function to ignore non-internal and `ignored` packages.
 * @param {Array<string>=} ignored A set of packages to ignore.
 * @returns {function} A "package filtering" function.
 */
export const filterIgnoredAndInternalPackages = (ignored = []) => packages => (
  packages.filter((pkg) => {
    const basename = getBasename(pkg);
    return ignored.indexOf(basename) === -1 && !INTERNAL_PACKAGES.test(basename);
  })
);

/**
 * Reads the /packages directory and returns a list of absolute paths contained within.
 * @param {string} [basepath=PACKAGES_DIRECTORY] The basepath of the directory to read.
 * @returns {Array<string>} An array of absolute filepaths contained in `basepath`.
 * @export
 */
export async function getPackageFilelist(basepath) {
  const [generated, categories] = await Promise.all([
    globAsync(`${basepath}/generated/*`),
    globAsync(`${basepath}/categories/*/*`),
  ]);

  return generated.concat(categories);
}

/**
 * Filters a list of filepaths to only include directories using `Stat#isDirectory`.
 * @param {Array<string>} filepaths The list of filepaths to filter.
 * @returns {Array<string>} The filtered filepaths.
 * @export
 */
export function getPackageDirectories(filepaths) {
  return Promise.map(filepaths, toStatsTuple).filter(isDirectory).map(nth(0));
}

/**
 * Functional log/passthrough function.
 * @param {string} message The message to log.
 * @param {function} getMessageData A function to get data
 * from the input to the returned function.
 * @returns {function} A function that will log message and
 * return the first argument it receives.
 * @export
 */
export function logTap(message, getMessageData) {
  return x => (getMessageData ? log(message, getMessageData(x)) : log(message)) || x;
}

/**
 * Gets an environment variable.
 * @param {string} variable The name of the variable to get.
 * @param {string} fallback The fallback value if it doesn't exist.
 * @returns {string} The envrionment variable value.
 * @export
 */
export function getENV(variable, fallback) {
  return process.env[variable] || (fallback ? fallback.toString() : undefined);
}

/**
 * A weak implementation of camel casing a string.
 * @param {string} string The string to camel case.
 * @returns {string} The camel cased string.
 */
export function camelize(string) {
  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, ($0, i) => (i === 0 ? $0.toLowerCase() : $0.toUpperCase()))
    .replace(/\s+/g, '')
    .replace(/[^a-z]/ig, '');
}
