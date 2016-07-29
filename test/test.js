var assert = require('chai').assert;
var parse  = require('../index.js');

describe('#parse()', function() {
    it('parse() should succeed for positive and negative numbers', function() {
        var tests = [
            { input:           '0', message: 'parses zero ok'                          },
            { input:           '5', message: 'parses positive integer ok'              },
            { input:          '-5', message: 'parses negative integer ok'              },
            { input:         '5.5', message: 'parses positive real ok'                 },
            { input:        '-5.5', message: 'parses negative real ok'                 },
            { input:        '+5.5', message: 'parses positive real with unary plus'    },
            { input:          '+5', message: 'parses positive integer with unary plus' },
            { input:      '100000', message: 'parses large positive integer'           },
            { input:     '-100000', message: 'parses large negative integer'           },
            { input:  '10000.5000', message: 'parses large positive real'              },
            { input: '-10000.5000', message: 'parses large negative real'              },
        ];
        for(var i in tests) {
            var input   = tests[i]['input'],
                message = tests[i]['message'];
            
            assert.isOk(parse(input), message);
        }
    });

    it('parse() should succeed for positive and negative symbols', function() {
        var tests = [
            { input:  'a', message: 'parses "a" ok'  },
            { input: '-a', message: 'parses "-a" ok' },
            { input: '+a', message: 'parses "+a" ok' },
            { input:  'A', message: 'parses "A" ok'  },
            { input: '-A', message: 'parses "-A" ok' },
            { input: '+A', message: 'parses "+A" ok' },
        ].concat(
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(
                function(e) {
                    return { input: e, message: 'parses "' + e + '" ok' };
                }
            )
        );
        
        for(var i in tests) {
            var input   = tests[i]['input'],
                message = tests[i]['message'];
            
            assert.isOk(parse(input), message);
        }
    });

    it('parse() should succeed for nested expressions', function() {
        var tests = [
            { input:                  '(a)', message: 'parses "(a)" ok'               },
            { input:                '((a))', message: 'parses "((a))" ok'             },
            { input:              '(((a)))', message: 'parses "(((a)))" ok'           },
            { input:  '((a + b) - (c + d))', message: 'parses "((a+b) - (c + d))" ok' },
        ];
                
        for(var i in tests) {
            var input   = tests[i]['input'],
                message = tests[i]['message'];
            
            assert.isOk(parse(input), message);
        }
    });

    it('parse() should succeed for complex expressions', function() {
        var tests = [
            { input: '+a + -b * c / +d + -5.2 * +7 + (a * -3 * 7 + 2)',
              message: 'parses "+a + -b * c / +d + -5.2 * +7 + (a * -3 * 7 + 2)" ok'
            },
            { input: 'a + b * c',
              message: 'parses "a + b * c" ok'
            },
            { input: '((a * +d / c - 5.2) - 2)',
              message: 'parses "((a * +d / c - 5.2) - 2)" ok'
            }
        ];
                
        for(var i in tests) {
            var input   = tests[i]['input'],
                message = tests[i]['message'];
            
            assert.isOk(parse(input), message);
        }
    });    
});
