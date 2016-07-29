// Parses simple arithmetic expressions
// E -> E '+' T
//    | E '-' T
//    | T
//
// T -> T '*' F 
//    | T '/' F 
//    | F
//
// F -> '(' E ')'
//    | [UNARY-OP] N
//    | [UNARY-OP] L
//
// UNARY-OP -> '+' | '-'
// N -> INT | REAL
//   
// INT  -> D { D }
// REAL -> D '.' D { D }
// D    -> '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
// L    -> 'a'..'z' | 'A' .. 'Z'

'use strict';

var buffer, current, token;
module.exports = function parse(expression) {
    try {
        buffer  = expression.split('');
        current = 0;
        token   = buffer[current];

        if ( ! token ) {
            throw "No expression to parse";
        }
        
        E();
        if ( token ) {
            throw "Characters remaining after parse completed: '"
                + buffer.slice(current, buffer.length).join('')
                + "'";
        }
        console.log("Expression '" + buffer.join('') + "' was a valid arithmetic expression");
        return 1;
    }
    catch (e) {
        console.log("Expression '" + buffer.join('') + "' was NOT a valid arithmetic expression: " + e);
    }

    return 0;
};

function expect(t) {
    if ( token == t ) {
        consume(); 
    }
    else {
        throw "Expected '" + t + "', but saw '" + token + "' at column " + current;;
    }
}

function consume() {
    while ( (token = buffer[++current]) == ' ' ) {}    
}

function E() {
    T();
    while ( token == '+' || token == '-' ) {
        consume();
        T();
    }
}

function T() {
    F();
    while ( token == '*' || token == '/' ) {
        consume();
        F();
    }
}

function F() {
    if ( token == '(' ) {
        consume();
        E();
        expect(')');
    }
    else if ( isUnaryOp(token) ) {
        consume();
        if ( isDigit(token) ) {
            N();
        }
        else if ( isLetter(token) ) {
            consume();
        }
        else {
            throw "Expected integer, real or letter after unary '+'/'-' but saw '" + token + "' at column " + current;
        }
    }
    else if ( isDigit(token) ) {
        N();
    }
    else if ( isLetter(token) ) {
        consume();
    }
    else {
        throw "Expected integer, real, letter or '(' but saw '" + token + "' at column " + current;
    }
}

function N() {
    if ( isDigit(token) ) {
        consume();
        while ( isDigit(token) ) {
            consume();
        }        
        if ( token == '.' ) { consume(); }
        while ( isDigit(token) ) {
            consume();
        }
    }
    else {
        throw "Expected integer or real but saw '" + token + "' at column " + current;
    }
}

function isUnaryOp(t) {
    return t == '-' || t == '+';
}

function isDigit(t) {
    return t >= '0' && t <= '9';
}

function isLetter(t) {
    return (t >= 'a' && t <= 'z')
        || (t >= 'A' && t <= 'Z');
}
