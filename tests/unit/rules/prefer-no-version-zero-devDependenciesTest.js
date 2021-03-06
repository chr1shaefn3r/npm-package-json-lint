'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/prefer-no-version-zero-devDependencies').lint;

describe('prefer-no-version-zero-devDependencies Unit Tests', function() {
  context('when package.json has node with an invalid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        devDependencies: {
          'npm-package-json-lint': '~0.3.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('prefer-no-version-zero-devDependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('devDependencies');
      response.lintMessage.should.equal('You have invalid version 0 dependencies. Please use modules with a major version >= 1.');
    });
  });

  context('when package.json has node with a valid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        devDependencies: {
          'gulp-npm-package-json-lint': '^1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true();
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.should.be.true();
    });
  });
});
