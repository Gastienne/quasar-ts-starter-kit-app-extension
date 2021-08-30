const
  path = require('path'),
  spawn = require('child_process').spawn

/**
 * Runs `npm install` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
function installDependencies(cwd, executable = 'npm', color) {
  console.log(`\n\n ${color('[*] Installing project dependencies ...')}\n`)
  return runCommand(executable, ['install'], { cwd })
}

/**
 * If the user will have to run `npm install` or `yarn` themselves, it returns a string
 * containing the instruction for this step.
 * @param {Object} data Data from the questionnaire
 */
function installMsg(data) {
  return !data.autoInstall ? '  Run "yarn" (or if using npm: "npm install")\n  ' : ''
}

/**
 * Spawns a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {string} cmd
 * @param {array<string>} args
 * @param {object} options
 */
function runCommand(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        },
        options
      )
    )

    spwan.on('exit', code => {
      if (code) {
        console.log()
        console.log(` ${cmd} install FAILED... Possible temporary npm registry issues?`)
        console.log(` Please try again later...`)
        console.log()
        process.exit(1)
      }

      resolve()
    })
  })
}

/**
 * Prints the final message with instructions of necessary next steps.
 * @param {Object} data Data from questionnaire.
 */
function printMessage(data, { green, yellow }) {
  const message = `
 ${green('[*] Quasar UI Project initialization finished!')}

To get started:

  ${yellow(
    `${data.inPlace ? '' : `cd ${data.destDirName}`}\n` +
    `${installMsg(data)}`
  )}

Documentation can be found at: https://quasar.dev

Quasar is relying on donations to evolve. We'd be very grateful if you can
read our manifest on "Why donations are important": https://quasar.dev/why-donate
Donation campaign: https://donate.quasar.dev
Any amount is very welcomed.
If invoices are required, please first contact razvan@quasar.dev

Please give us a star on Github if you appreciate our work:
https://github.com/quasarframework/quasar

Enjoy! - Quasar Team
`
  console.log(message)
}

/**
 * Handlebar helpers
 */
exports.helpers = {
  or (/* any, any, ..., options */) {
    var len = arguments.length - 1;
    var options = arguments[len];

    for (var i = 0; i < len; i++) {
      if (arguments[i]) {
        return options.fn(this)
      }
    }

    return options.inverse(this)
  }
}

exports.complete = function (data, { chalk }) {
  const green = chalk.green

  const cwd = path.join(process.cwd(), data.destDirName)

  if (data.autoInstall) {
    installDependencies(cwd, data.autoInstall, green)
      .then(() => {
        printMessage(data, green)
      })
      .catch(e => {
        console.log(chalk.red('Error:'), e)
      })
  }
  else {
    printMessage(data, chalk)
  }
}
