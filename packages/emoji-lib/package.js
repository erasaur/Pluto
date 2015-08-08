Package.describe({
  name: 'emoji-lib',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'iron:router@1.0.7'
  ], ['client', 'server']);

  api.addFiles([
    'lib.js',

    'utils/utils.js',
    'helpers/helpers.js',

    'routes/capture.js',
    'routes/results.js',
  ], ['client', 'server']);

  api.export('EMO', ['client', 'server']);
});
