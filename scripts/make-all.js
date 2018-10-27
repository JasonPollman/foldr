/**
 * Creates the `@foldr/all` aggregate package by creating an all/index.js file
 * that imports all of the non-internal packages in the /packages directory.
 * This is basically the "full" build of all foldr packages.
 * @since 10/24/18
 * @file
 */

import path from 'path';
import Promise from 'bluebird';
import compose from 'p-compose';
import fs from 'fs-extra-promise';

import {
  red,
  dim,
  cyan,
  green,
} from 'chalk';

import {
  log,
  logTap,
  getBasename,
  MAP_CONCURRENCY,
  PACKAGES_DIRECTORY,
  getPackageFilelist,
  getPackageDirectories,
  filterIgnoredAndInternalPackages,
} from './utils';

/**
 * The path to /packages/all.
 * @type {string}
 */
const FOLDR_ALL_PACKAGE_ROOT = path.join(PACKAGES_DIRECTORY, 'all');

/**
 * The path to /packages/all/src/index.js.
 * @type {string}
 */
const FOLDR_ALL_INDEX_DESTINATION = path.join(FOLDR_ALL_PACKAGE_ROOT, 'src', 'index.js');

const EXTRAS = ({ packageJson }) => ({
  variables: [
    // 'const _ = curry._',
    `const VERSION = '${packageJson.version}'`,
  ],
  exports: [
    // '_',
    'VERSION',
  ],
});

/**
 * A weak implementation of camel casing a string.
 * @param {string} string The string to camel case.
 * @returns {string} The camel cased string.
 */
function camelize(string) {
  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, ($0, i) => (i === 0 ? $0.toLowerCase() : $0.toUpperCase()))
    .replace(/\s+/g, '')
    .replace(/[^a-z]/ig, '');
}

/**
 * Gets the package.json contents for the /packages/all package.
 * @returns {Promise<Object>} The package.json contents.
 */
function getFoldrAllPackageJson() {
  const foldrAllPackageJsonSource = path.join(FOLDR_ALL_PACKAGE_ROOT, 'package.json');
  return fs.readJsonAsync(foldrAllPackageJsonSource);
}

/**
 * Generates the contents for the /packages/all/src/index.js file.
 * @param {Object<Object>} packageJsons An object containing all of the package.json files
 * this package is dependent on (keyed by package name).
 * @returns {Proimse<string>} Resolves with the generated contents for /packages/all/src/index.js.
 */
async function generateFoldrAllIndexContent(packageJsons) {
  const modules = Object.keys(packageJsons);
  const symbols = modules.map(module => module.replace(/^@foldr\//, '')).map(camelize);

  // All of the `import x from 'y';` statements.
  const imports = modules.map((module, i) => `import ${symbols[i]} from '${module}';`).join('\n');
  const extras = EXTRAS({ packageJson: await getFoldrAllPackageJson() });

  // An { x, y, z } like statement.
  // Will be prepended with `export` and `export default` below.
  const exported = `{
    ${extras.exports.join(',\n    ')},
    ${symbols.join(',\n    ')},
  }`;

  const rendered = `
  /**
   * The @foldr library.
   * This is an automatically generated file that aggregates all of the individual
   * packages in the @foldr mono-repo and exports them as a single requirable module.
   * Only "non-internal" packages and some other useful things (such as the curry/partial
   * placeholder symbol) are exposed via this module.
   * @since ${new Date().toLocaleDateString()}
   * @file
   */

  ${imports}

  ${extras.variables.join(';\n  ')};

  export ${exported};

  export default ${exported};
  `;

  return rendered.trim().replace(/^ {2}/gm, '').concat('\n');
}

/**
 * Generates the /packages/all/src/index.js file.
 * @param {Object<Object>} packageJsons An object containing all of the package.json files
 * this package is dependent on (keyed by package name).
 * @returns {Proimse<string>} Resolves with the generated contents for /packages/all/src/index.js.
 */
async function generateFoldrAllPackageIndexFile(packageJsons) {
  const rendered = await generateFoldrAllIndexContent(packageJsons);
  await fs.outputFileAsync(FOLDR_ALL_INDEX_DESTINATION, rendered);
  log(green.bold('Index file for `@foldr/all` generated successfully!'));
}

/**
 * Updates the package.json for the `@foldr/all` package by updating the
 * `dependencies` with the latest version of each dependent package.
 * @param {Object<Object>} packageJsons An object containing all of the package.json files
 * this package is dependent on (keyed by package name).
 * @returns {Proimse<void>} Resolves when the package.json has been updated.
 */
async function updateFoldrAllPackageDependencies(packageJsons) {
  const foldrAllPackageJsonSource = path.join(FOLDR_ALL_PACKAGE_ROOT, 'package.json');
  const foldrAllPackageJsonContents = await fs.readJsonAsync(foldrAllPackageJsonSource);

  foldrAllPackageJsonContents.dependencies = {};

  Object.keys(packageJsons).forEach((key) => {
    const { name, version } = packageJsons[key];
    foldrAllPackageJsonContents.dependencies[name] = `^${version}`;
  });

  await fs.outputJsonAsync(foldrAllPackageJsonSource, Object.assign(foldrAllPackageJsonContents, {
    packageJsons,
  }));

  log(green.bold('Package.json file for `@foldr/all` updated successfully!'));
}

/**
 * Loads the package json files for all the non-internal packages in
 * the /packages library.
 * @param {*} packages The absolute filepaths to all the non-internal packages.
 * @returns {Promise<Object<Object>>} An object containing all of the packages
 * keyed by the package name.
 */
async function getLibraryPackageJsonFiles(packages) {
  const results = {};

  const getPackageJson = async (pkg) => {
    log(dim('Loading package.json for package %s'), getBasename(pkg));
    const packageJson = await fs.readJsonAsync(path.join(pkg, 'package.json'));
    results[packageJson.name] = packageJson;
  };

  await Promise.map(packages, getPackageJson, { concurrency: MAP_CONCURRENCY });
  return results;
}

const setup = compose(
  getLibraryPackageJsonFiles,
  filterIgnoredAndInternalPackages(['all']),
  getPackageDirectories,
  getPackageFilelist,
  logTap(cyan.bold('Building @foldr/all package')),
);

const build = dependencies => Promise.all([
  updateFoldrAllPackageDependencies(dependencies),
  generateFoldrAllPackageIndexFile(dependencies),
]);

setup(PACKAGES_DIRECTORY).then(build).catch((e) => {
  log(red.bold(e.stack));
  process.exit(1);
});