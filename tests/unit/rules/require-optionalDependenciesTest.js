'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/require-optionalDependencies').lint;

describe('require-optionalDependencies Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        optionalDependencies: 'optionalDependencies'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true();
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-optionalDependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('optionalDependencies');
      response.lintMessage.should.equal('optionalDependencies is required');
    });
  });
});
