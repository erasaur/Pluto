Package.describe({
  name: 'emoji-deps',
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

  api.imply([
    'check',
    'ejson',
    'erasaur:meteor-lodash@3.10.0',
    'aldeed:collection2@2.3.3',
    'aldeed:simple-schema@1.3.2',
    'fourseven:scss@2.0.0',
    'iron:router@1.0.7',
    'mdg:reload-on-resume',
    'meteoric:ionic@0.1.17',
    'meteoric:ionic-sass@0.1.9',
    'meteoric:ionicons-sass@0.1.6',
    'meteorhacks:fast-render@2.3.2',
    'meteorhacks:npm@1.4.0',
    'meteorhacks:subs-manager@1.3.0',
    'reactive-var'
  ]);
});
