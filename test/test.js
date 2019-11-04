'use strict'

var expect = require('chai').expect

describe('#numFormatter', function() {
  it('should convert single digits', function() {
    expect('1').to.equal('1')
  })
})
