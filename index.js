#!/usr/bin/env node

var name = require('npm-name')
var fake = require('fake-word')
var duration = require('css-duration')
var chalk = require('chalk')

var opts = require('minimist')(process.argv.slice(2), {
  default: { length: 3, delay: '1s', filter: 'free' }
})

var length = opts.length
var delay = duration(opts.delay)

var isFilter = typeof opts.filter === 'string'
var filter = opts.filter === 'free'

// Start feed:
feed()

function feed () {
  setTimeout(function () {
    var select = fake(length)
    name(select).then(function (free) {
      if (isFilter && filter !== free) return
      var status = free ? chalk.green('free') : chalk.red('taken')
      console.log(chalk.white(select) + ': ' + status)
    }, function (err) {
      console.error(chalk.red(err.name) + ': ' + err.message)
    }).then(feed, feed)
  }, delay)
}
