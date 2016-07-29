g0 Parser
=============
A simple parser for arithmetic expressions. Supports positive and negative integers and floating point numbers as well as user defined symbols. See full grammar below.

## Installation

    npm install @mcmillhj/g0

## Usage

    var parser = require('@mcmillhj/g0');

    parse('a + b + 5');
    // Expression 'a + b + 5' was a valid arithmetic expression

    parse('((a + b + -c)');
    // Expression '((a + b + -c)' was NOT a valid arithmetic expression: Expected ')', but saw 'undefined' at column 13

## Grammar

    E -> E '+' T
       | E '-' T
       | T

    T -> T '*' F 
       | T '/' F 
       | F

    F -> '(' E ')'
       | [UNARY-OP] N
       | [UNARY-OP] L

    UNARY-OP -> '+' | '-'
    N -> INT | REAL

    INT  -> D { D }
    REAL -> D '.' D { D }
    D    -> '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
    L    -> 'a'..'z' | 'A' .. 'Z'

## Tests

    npm test