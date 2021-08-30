const { helpers, complete } = require('./utils')

module.exports = {
  prompts: {
    needOrgName: {
      type: 'confirm',
      message: 'Will you use an organization to publish it? Eg. "@my-org/..."',
      default: false
    },
    orgName: {
      when: 'needOrgName',
      type: 'input',
      message: 'Organization name, eg. "my-org"',
      validate: val => val && val.length > 0
    },
    name: {
      type: 'input',
      message: 'Quasar App Extension ext-id (without "quasar-app-extension" prefix), eg. "my-ext"',
      validate: val => val && val.length > 0
    },

    description: {
      type: 'input',
      message: 'Project description',
      default: 'A Quasar App Extension'
    },

    license: {
      type: 'string',
      message: 'License type',
      default: 'MIT'
    },

    preset: {
      type: 'checkbox',
      message: 'Pick the needed scripts:',
      choices: [
        {
          name: 'Prompts script',
          value: 'prompts'
        },
        {
          name: 'Install script',
          value: 'install'
        },
        {
          name: 'Uninstall script',
          value: 'uninstall'
        }
      ]
    },

    repositoryType: {
      type: 'string',
      message: 'Repository type',
      default: 'git'
    },
    repositoryURL: {
      type: 'string',
      message: 'Repository URL (eg: https://github.com/quasarframework/quasar)'
    },
    homepage: {
      type: 'string',
      message: 'Homepage URL'
    },
    bugs: {
      type: 'string',
      message: 'Issue reporting URL (eg: https://github.com/quasarframework/quasar/issues)'
    },

    autoInstall: {
      type: 'list',
      message:
        'Continue to install project dependencies after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use Yarn (recommended)',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'NPM',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        }
      ]
    }
  },

  filters: {
    'src/install.ts': 'preset.install',
    'src/prompts.ts': 'preset.prompts',
    'src/uninstall.ts': 'preset.uninstall'
  },

  helpers,
  complete
}
